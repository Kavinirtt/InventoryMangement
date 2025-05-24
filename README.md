# InventoryMangement

# Inventory Management System

A full-stack Inventory Management System built with Angular, Node.js, and MySQL.

## 🧰 Tech Stack

- **Frontend**: Angular CLI v19.0.6
- **Backend**: Node.js v18.19.1 (Express)
- **Database**: MySQL
- **Package Manager**: npm v10.2.4

## 🚀 Getting Started

### 📦 Clone the Project

git clone https://github.com/Kavinirtt/InventoryMangement.git

Commands to Run

cd inventory-management-fe
npm install
ng serve -o

cd inventory-management-be
npm install
npm run dev

👤 Login Credentials
🔐 Admin
Username: VGadmin
Password: Pass@123

👷 Staff
Username: VGstaff
Password: Pass@123


Best Practices Followed
Password Security
Passwords are securely hashed using bcrypt before storing in the database to protect user credentials.

Authentication & Authorization
JWT tokens are validated in middleware to ensure secure access control before users can reach protected routes.

Type Safety & Code Maintainability
Used Interfaces and Enums to enforce consistent data structures and improve code readability.

Modular Architecture
Organized the codebase by separating concerns into dedicated components, controllers, routes, and service files, enhancing scalability and maintainability.






