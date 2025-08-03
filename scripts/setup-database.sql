-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  issue_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'expired', 'revoked')),
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  issued_by UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (id = auth.uid()::uuid);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert users" ON public.users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete users" ON public.users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

-- RLS Policies for certificates
CREATE POLICY "Users can view own certificates" ON public.certificates
  FOR SELECT USING (
    recipient_email = (
      SELECT email FROM public.users WHERE id = auth.uid()::uuid
    )
  );

CREATE POLICY "Admins can view all certificates" ON public.certificates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert certificates" ON public.certificates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update certificates" ON public.certificates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete certificates" ON public.certificates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

-- Storage policies
CREATE POLICY "Authenticated users can upload certificates" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'certificates' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view certificate files" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

CREATE POLICY "Admins can delete certificate files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'certificates' AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::uuid AND role = 'admin'
    )
  );

-- Insert default admin user (password: admin123)
INSERT INTO public.users (email, name, role, password_hash)
VALUES (
  'admin@pranaargentum.com',
  'Admin User',
  'admin',
  '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ'
) ON CONFLICT (email) DO NOTHING;

-- Insert default regular user (password: user123)
INSERT INTO public.users (email, name, role, password_hash)
VALUES (
  'user@example.com',
  'John Doe',
  'user',
  '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ'
) ON CONFLICT (email) DO NOTHING;
