# 🚀 Deployment Guide - MetaVerse Hub

## 📋 Pre-deployment Checklist

- ✅ All payments are in DEMO mode
- ✅ No real API keys exposed
- ✅ Environment variables configured
- ✅ Build successful (`npm run build`)
- ✅ No TypeScript errors
- ✅ README.md updated

## 🌐 Option 1: Vercel (Recommended - Easiest)

### Why Vercel?
- ✅ **Free tier** with generous limits
- ✅ **Automatic deployments** from GitHub
- ✅ **Built for Next.js** (same company)
- ✅ **Custom domains** supported
- ✅ **Environment variables** management
- ✅ **Analytics** included

### Steps:

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: MetaVerse Hub e-commerce store"
git branch -M main
git remote add origin https://github.com/yourusername/metaverse-hub.git
git push -u origin main
```

2. **Deploy to Vercel:**
- Visit [vercel.com](https://vercel.com)
- Sign up with GitHub account
- Click "New Project"
- Import your repository
- Configure settings:
  - **Framework Preset:** Next.js
  - **Build Command:** `npm run build`
  - **Output Directory:** `.next`
- Add environment variables:
  ```
  NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
  ```
- Click "Deploy"

3. **Your site will be live at:**
```
https://your-project-name.vercel.app
```

## 📄 Option 2: GitHub Pages (Static Export)

### Steps:

1. **Enable static export in `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};
```

2. **Add export script to `package.json`:**
```json
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

3. **Build and export:**
```bash
npm run export
```

4. **Deploy to GitHub Pages:**
- Go to repository Settings
- Scroll to "Pages" section
- Source: "Deploy from a branch"
- Branch: `gh-pages` or `main`
- Folder: `/docs` or `/` (root)

5. **Your site will be live at:**
```
https://yourusername.github.io/metaverse-hub
```

## 🔧 Option 3: Netlify (Alternative)

1. **Push to GitHub** (same as Vercel)
2. **Visit [netlify.com](https://netlify.com)**
3. **"New site from Git"**
4. **Connect GitHub repository**
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Deploy**

## 🌍 Option 4: Custom Domain

### For Vercel:
1. Go to project dashboard
2. Settings → Domains
3. Add your domain
4. Configure DNS records

### For GitHub Pages:
1. Add `CNAME` file to repository
2. Configure DNS at your domain provider

## 📊 Post-Deployment

### Test Your Live Site:
- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Shop page displays products
- ✅ Cart functionality works
- ✅ All payment methods work (demo mode)
- ✅ Responsive design on mobile
- ✅ Console shows no errors

### Share Your Project:
- 📱 Test on different devices
- 🔗 Share the link with friends
- 📝 Update README with live demo link
- 🌟 Add to your portfolio

## 🔒 Security Notes

### Safe for Public Deployment:
- ✅ All payments are simulations
- ✅ No real API keys exposed
- ✅ Demo/sandbox mode only
- ✅ No sensitive data stored

### Environment Variables:
```env
# Safe for production (demo values)
NEXT_PUBLIC_APP_URL=https://your-site.vercel.app
P24_TEST_MODE=true
```

## 🎯 Example Live Sites

### Vercel Deployment:
```
https://metaverse-hub-demo.vercel.app
```

### GitHub Pages:
```
https://yourusername.github.io/metaverse-hub
```

## 🆘 Troubleshooting

### Common Issues:

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Images Not Loading:**
- For GitHub Pages: Set `images.unoptimized: true`
- For Vercel: Use default settings

**Environment Variables:**
- Vercel: Add in dashboard
- GitHub Pages: Use build-time variables only

**404 Errors:**
- Check `next.config.ts` settings
- Ensure `trailingSlash: true` for static export

## 📞 Support

If you encounter issues:
1. Check build logs
2. Verify environment variables
3. Test locally first (`npm run build`)
4. Check deployment platform documentation

---

🎉 **Your MetaVerse Hub store is ready for the world!**