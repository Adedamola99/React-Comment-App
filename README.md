# FleetOS 🚗

**Fleet Finance & Driver Management SaaS (MVP)**

FleetOS is a modern SaaS dashboard designed to help fleet owners manage vehicles, drivers, and weekly remittances with full transparency.

This MVP focuses on building a scalable frontend foundation before backend integration.

---

## 🧠 Problem

Fleet owners who lease vehicles to drivers (Uber/Bolt/logistics drivers) often struggle with:

- Tracking weekly payments
- Monitoring driver performance
- Managing vehicle assignments
- Tracking maintenance schedules
- Measuring fleet profitability
- Ensuring transparency for investors

Most operators rely on spreadsheets, WhatsApp, or manual tracking — which does not scale and increases financial risk.

FleetOS solves this by providing a structured, analytics-driven management dashboard.

---

## 🚀 MVP Goals

This version focuses on:

- Building a production-ready frontend
- Establishing scalable architecture
- Creating a premium SaaS UI
- Mocking realistic business data
- Preparing the system for backend/API integration

---

## 🛠️ Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **TailwindCSS**
- **React Router**
- **Recharts** (Analytics & charts)
- Context / Zustand (State management)

---

## 📦 Features (MVP)

### 🔐 Authentication (UI Only)

- Login page
- Register page
- Clean card-based layout
- Mock authentication flow

---

### 📊 Dashboard Overview

- Total fleet revenue
- Weekly expected payments
- Outstanding payments
- Active drivers
- Total vehicles
- Revenue trend chart
- Payment status chart
- Recent activity table

---

### 👤 Drivers Management

- Drivers table
- Payment status tracking
- Performance score indicator
- Driver detail page
- Payment history view
- Risk score display

---

### 🚘 Vehicles Management

- Vehicle list
- Assigned driver info
- Weekly targets
- Vehicle status
- Service history tracking

---

### 💳 Payments

- Weekly remittance tracking
- Status filters (Paid / Late / Pending)
- KPI summaries
- Payment history table

---

### 📈 Analytics

- Monthly revenue trends
- Driver performance comparison
- Fleet ROI visualization
- Default rate analysis

---

## 🎨 Design Philosophy

FleetOS is designed to feel:

- Clean
- Professional
- Fintech-grade
- Minimal
- Structured
- Corporate

### UI Principles:

- No excessive gradients
- Neutral color palette (charcoal / navy base)
- Subtle accent color (electric blue or emerald)
- Clear spacing hierarchy
- Soft shadows
- Smooth animations
- Fully responsive

Inspired by modern SaaS dashboards like Stripe and Linear.

---

## 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── layout/
 ├── data/
 ├── types/
 ├── hooks/
 ├── utils/
 └── App.tsx
```

Architecture is modular and backend-ready.

---

## 📊 Mock Data

All business data in this MVP is mocked locally.

Backend integration will replace:

- Driver data
- Vehicle data
- Payments
- Analytics
- Authentication

---

## 🔮 Planned Backend Integration

Future development phases include:

- REST / GraphQL API integration
- Real authentication (JWT)
- GPS tracking API integration
- Payment gateway integration (Paystack / Flutterwave)
- SMS & WhatsApp notification services
- Role-based access control
- Multi-tenant fleet support

---

## 📱 Responsiveness

- Fully responsive layout
- Collapsible sidebar
- Tablet-friendly
- Mobile adaptive tables

---

## 🎯 Future Vision

FleetOS can evolve into:

- Fleet financing infrastructure
- Driver credit scoring platform
- Mobility asset investment platform
- Vehicle lease automation SaaS

---

## ⚠️ Disclaimer

This is an MVP frontend build.
All data is mocked and no real financial transactions occur.

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 💡 Author Vision

FleetOS aims to modernize fleet leasing operations by replacing spreadsheets and informal tracking systems with structured, transparent, scalable software.
