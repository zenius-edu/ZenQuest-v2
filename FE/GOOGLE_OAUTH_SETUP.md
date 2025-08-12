# 🔐 Google OAuth Setup Guide

## 🚨 Current Issue: "Can't continue with google.com"

The error indicates that your Google OAuth app is not properly configured for localhost/local development.

## 🛠️ Step-by-Step Fix:

### 1️⃣ **Google Cloud Console Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create new one)
3. Navigate to **APIs & Services** → **Credentials**

### 2️⃣ **OAuth Consent Screen Configuration**

1. Go to **OAuth consent screen**
2. Choose **External** (for testing)
3. Fill in required fields:
   - App name: `ZenQuest`
   - User support email: Your email
   - Developer contact: Your email
4. **⚠️ IMPORTANT**: In **Authorized domains** section:
   - **DELETE** any existing domain entries
   - **LEAVE IT EMPTY** (don't add localhost or any domain)
   - This is the key to making localhost work!

### 3️⃣ **OAuth Client ID Setup**

1. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
2. Choose **Web application**
3. Configure:

   **Name**: `ZenQuest Web Client`
   
   **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   http://localhost:3001
   http://127.0.0.1:3000
   ```
   
   **Authorized redirect URIs**:
   ```
   http://localhost:3000
   http://localhost:3001
   http://127.0.0.1:3000
   ```

### 4️⃣ **Test Users (If in Testing Mode)**

1. Go back to **OAuth consent screen**
2. Scroll to **Test users** section
3. Click **Add users**
4. Add your Gmail account: `fellyciaalvira@gmail.com`
5. Save

### 5️⃣ **Environment Variables**

Create `.env` file in `FE/` directory:
```env
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
```

### 6️⃣ **Clear Browser Cache**

1. Open Chrome DevTools (F12)
2. Go to **Application** → **Storage**
3. Click **Clear site data**
4. Refresh the page

## 🎯 **Quick Debug Steps:**

### Check if Google API is loaded:
Open browser console and type:
```javascript
console.log(window.gapi);
```
Should show an object, not `undefined`.

### Check current origin:
```javascript
console.log(window.location.origin);
```
Should show something like `http://localhost:3001`.

### Check OAuth initialization:
```javascript
// After app loads
gapi.auth2.getAuthInstance().isSignedIn.get();
```

## 🐛 **Common Issues & Solutions:**

### 1. **"Non-public domains not allowed"**
- ✅ **Solution**: Remove ALL entries from "Authorized domains" in OAuth consent screen
- ❌ **Don't**: Try to add localhost to authorized domains

### 2. **"Error 400: invalid_request"**
- ✅ **Solution**: Make sure redirect URI in console EXACTLY matches your app URL
- Check: `http://localhost:3000` vs `http://localhost:3001`

### 3. **"Access blocked: app not verified"**
- ✅ **Solution**: Add your email to "Test users" list
- Click "Advanced" → "Go to ZenQuest (unsafe)"

### 4. **Google Meet interference**
- ✅ **Solution**: Close Google Meet tab or use incognito mode
- Google OAuth can conflict with multiple Google services

## 🚀 **After Setup:**

1. Restart your React dev server:
   ```bash
   npm start
   ```

2. Go to login page and click "Continue with Google"

3. Should see Google account picker instead of error

## 🔍 **Verify Configuration:**

✅ OAuth consent screen: No authorized domains  
✅ Credentials: Correct redirect URIs  
✅ Test users: Your email added  
✅ Client ID: Matches your app  

## 📱 **Expected Flow:**

```
Click "Google Login" 
→ Google account picker opens 
→ Choose account 
→ Permission screen (if first time)
→ Redirect back to your app 
→ Navigate to dashboard
```

## 🆘 **Still Not Working?**

1. Check browser console for detailed errors
2. Verify all URLs match exactly
3. Try incognito mode
4. Restart dev server
5. Clear all browser data for localhost

---

**Need help?** Check the console logs for specific error messages and compare with this guide. 