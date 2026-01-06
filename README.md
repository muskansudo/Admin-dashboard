
# SSR E-Commerce Product Management Dashboard

A **Server-Side Rendered (SSR) admin dashboard** for managing products, inventory, analytics, and admin users for an e-commerce platform.  
Built with **Next.js App Router**, **MongoDB**, and **Cloudinary**, this dashboard demonstrates secure admin authentication, CRUD operations, global search, category filtering, pagination, and analytics.

---

##  Features

-  Server-Side Rendering (SSR) for fast page loads  
-  Admin authentication & role-based access  
   - Login page that only accepts admin credentials  
   - Logout functionality to securely end admin sessions
-  Sidebar navigation to access:  
   - Product Management  
   - Analytics  
   - Admin Management  
   - Homepage Overview
-  Homepage overview showing key stats and product inventory
-  Image upload via Cloudinary 
-  Product Management (Add, Edit, Delete) using MongoDB  
-  Global search with pagination across all pages  
-  Category-based product filtering stored in MongoDB
-  Admin user management saved in MongoDB 
-  Analytics dashboard with product & stock insights  
-  Deployed on Vercel  

---

###  Rendering & SSR Details

This dashboard is **SSR-first** with Next.js: pages fetch data on the server for fast, secure loads, while client-side interactivity is used only where needed (`use client`).  

| Page | Rendering | Notes |
|------|-----------|-------|
| **Login** | Client | Interactive form for admin credentials. |
| **Homepage / Overview** | Server | Pre-renders metrics & summaries securely. |
| **Products** | Client | Interactive add/update/search; data via secure API. |
| **Analytics** | Server + Client | Page SSR fetches analytics; charts render client-side. |
| **Admin Management** | Server + Client | Admin list SSR; add admin form is client-side. |

**Takeaway:** All sensitive data is fetched server-side, ensuring security & performance, while client-side is only for interactive components.

---

##  Tech Stack

- **Frontend & Backend**: Next.js (App Router, SSR)  
- **Database**: MongoDB + Mongoose  
- **Authentication**: Cookie-based admin authorization 
- **Image Storage**: Cloudinary
- **Data Visualization**: Recharts 
- **Data Fetching**: SWR  
- **Form Validation**: Zod  
- **Deployment**: Vercel  

---

##  Dummy Admin Credentials

Use these credentials to access the dashboard:

```
Email: admin_db@gmail.com
Password: admin123
```

---

##  Live Deployment

**Dashboard URL:**  
[https://admin-dashboard-x6tu.vercel.app/](https://admin-dashboard-x6tu.vercel.app/)

---

## 🎥 Demo Video

**Watch Demo (3–5 mins):**  
[https://youtube.com/your-demo-link](https://youtube.com/your-demo-link)  

*Shows login, homepage with overview, product CRUD, search, pagination, category filtering, analytics, admin management.*

---

##  Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/muskansudo/Admin-dashboard.git
cd Admin-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables

Create a file named `.env.local` in the root directory and add the following values:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000           # For production, set this to the deployed Vercel URL
JWT_SECRET=your_jwt_secret_key
```


### 4️⃣ Run Development Server
```bash
npm run dev
```

### 5️⃣ Access the application
Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

##  Project Structure
```
├── app/
│   ├── api/
│   │   ├── auth/                # Login, logout, JWT auth routes
│   │   ├── products/            # Product CRUD, search, pagination
│   │   ├── analytics/           # Dashboard analytics APIs
│   │   ├── admins/              # Admin management APIs
│   │   └── home/                # Homepage overview data 
│   │
│   ├── admin/                   
│   │   ├── admins/               # Admin management UI 
│   │   ├── products/             # Product management UI
│   │   ├── analytics/            # Analytics UI
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── AdminShell.tsx            
│   │   └── layout.tsx
│   │   
│   ├── login/                   # Admin login page
│   ├── layout.tsx               
│   ├── globals.css
│   ├── middleware.ts      
│   └── page.tsx                 
│
├── app/lib/
│   ├── db.ts                    # MongoDB connection
│   ├── requireAdmin.ts          # Admin auth guard
│   ├── cloudinary.ts            # Cloudinary config
│   └── validators/              # Zod schemas
│
├── app/models/
│   ├── Product.ts               # Product schema
│   └── Admin.ts                 # Admin schema
│
├── README.md                    # Project documentation
├── public/                      # Static assets
├── .gitignore                   # Git ignored files
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├──...                           # Other files

---
```


