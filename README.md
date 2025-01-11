# Captive Portal Form

A web-based captive portal form built using JavaScript, HTML, and CSS (Vite for frontend). The form collects essential user information before granting network access and saves the data to a MySQL database through a Node.js backend.

## Features

- Input fields for user's **Name**, **Phone Number**, and **Birthday**
- Basic form validation to ensure all fields are filled correctly
- A clean and minimalist UI with animations
- Backend powered by Node.js and Express.js
- Data storage using MySQL

## Folder Structure

captive-portal/ ├── backend/ # Backend code (Node.js + MySQL) │ ├── server.js │ ├── db.js │ ├── .env │ ├── package.json ├── frontend/ # Frontend code (Vite project) │ ├── src/ │ │ ├── components/ │ │ ├── App.jsx │ │ ├── main.jsx │ │ ├── index.html │ ├── package.json ├── .gitignore ├── README.md


## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- MySQL server

### Backend Setup
1. On a terminal Navigate to the `backend` directory:
   ```bash
   cd backend

2. Install dependencies:

    npm install

3. Create a .env file with the following variables:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=captive_portal
    PORT=5000

4. Start the backend server:

    node server.js

### Frontend Setup

1. Navigate to the frontend directory:

    cd frontend

2. Install dependencies:

    npm install

3. Start the frontend development server:

    npm run dev

## Full-Stack Integration

To run both servers concurrently, navigate to the project root and use:

    npm run start

## Deployment

1. Build the frontend:

    npm run build --prefix frontend

2. Serve the frontend/dist folder from the backend by modifying the server.js file.

3. Deploy the backend and frontend to your preferred hosting service.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

Feel free to customize the `README.md` to reflect any additional features or specific requirements in your project!