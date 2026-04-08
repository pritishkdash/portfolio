# Deploy to Render

## Step 1: Push to GitHub
Create a GitHub repository and push your code:
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

## Step 2: Deploy Backend (FastAPI)

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3.11`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 10000`
5. Click **"Create Web Service"**
6. Wait for deployment (3-5 minutes)
7. Copy your backend URL: `https://your-service.onrender.com`

## Step 3: Deploy Frontend (Static)

1. Click **"New"** → **"Static Site"**
2. Connect the same GitHub repo
3. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-service.onrender.com` (from Step 2)
5. Click **"Create Static Site"**

## Step 4: Update Frontend URL in Contact Form

In your Contact component, update the RAG API URL:
```typescript
const res = await fetch('https://pritish-ai.onrender.com/chat', {
```

## Important Notes

- **Free Tier:** Services sleep after 15 minutes of inactivity
- **Cold Start:** First visit after sleep may take 30+ seconds
- **Database:** Currently using SQLite (file-based). For production, consider:
  - Render PostgreSQL addon
  - Or use Railway.app with free PostgreSQL

## Troubleshooting

1. **CORS Error:** Make sure backend has CORS configured for your frontend URL
2. **API Not Found:** Check environment variable `VITE_API_URL` is set correctly
3. **Build Failed:** Check package.json and requirements.txt are in correct directories
