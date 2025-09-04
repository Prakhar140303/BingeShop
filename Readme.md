# BingeShop

BingeShop is a full-stack e-commerce platform built with React (frontend) and Node.js/Express (backend). It provides a modern shopping experience with user authentication, product management, seamless checkout, and mock payment simulation using Razorpay.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based session management
  - Role-based access (user/admin)

- **Product Catalog**
  - Browse products by category, brand, and more
  - Responsive product listing and detail pages
  - Skeleton loaders for smooth UX

- **Shopping Cart & Checkout**
  - Add/remove products from cart
  - Quantity management
  - Address selection and management
  - Order summary and payment integration

- **Account Management**
  - View and edit profile
  - Address book (add/edit/delete addresses)
  - Order history

- **Admin Dashboard**
  - Product CRUD operations
  - Category and brand management

- **UI/UX**
  - Built with Tailwind CSS for modern design
  - Custom components: cards, badges, sheets, toasts, dropdowns
  - Animations with Framer Motion

- **FAQ Section**
  - Interactive FAQ with expand/collapse animations

- **Mock Payment Integration**
  - Simulated payments using Razorpay for real checkout experience

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Other:** Radix UI, Lucide Icons, Razorpay (mock payment)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Sample Environment Variables

#### Frontend (`frontend/.env`)
```
VITE_RAZORPAY_KEY_ID=
```

#### Backend (`backend/.env`)
```
MONGO_URL=
PORT=5000
CLIENT_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NODE_ENV=developement
```

### Installation (Development Mode)

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/BingeShop.git
   cd BingeShop
   ```

2. **Install dependencies for backend and frontend**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` files in both `backend/` and `frontend/` folders.

4. **Run the backend**
   ```sh
   cd backend
   npm start
   ```

5. **Run the frontend**
   ```sh
   cd frontend
   npm run dev
   ```

6. **Open in browser**
   - Visit [http://localhost:5173](http://localhost:5173)

### Production/Deployment

1. **Install all dependencies from the root folder**
   ```sh
   npm install
   ```

2. **Build and start the app**
   ```sh
   npm run build
   npm run start
   ```

3. **Live Deployment**
   - The app is deployed at [https://bingeshop.onrender.com/](https://bingeshop.onrender.com/)

# BingeShop Folder Structure (with Key Files)

```
BingeShop/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   │   └── products-controller.js
│   │   │   ├── auth/
│   │   │   │   └── auth.controller.js
│   │   │   └── shop/
│   │   │       ├── address-controller.js
│   │   │       ├── cart-controller.js
│   │   │       ├── order-controller.js
│   │   │       └── products-controller.js
│   │   ├── helpers/
│   │   │   ├── cloudinary.js
│   │   │   └── seed.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── address-model.js
│   │   │   ├── cart-model.js
│   │   │   ├── order-model.js
│   │   │   ├── product-model.js
│   │   │   └── user.model.js
│   │   ├── payment/
│   │   │   ├── payment.controller.js
│   │   │   └── razorpay.config.js
│   │   └── routes/
│   │       ├── admin/
│   │       │   └── products-routes.js
│   │       ├── auth/
│   │       │   └── auth-routes.js
│   │       ├── payments/
│   │       │   └── payments.routes.js
│   │       └── shop/
│   │           ├── cart-routes.js
│   │           ├── order-routes.js
│   │           ├── products-routes.js
│   │           └── address-routes.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin-view/
│   │   │   │   ├── header.jsx
│   │   │   │   ├── layout.jsx
│   │   │   │   ├── product-tile.jsx
│   │   │   │   └── sidebar.jsx
│   │   │   ├── auth/
│   │   │   │   └── Layout.jsx
│   │   │   ├── common/
│   │   │   │   ├── check-auth.jsx
│   │   │   │   ├── form.jsx
│   │   │   │   └── tool.js
│   │   │   └── shopping-view/
│   │   │       ├── AccountPage.jsx
│   │   │       ├── AddressChoice.jsx
│   │   │       ├── AddressPage.jsx
│   │   │       ├── FAQSection.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── header.jsx
│   │   │       ├── layout.jsx
│   │   │       ├── OrderPage.jsx
│   │   │       ├── product-tile.jsx
│   │   │       └── productFilter.jsx
│   │   ├── config/
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── admin-view/
│   │   │   │   ├── dashboard.jsx
│   │   │   │   ├── features.jsx
│   │   │   │   ├── image-upload.jsx
│   │   │   │   └── orders.jsx
│   │   │   ├── auth/
│   │   │   │   ├── login.jsx
│   │   │   │   └── register.jsx
│   │   │   ├── not-found/
│   │   │   │   └── index.jsx
│   │   │   └── shopping-view/
│   │   │       ├── account.jsx
│   │   │       ├── checkout.jsx
│   │   │       ├── home.jsx
│   │   │       ├── listing.jsx
│   │   │       └── index.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## License

This project is licensed
