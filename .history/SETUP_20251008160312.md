# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get YouTube API Key
1. Visit: https://console.cloud.google.com/
2. Create a project
3. Enable "YouTube Data API v3"
4. Create an API Key

### Step 3: Configure API Key
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your API key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

### Step 4: Run the App
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to: http://localhost:3000

---

## ✅ Verification

If everything works correctly, you should see:
- ✅ A search bar at the top
- ✅ Videos loading automatically (default search: "Next.js tutorials")
- ✅ First video playing on the left
- ✅ 5 search results on the right
- ✅ Try searching for something!

## ❌ Common Issues

### Issue: "Failed to search videos"
**Solution**: Check your API key in `.env.local`

### Issue: Videos not loading
**Solution**: 
1. Verify YouTube Data API v3 is enabled in Google Cloud Console
2. Check API key restrictions
3. Monitor quota usage (10,000 units/day)

### Issue: Build errors
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Full Documentation
See [README.md](./README.md) for complete documentation.
