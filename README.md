# 19BeesKicks – Complete Full-Stack Luxury Footwear E-Commerce Platform

> **EVERY STEP. YOUR STYLE.**
> Pakistan's premier handcrafted luxury footwear atelier.

---

## 1. Quick Start (Live AI Studio Preview)
The application is pre-configured with a full-stack **Express + Node.js + Persistent Database + React + Vite** engine running on port 3000.
All operations (products, orders, shopping cart, customer accounts, and JazzCash manual verification) are actively running and storing live data in `data/database.json`.

---

## 2. Windows Local Setup (Django + SQLite Architecture)

To run the Django backend on Windows:

### Step 1: Open Terminal (PowerShell or Command Prompt)
```cmd
cd 19BeesKicks
python -m venv venv
venv\Scripts\activate
```

### Step 2: Install Dependencies
```cmd
pip install -r requirements.txt
```

### Step 3: Run Database Migrations
```cmd
python manage.py makemigrations
python manage.py migrate
```

### Step 4: Create Superuser Admin
```cmd
python manage.py createsuperuser
```
Enter username, email (e.g. `19beeskicks@gmail.com`), and secure password.

### Step 5: Start the Django Server
```cmd
python manage.py runserver
```

- **Storefront URL:** `http://127.0.0.1:8000/`
- **Django Admin Panel:** `http://127.0.0.1:8000/admin/`

---

## 3. Brand Identity & Configuration
- **Brand Name:** 19BeesKicks
- **Tagline:** EVERY STEP. YOUR STYLE.
- **Business Email:** 19beeskicks@gmail.com
- **WhatsApp Concierge:** +92 328 2158299
- **Phone:** +92 328 2158299
- **Currency:** Pakistani Rupees (PKR)
- **Complimentary Delivery:** Orders over PKR 15,000

---

## 4. Payment Methods & JazzCash Account
1. **JazzCash Manual Verification:**
   - **Account Title:** Abdul Samad
   - **Account Number:** 03238917805
   - **Flow:** Customer transfers via JazzCash app or `*786#`, inputs Transaction ID (TID), optionally attaches payment screenshot. Order is marked `PENDING` until audited and approved in the Admin Terminal.
2. **Easypaisa Wallet Transfer**
3. **Direct Bank Transfer (Meezan Bank)**
4. **Cash on Delivery (COD)** nationwide across Pakistan.

---

## 5. Pre-Seeded Evaluation Accounts
- **Master Admin:** `19beeskicks@gmail.com` / `samad123`
- **Customer:** `hamza.khan@gmail.com` / `password123`
