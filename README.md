# Prana Argentum - Portal Sertifikasi

Portal sertifikasi digital untuk Prana Argentum, perusahaan penyedia layanan fumigasi kontainer profesional di Surabaya.

## Fitur Utama

### Untuk Pengguna
- ✅ Login dan akses dashboard pribadi
- ✅ Melihat dan mendownload sertifikat yang diterima
- ✅ Preview sertifikat dengan tampilan profesional
- ✅ Interface yang responsif dan user-friendly

### Untuk Administrator
- ✅ Dashboard admin dengan statistik lengkap
- ✅ Upload dan manajemen sertifikat dengan file upload
- ✅ Manajemen pengguna (create, view, delete)
- ✅ File upload support untuk PDF, JPG, PNG
- ✅ Logout feature dengan konfirmasi

## Teknologi yang Digunakan

- **Framework:** Next.js 14 (App Router)
- **UI Components:** shadcn/ui dengan Radix UI
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Authentication:** Custom localStorage-based system
- **Storage:** Browser localStorage (untuk demo)

## Prerequisites

Pastikan Anda sudah menginstall:
- Node.js (version 18 atau lebih baru)
- npm atau yarn
- Visual Studio Code
- Git (opsional)

## Instalasi dan Setup Lokal

### 1. Download dan Extract Project

1. Download file ZIP project ini
2. Extract ke folder yang diinginkan
3. Buka folder project di VS Code

### 2. Install Dependencies

Buka terminal di VS Code (`Ctrl + `` ` atau `Terminal > New Terminal`) dan jalankan:

\`\`\`bash
npm install
\`\`\`

Atau jika menggunakan yarn:

\`\`\`bash
yarn install
\`\`\`

### 3. Jalankan Development Server

\`\`\`bash
npm run dev
\`\`\`

Atau dengan yarn:

\`\`\`bash
yarn dev
\`\`\`

### 4. Akses Aplikasi

Buka browser dan kunjungi: `http://localhost:3000`

## Akun Demo

### Admin Account
- **Email:** admin@pranaargentum.com
- **Password:** admin123
- **Akses:** Dashboard admin, manajemen pengguna, upload sertifikat

### User Account
- **Email:** user@example.com
- **Password:** user123
- **Akses:** Dashboard pengguna, lihat sertifikat pribadi

## Panduan Penggunaan

### Untuk Admin
1. Login dengan akun admin
2. Akses "Manajemen Sertifikat" untuk upload sertifikat baru
3. Akses "Manajemen Pengguna" untuk membuat akun user baru
4. Lihat statistik di dashboard utama

### Untuk User
1. Login dengan akun user
2. Lihat semua sertifikat di dashboard
3. Download atau view sertifikat yang tersedia
4. Logout melalui menu user

## Struktur Project

\`\`\`
prana-argentum-certification-portal/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard pages
│   ├── dashboard/                # User dashboard pages
│   ├── login/                    # Login page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── providers.tsx             # Context providers
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── certificate-preview.tsx   # Certificate preview component
│   ├── company-logo.tsx          # Company logo component
│   ├── file-upload.tsx           # File upload component
│   ├── navbar.tsx                # Navigation component
│   ├── user-management.tsx       # User management component
│   └── user-menu.tsx             # User menu dropdown
├── lib/                          # Utility libraries
│   ├── simple-backend-auth.tsx   # Authentication context
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Documentation
\`\`\`

## Development Scripts

\`\`\`bash
# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Jalankan production server
npm run start

# Lint code
npm run lint

# Type checking
npm run type-check
\`\`\`

## Troubleshooting

### Port 3000 sudah digunakan
Jika port 3000 sudah digunakan, Next.js akan otomatis menggunakan port 3001. Atau Anda bisa specify port lain:

\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Module tidak ditemukan
Pastikan semua dependencies sudah terinstall:

\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Error TypeScript
Jalankan type check untuk melihat error:

\`\`\`bash
npm run type-check
\`\`\`

## Customization

### Mengubah Warna Brand
Edit file `tailwind.config.js` untuk mengubah color palette sesuai brand Prana Argentum.

### Menambah Fitur
1. Buat component baru di folder `components/`
2. Tambahkan page baru di folder `app/`
3. Update navigation di `components/navbar.tsx`

### Database Integration
Untuk production, ganti localStorage dengan database real:
1. Setup database (PostgreSQL, MySQL, atau MongoDB)
2. Update authentication di `lib/simple-backend-auth.tsx`
3. Tambahkan API routes untuk CRUD operations

## Production Deployment

### Vercel (Recommended)
1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Deploy otomatis akan berjalan

### Manual Build
\`\`\`bash
npm run build
npm run start
\`\`\`

## Support

Untuk pertanyaan atau bantuan:
- Email: admin@pranaargentum.com
- Lokasi: Jl. Ikan Mungsing V No.75, Perak Barat, Kec. Krembangan, Surabaya
- Telepon: (031) 99021411

## License

© 2025 Prana Argentum. All rights reserved.
