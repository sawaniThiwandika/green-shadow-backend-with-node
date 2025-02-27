# GreenShadow - Farm Management System

## Project Overview
GreenShadow is a farm management system that allows users to manage various farm-related entities such as staff, fields, crops, vehicles, equipment, and logs. This full-stack application uses:

- **Backend**: Node.js with Express.js
- **Frontend**: React.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

## Features
- Manage staff, fields, crops, vehicles, equipment, and logs.
- JWT-based user authentication for secure access.
- Real-time data syncing with the backend.

## Setup Instructions

### 1. Clone the Repository
#### Backend:
```bash
git clone https://github.com/sawaniThiwandika/green-shadow-backend-with-node.git
```
#### Frontend:
```bash
git clone https://github.com/sawaniThiwandika/green-shadow-frontend-with-react.git
```

### 2. Backend Setup (Node.js with Express)
- Navigate to the backend directory:
  ```bash
  cd GreenShadow/backend
  ```
- Install the required dependencies:
  ```bash
  npm install
  ```
- Configure your MySQL database in the `.env` file:
  ```env
  DB_HOST=localhost
  DB_USER=yourusername
  DB_PASSWORD=yourpassword
  DB_NAME=greendb
  JWT_SECRET=yourjwtsecret
  ```
- Run Prisma migrations to set up the database schema:
  ```bash
  npx prisma migrate dev
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup (React.js)
- Navigate to the frontend directory:
  ```bash
  cd GreenShadow/frontend
  ```
- Install the required dependencies:
  ```bash
  npm install
  ```
- Start the frontend server:
  ```bash
  npm start
  ```

### 4. Running the Application
- Once both servers are running, the frontend will be accessible at `http://localhost:5173`, and the backend will be available at `http://localhost:3000`.
- You can now log in with your JWT token and manage the various entities in the system.

## Technologies Used
- Node.js
- Express.js
- React.js
- MySQL
- Prisma ORM
- JWT Authentication

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
