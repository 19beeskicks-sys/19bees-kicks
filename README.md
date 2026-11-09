# 19BeesKicks – Complete Luxury Footwear E-Commerce Platform

> **EVERY STEP. YOUR STYLE.**
> Pakistan's premier handcrafted luxury footwear atelier.

---

## Why did the demo data not show up or look different on GitHub / manual run?

This repository contains **two distinct application architectures**:

1. **The Modern Luxury React Storefront (What you see in Google AI Studio)**:
   - **Stack:** React 19 + Vite + Tailwind CSS + Express (`server.ts`)
   - **Features:** Interactive Cart Drawer, Order Tracking modal, Real-time filters, Wishlist, JazzCash TID submission with proof upload, Customer Portal, and Admin Terminal.
   - **Command to run:** `npm install` then `npm run dev` (Runs on `http://localhost:3000`).

2. **The Python/Django Backend (Alternative Windows / Django Setup)**:
   - **Stack:** Django 5 + SQLite + HTML Templates (`/templates/`)
   - **Why data was missing:** When you run `python manage.py migrate`, Django only builds the empty table structure. Without seeding, the database starts with 0 products.
   - **Why it looks different:** Django serves traditional server-rendered HTML templates (`templates/*.html`) on port 8000, not the React SPA on port 3000.

---

## Option 1: Run the Exact Luxury React Storefront (Recommended)

To get the exact interactive experience, animations, and pre-loaded products:

```bash
# 1. Install Node.js dependencies
npm install

# 2. Start the luxury application
npm run dev
```

Open your browser at **`http://localhost:3000`**.
All 6 handcrafted footwear items, cart drawer, wishlist, demo customer, and admin console will load instantly!

---

## Option 2: Run the Python / Django Version

If you prefer to run the Django server on Windows / Linux:

### Step 1: Set up Virtual Environment
```bash
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 4: Seed Demo Footwear & Users (Crucial!)
```bash
python manage.py seed_data
```
*This command populates all 6 handcrafted luxury shoes, sizes (EU 39–45), collections, and demo accounts into your local SQLite database!*

### Step 5: Start the Django Server
```bash
python manage.py runserver
```

- **Storefront URL:** `http://127.0.0.1:8000/`
- **Django Admin Panel:** `http://127.0.0.1:8000/admin/`

---

## Pre-Configured Demo Credentials

Use these credentials to log into either the React Admin Terminal or the Django Admin:

- **Master Admin:**
  - Email: `19beeskicks@gmail.com`
  - Username: `admin`
  - Password: `samad123`
- **Customer Account:**
  - Email: `hamza.khan@gmail.com`
  - Username: `hamza`
  - Password: `password123`

---

## Brand Details & Payment Setup

- **Brand:** 19BeesKicks
- **Motto:** EVERY STEP. YOUR STYLE.
- **Support WhatsApp & Phone:** +92 328 2158299
- **Email:** 19beeskicks@gmail.com
- **JazzCash Account Title:** Abdul Samad
- **JazzCash Account Number:** 03238917805
- **Free Nationwide Delivery:** Orders above PKR 15,000
