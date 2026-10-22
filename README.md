# 🦷 Pearl Dental Studio — Premium Dental Clinic Website

> **A high-end, production-ready full-stack web application designed for premium dental clinics, specialized practices, and healthcare professionals.**  
> Crafted with a bespoke aesthetic, modern animations, real-time appointment booking, and a secure Express REST API.

---

## 🌟 Overview & Highlights

**Pearl Dental Studio** is a full-featured sample website built to demonstrate high-converting design, patient-first UX, and modern engineering standards to dental practices in Bengaluru, India.

- **Modern Medical Aesthetics**: Tailored teal-and-navy healthcare palette, modern typography, glassmorphism cards, micro-interactions, and responsive layouts.
- **Complete Booking Funnel**: Interactive appointment booking workflow with client-side & server-side validation, service selection, time slot picking, and instant booking reference codes.
- **WhatsApp Integration**: Direct one-click consultation via WhatsApp with pre-filled enquiry text.
- **Patient Education & Transparency**: Filterable FAQ accordion, hygiene standard compliance spotlights, doctor qualification showcases, and before-and-after photo galleries.
- **Robust Security & Performance**: Helmet security headers, rate limiting (global + strict limits for appointment spam prevention), input validation sanitization, and Vite build optimization.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/) (Browser Router, nested routes, scroll restoration)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens & Utilities
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll reveals, staggered fade-ins, smooth accordions)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand components
- **HTTP Client**: [Axios](https://axios-http.com/) (Centralized API client with response interceptors)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Security & Middlewares**:
  - `helmet`: Secure HTTP response headers
  - `cors`: Cross-Origin Resource Sharing control
  - `express-rate-limit`: Endpoint protection against abuse
  - `express-validator`: Payload validation and sanitization
- **Storage**: Lightweight, atomic JSON flat-file storage service (`backend/data/`) with automated ID generation via `uuid`

---

## 📂 Project Structure

```text
Dental-Clinic/
├── backend/
│   ├── data/                   # JSON data stores (clinic, doctors, services, faqs, appointments)
│   │   ├── appointments.json
│   │   ├── clinic.json
│   │   ├── contact-enquiries.json
│   │   ├── doctors.json
│   │   ├── faqs.json
│   │   └── services.json
│   ├── src/
│   │   ├── controllers/        # Request handling logic
│   │   ├── middleware/         # Error handler, rate limiters, validation rules
│   │   ├── routes/             # Express API routes (/api/*)
│   │   ├── services/           # Storage service (JSON read/write atomicity)
│   │   ├── app.js              # Express app definition & middleware pipeline
│   │   └── server.js           # Server entry point & graceful shutdown
│   ├── .env.example            # Backend environment template
│   └── package.json
│
├── frontend/
│   ├── public/                 # Static assets (favicons, SVG icon sprites)
│   ├── src/
│   │   ├── assets/             # Brand logos and images
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   └── ui/             # FaqAccordion, Gallery, Toast notification
│   │   ├── context/            # ClinicContext (Global clinic data provider)
│   │   ├── layouts/            # RootLayout (Header, Footer, Scroll-to-top)
│   │   ├── pages/              # Route pages (Home, Services, Doctors, About, FAQ, Contact, Appointment)
│   │   ├── services/           # Centralized Axios API caller
│   │   ├── App.css
│   │   ├── App.jsx             # React Router routing tree
│   │   ├── index.css           # Design tokens, color system, button styles
│   │   └── main.jsx            # React root mount
│   ├── index.html
│   ├── vite.config.js          # Vite config with API proxy
│   └── package.json
│
├── package.json                # Root workspace scripts (concurrent dev/start)
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone & Install Dependencies
Run the installation command from the repository root:
```bash
git clone https://github.com/varun99015/Pearl-Dental-Service.git
cd Pearl-Dental-Service

# Install root, backend, and frontend dependencies
npm run install:all
```
*(Alternatively, run `npm install` inside the root, `backend/`, and `frontend/` folders individually.)*

### 2. Configure Environment Variables
In `backend/`, create a `.env` file based on `.env.example`:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Development Server
From the root folder, launch both the backend API and frontend Vite dev server concurrently:
```bash
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`
- **Health Check**: `http://localhost:3000/api/health`

---

## 📡 REST API Documentation

All API endpoints are prefixed with `/api`. When running the frontend through Vite, requests to `/api` are automatically proxied to `http://localhost:3000`.

### Endpoints Overview

| Method | Endpoint | Description | Rate Limit |
|---|---|---|---|
| `GET` | `/api/health` | Service health status check | Global (200 req / 15m) |
| `GET` | `/api/clinic` | Clinic profile info, timings, contacts, social links | Global |
| `GET` | `/api/services` | Detailed list of dental procedures and treatments | Global |
| `GET` | `/api/doctors` | Doctor profiles, qualifications, and specialties | Global |
| `GET` | `/api/faqs` | Frequently asked questions organized by category | Global |
| `POST` | `/api/appointments` | Submits patient appointment booking request | Strict (5 req / 1 hr) |
| `GET` | `/api/admin/appointments` | Lists all booked appointments | Global |
| `POST` | `/api/contact` | Submits patient enquiry from contact page | Form (10 req / 15m) |

---

### Request & Response Examples

#### 1. Book an Appointment (`POST /api/appointments`)
**Request Body:**
```json
{
  "patientName": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul.sharma@example.com",
  "service": "Dental Implants",
  "preferredDate": "2026-11-15",
  "preferredTime": "11:00 AM",
  "notes": "Looking for consultation regarding single tooth implant.",
  "consent": true
}
```

**Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Appointment request submitted successfully.",
  "appointment": {
    "id": "e818816c-4ec7-463d-82d2-8da517cfc560",
    "patientName": "Rahul Sharma",
    "phone": "9876543210",
    "email": "rahul.sharma@example.com",
    "service": "Dental Implants",
    "preferredDate": "2026-11-15",
    "preferredTime": "11:00 AM",
    "notes": "Looking for consultation regarding single tooth implant.",
    "status": "pending",
    "createdAt": "2026-10-22T05:30:00.000Z"
  }
}
```

---

#### 2. Submit Contact Inquiry (`POST /api/contact`)
**Request Body:**
```json
{
  "name": "Priya Nair",
  "email": "priya.nair@example.com",
  "phone": "9845012345",
  "message": "Do you offer weekend consultation slots for orthodontic treatments?"
}
```

**Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Thank you for reaching out. Our team will contact you shortly.",
  "enquiryId": "a1f0f49d-6497-4a0b-b1a9-b333cfc87f22"
}
```

---

## 🎨 Pages & Features

1. **Home Page (`/`)**:
   - Hero banner with quick appointment trigger & WhatsApp action
   - Feature highlight cards (Pain-free dentistry, ISO sterilization, digital imaging)
   - Popular dental services grid with direct links
   - Doctors preview section
   - Patient reviews & ratings
   - Interactive FAQ accordion & dental clinic gallery

2. **Services Page (`/services`)**:
   - Deep anchor-linked service cards (`#general-dentistry`, `#teeth-whitening`, `#dental-implants`, `#clear-aligners`, `#root-canal`)
   - Procedure timelines, benefits, and recommended candidate guidelines

3. **Our Doctors (`/doctors`)**:
   - Comprehensive dentist profiles with educational credentials, years of experience, and clinic leadership bios

4. **About Clinic (`/about`)**:
   - Clinic philosophy, sterile standards walkthrough, clinic atmosphere photo gallery

5. **Appointment Booking (`/appointment`)**:
   - Multi-field booking form with interactive error feedback, time slot selector, privacy consent, and generated tracking reference code

6. **Contact & Location (`/contact`)**:
   - Direct WhatsApp button, phone numbers, clinic working hours, interactive inquiry form, and location guide in Indiranagar, Bengaluru

---

## 📜 Available NPM Scripts

From the root project directory:

| Script | Command | Action |
|---|---|---|
| `npm run dev` | `concurrently ...` | Starts both backend and frontend development servers |
| `npm run dev:backend` | `cd backend && npm run dev` | Starts Express backend with nodemon |
| `npm run dev:frontend` | `cd frontend && npm run dev` | Starts Vite frontend dev server |
| `npm run build` | `cd frontend && npm run build` | Builds frontend production bundle |
| `npm run start` | `concurrently ...` | Starts production backend and preview frontend |
| `npm run install:all` | `npm i && cd backend...` | Installs dependencies across root, backend, and frontend |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
