# Deployment Guide - Prana Argentum Portal

## Deploy ke Vercel (Recommended)

### Method 1: Deploy via GitHub (Recommended)

#### Step 1: Push ke GitHub
1. Buat repository baru di GitHub
2. Push code ke repository:

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Prana Argentum Certification Portal"
git branch -M main
git remote add origin https://github.com/username/prana-argentum-portal.git
git push -u origin main
\`\`\`

#### Step 2: Connect ke Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Sign up/Login dengan GitHub account
3. Click "New Project"
4. Import repository "prana-argentum-portal"
5. Configure project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install --legacy-peer-deps`
   - **Output Directory:** `.next`
6. Click "Deploy"

#### Step 3: Configure Domain (Optional)
1. Go to Project Settings → Domains
2. Add custom domain jika diperlukan
3. Update DNS settings sesuai instruksi Vercel

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
\`\`\`bash
npm install -g vercel
\`\`\`

#### Step 2: Login ke Vercel
\`\`\`bash
vercel login
\`\`\`

#### Step 3: Deploy
\`\`\`bash
# Di root folder project
vercel

# Untuk production deployment
vercel --prod
\`\`\`

## Environment Variables

Jika menggunakan environment variables, set di Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add variables yang diperlukan

## Build Configuration

Project ini menggunakan:
- **Framework:** Next.js 14
- **Node Version:** 18.x
- **Build Command:** `npm run build`
- **Install Command:** `npm install --legacy-peer-deps`

## Post-Deployment Checklist

✅ **Test Functionality:**
- [ ] Homepage loading correctly
- [ ] Login system working
- [ ] Admin dashboard accessible
- [ ] User dashboard accessible
- [ ] File upload working
- [ ] Certificate management working
- [ ] Responsive design on mobile

✅ **Performance:**
- [ ] Page load speed < 3 seconds
- [ ] Images optimized
- [ ] No console errors

✅ **Security:**
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] No sensitive data exposed
- [ ] Authentication working properly

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript types are correct

### Runtime Errors
- Check Function logs in Vercel dashboard
- Verify API routes are working
- Check browser console for client-side errors

### Performance Issues
- Use Vercel Analytics to monitor performance
- Optimize images and assets
- Check bundle size with `npm run build`

## Monitoring

- **Analytics:** Enable Vercel Analytics in project settings
- **Logs:** Monitor function logs in Vercel dashboard
- **Performance:** Use Lighthouse for performance audits

## Custom Domain Setup

1. Purchase domain from registrar
2. Add domain in Vercel project settings
3. Update DNS records:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com
4. Wait for DNS propagation (up to 48 hours)

## SSL Certificate

Vercel automatically provides SSL certificates for all deployments.
Custom domains also get automatic SSL certificates.
\`\`\`

Now let me update the package.json to ensure smooth deployment:
