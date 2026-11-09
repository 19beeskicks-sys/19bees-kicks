# 19BeesKicks – Complete Deployment & Local Setup Guide

> **"EVERY STEP. YOUR STYLE."**
> A comprehensive guide to understanding the project architecture, running it locally, pushing to GitHub, and deploying it live so it looks **100% identical** to the preview.

---

## 1. Comparing The Two Views (Image 1 vs Image 2)

| Feature | Image 1 (AI Studio Preview / React) | Image 2 (Old Django Local Run) | Current State (Fixed) |
| :--- | :--- | :--- | :--- |
| **Engine** | Node.js + React 19 + Vite | Django 5 + SQLite | **Synchronized across both!** |
| **Hero Section** | Cinematic 2-column layout with featured "Aethel Travertine Runner" sneaker card | Centered single-column text only | **Both now have the luxury 2-column hero!** |
| **Navbar** | Search, Wishlist, Account icons + "BAG 0" badge button | Plain "Shopping Bag" & "Admin" text | **Both have luxury icons and bag counter!** |
| **Products** | 6 luxury handcrafted footwear items | Empty grey boxes (database unseeded) | **Pre-bundled demo data in both stacks!** |
| **Default Port** | `http://localhost:3000` | `http://127.0.0.1:8000` | Works seamlessly on both ports |

---

## 2. Project Architecture Overview

This project was engineered as a dual-stack full solution:

```
├── src/                          # MODERN REACT FRONTEND (Image 1)
│   ├── assets/images/            # High-resolution luxury product photography
│   ├── components/               # Navbar, Footer, CartDrawer, ProductCard, Modals
│   ├── context/ShopContext.tsx   # Global e-commerce state (Cart, Wishlist, Auth, Products)
│   ├── data/initialProducts.ts   # Pre-bundled offline catalog (guarantees zero empty screens)
│   ├── pages/                    # Home, Shop, Product Detail, Men, Women, Admin, Checkout
│   ├── App.tsx                   # Main React entry router
│   ├── index.css                 # Tailwind CSS v4 design system & luxury typography
│   └── main.tsx                  # React DOM mount point
│
├── public/                       # STATIC WEB ASSETS
│   ├── images/                   # Product and hero images mirrored for production builds
│   └── 19BeesKicks-complete-project.zip  # Downloadable one-click complete project package
│
├── server.ts                     # FULL-STACK NODE.JS / EXPRESS ENGINE
├── server/db.ts                  # Persistent database manager
├── data/database.json            # Active database storing products, orders, and users
│
├── config/, store/, orders/      # PYTHON / DJANGO BACKEND ALTERNATIVE
│   ├── store/management/commands/seed_data.py # Instant SQLite database seeder
│   └── templates/                # Server-rendered HTML templates (matching Image 1)
│
├── vercel.json                   # Zero-config deployment for Vercel
├── .github/workflows/deploy.yml  # Automated GitHub Actions workflow for GitHub Pages
└── package.json                  # Node scripts and dependencies
```

---

## 3. How to Run Manually from Downloaded ZIP

### Option A: The Luxury React Storefront (Recommended)

This runs the exact interactive application with the Cart Drawer, animated filters, and modals:

1. **Extract the ZIP file** to a folder on your computer (e.g. `19BeesKicks`).
2. **Open your Terminal** (Command Prompt, PowerShell, or macOS Terminal) and navigate into the folder:
   ```bash
   cd path/to/19BeesKicks
   ```
3. **Install dependencies** (requires [Node.js](https://nodejs.org/)):
   ```bash
   npm install
   ```
4. **Start the application**:
   ```bash
   npm run dev
   ```
5. **Open your browser** at:
   👉 **`http://localhost:3000`**

*All 6 luxury footwear products, high-resolution imagery, cart drawer, and evaluation accounts will load immediately.*

---

### Option B: The Python / Django Version

If you want to run the Django SQLite architecture on Windows or Linux:

1. **Open your Terminal** in the project folder:
   ```bash
   cd path/to/19BeesKicks
   ```
2. **Create and activate a virtual environment**:
   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. **Install Python packages**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```
5. **Seed all demo products and accounts**:
   ```bash
   python manage.py seed_data
   ```
   *(This command inserts all 6 shoes, sizes EU 39–45, and admin accounts into your local SQLite database).*
6. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```
7. **Open your browser** at:
   👉 **`http://127.0.0.1:8000/`** (Storefront)
   👉 **`http://127.0.0.1:8000/admin/`** (Django Admin Panel)

---

## 4. How to Push the Code to GitHub

1. **Initialize Git** in the project directory:
   ```bash
   git init
   ```
2. **Add all files**:
   ```bash
   git add .
   ```
3. **Commit the files**:
   ```bash
   git commit -m "Initial commit: 19BeesKicks luxury footwear e-commerce"
   ```
4. **Create a new repository on GitHub** (e.g. `19beeskicks`).
5. **Link and push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/19beeskicks.git
   git branch -M main
   git push -u origin main
   ```

---

## 5. How to Deploy Live (100% Free)

### Method 1: Deploy to Vercel (Easiest & Fastest — 60 Seconds)

1. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Select your **`19beeskicks`** repository and click **Import**.
4. Vercel automatically detects the Vite framework and reads the included `vercel.json`.
5. Click **Deploy**.
6. **Done!** Your live website will look **100% identical to Image 1** with lightning-fast worldwide CDN delivery.

---

### Method 2: Deploy to GitHub Pages (Automatic)

We have included a pre-configured GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. In your GitHub repository, open:
   👉 **`https://github.com/19beeskicks-sys/19bees-kicks/settings/pages`**
2. Under **"Build and deployment"** > **"Source"**:
   Change from *"Deploy from a branch"* to 👉 **"GitHub Actions"**.
   *(GitHub requires this one-time setting so GitHub Actions has permission to publish Pages).*
3. Go back to the **Actions** tab (or click **"Re-run jobs"** on the failed run).
4. Both **build** and **deploy** will turn green, and your site will be live at:
   👉 **`https://19beeskicks-sys.github.io/19bees-kicks/`**

---

### Method 3: Deploy Full-Stack to Render or Railway

If you want the Node.js Express API backend (`server.ts`) running live with dynamic orders:

1. Sign up on [render.com](https://render.com/).
2. Create a new **Web Service** and connect your GitHub repository.
3. Configure settings:
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. Click **Create Web Service**.

---

## 6. Pre-Seeded Test Credentials

| Role | Email / Username | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Master Admin** | `19beeskicks@gmail.com` (or `admin`) | `samad123` | Full Admin Terminal, Order Management, JazzCash Verification, Product Inventory |
| **Alternative Admin** | `admin@19beeskicks.com` | `admin123` | Store management and audit logs |
| **VIP Customer** | `hamza.khan@gmail.com` (or `hamza`) | `password123` | Customer Dashboard, Order History, Tracking, Address Book |

---

## 7. Quality Checklist

- [x] **Identical Visual Design**: Dark luxury hero with the "The 2026 Sovereign Edition" crest, matching action buttons, trust badges, and floating price tag card.
- [x] **No Blank Database**: Standalone pre-bundled dataset ensures products never fail to load.
- [x] **Production Static Assets**: All images mirrored to `/public/images/` and `/public/src/assets/images/` so Vite production builds never return 404 image errors.
- [x] **Dual Deployment Support**: Runs natively with Node.js (`npm run dev`) or Python Django (`python manage.py runserver`).
