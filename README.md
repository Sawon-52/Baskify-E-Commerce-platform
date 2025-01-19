# Baskify: A Complete Full-Stack eCommerce Platform

Welcome to **Baskify**, a feature-rich and fully functional eCommerce platform built to deliver a seamless shopping experience for users and powerful administrative tools for managing operations.

## 🚀 Live Demo
- **Live Site**: [Visit Baskify Here](https://baskify-e-commerce-platform-wu0y.onrender.com/)


---

## 🌟 Features

### User Features:
- **Registration & Login**: Smooth and secure user authentication.
- **Product Search & Categories**: Effortlessly find products by name or category.
- **Similar Products by Category**: View related products from the same category while browsing.
- **Product Reviews & Comments**: Share your thoughts on products by leaving reviews and comments.
- **Secure Payment Integration**: Seamless payment handling via **SSLCOMMERZ**.

### Admin Features:
- **Admin Dashboard**: Full control over the platform’s operations.
- **Manage Users**: View and control user activities.
- **Manage Products**: Create, update, and delete products.
- **Category Management**: Add and update product categories.
- **Order Management**: Oversee and manage customer orders.

---

## 🛠️ Technologies Used

### Frontend:
- **React.js**: For building a dynamic and interactive user interface.
- **Redux.js**: For efficient state management across the application.
- **Tailwind CSS**: For styling and creating a modern, responsive design.

### Backend:
- **Express.js**: A robust and flexible Node.js framework for handling API requests.
- **MongoDB**: A NoSQL database for managing data efficiently.

### Payment Integration:
- **SSLCOMMERZ**: A secure and reliable payment gateway.

---

## 📚 What I Learned

Developing Baskify was a rewarding experience that enhanced my skills in:
- Building scalable full-stack applications.
- Crafting user-friendly and intuitive interfaces.
- Managing databases and integrating secure payment systems.

---

## ⚙️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sawon-52/Baskify-E-Commerce-platform.git
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd Backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     SSLCOMMERZ_STORE_ID=<your-sslcommerz-store-id>
     SSLCOMMERZ_STORE_PASSWORD=<your-sslcommerz-store-password>
     BASE_URL=<redirect-when_payment>
     JWT_SECRET=<your-jwt-secret>
     PAGINATION_LIMIT=<your-pagination limit>
     ```

4. Run the frontend and  backend server:
   ```bash
   npm run dev
   ```

7. Open the application in your browser at `http://localhost:3000`.

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request.

---

## 📧 Contact

If you have any questions or feedback, feel free to reach out. I’d love to hear your thoughts on Baskify!

---

Thank you for checking out **Baskify**! 🎉
