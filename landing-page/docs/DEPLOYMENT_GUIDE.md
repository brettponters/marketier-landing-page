# The Marketier - Deployment & Update Guide

## 🚀 Current Live Website
**URL**: https://marketier-app.vercel.app/

## 📡 How to Update Your Website

### Method 1: Direct GitHub Updates (Easiest)
1. Go to your GitHub repository: `brettponters/marketier-app`
2. Navigate to the file you want to edit
3. Click the **pencil icon** to edit
4. Make your changes
5. Commit changes with a descriptive message
6. **Vercel auto-deploys** in ~30 seconds ⚡

### Method 2: Local Development + Push
```bash
# Make your changes locally
git add .
git commit -m "Update website content"
git push marketier-app main
```

### Method 3: Vercel Dashboard
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click your `marketier-app` project
- Go to **"Deployments"** tab  
- Click **"Redeploy"** to rebuild from latest code

## 🌐 Adding Custom Domain

### Step 1: In Vercel Dashboard
1. Go to your project: `marketier-app`
2. Click **"Domains"** tab
3. Click **"Add Domain"**
4. Enter your domain: `themarketier.com`

### Step 2: Configure DNS
Add these DNS records at your domain registrar:

**For root domain:**
```
Type: A
Name: @
Value: 76.76.19.61
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Domain Registrars
- **Namecheap** (recommended, ~$12/year)
- **GoDaddy**
- **Cloudflare** (cheapest)
- **Google Domains**

## 🔧 Common Updates

### Update Landing Page Content
Edit: `src/App.jsx`

### Update Chatbot Responses  
Edit: `api/chat.js` (modify the `systemPrompt`)

### Update Contact Info/Calendly Link
Edit: `api/chat.js` (change Calendly URL)

### Update Pricing
Edit: `src/App.jsx` (Hero section and pricing mentions)

### Update Company Info
Edit: `index.html` (meta tags, titles)

## ⚡ Live Development Workflow
1. **Edit files** (locally or on GitHub)
2. **Push changes** to `marketier-app` repo
3. **Vercel auto-deploys** in 30 seconds
4. **Visit live site** to see changes

## 🛠️ Repository Structure
```
/
├── src/                    # React frontend components
│   ├── App.jsx            # Main landing page
│   ├── components/        
│   │   └── AIChatbot.jsx  # AI chatbot component
│   ├── ComingSoonPage.jsx # Coming soon page
│   └── PartnerPage.jsx    # Partner application
├── api/                   # Vercel serverless functions
│   └── chat.js           # OpenAI integration
├── public/               # Static assets
│   ├── sitemap.xml       # SEO sitemap
│   └── robots.txt        # SEO robots file
└── index.html           # HTML template with meta tags
```

## 🔐 Environment Variables (Vercel Dashboard)
```
OPENAI_API_KEY=your_openai_api_key
```

## 📈 Monitoring & Analytics
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: Add to `index.html` if needed
- **Vercel Logs**: Check API function logs in dashboard

## 🚨 Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all files are committed
- Verify `package.json` dependencies

### API Not Working
- Check OpenAI API key in environment variables
- Verify API function logs in Vercel dashboard
- Test fallback responses

### Domain Issues
- DNS propagation can take 24-48 hours
- Verify DNS records match Vercel requirements
- Check domain registrar configuration

---

💡 **Pro Tip**: Every push to the `main` branch automatically deploys to production. Use branches for testing major changes!