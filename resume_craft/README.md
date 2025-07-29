📄 ResumeCraft: AI-Powered Resume Builder
ResumeCraft is a full-stack application designed to help users create professional, ATS-friendly resumes with ease. It features a React-based frontend for an intuitive user experience and a Rust-powered backend that generates downloadable PDF resumes using LaTeX.

✨ Features
Frontend (React)
Intuitive Form Interface: A user-friendly form to input personal, education, experience, project, and skill information.

Dynamic Sections: Easily add and remove multiple entries for education, experience, projects, and skill categories/items.

Responsive Design: Optimized for various screen sizes using Tailwind CSS.

User Authentication: Secure signup and login functionality.

Modern UI/UX: Built with React, Vite, and Tailwind CSS for a fast and visually appealing experience.

Backend (Rust)
PDF Generation: Converts structured resume data (JSON) into a professional PDF using LaTeX (pdflatex).

Secure & Efficient: Uses tempfile for per-request temporary directories, ensuring no race conditions during PDF generation.

Robust API: Built with Actix Web for high performance and asynchronous request handling.

Database Integration: Stores user information (hashed passwords) in MongoDB.

JWT Authentication: Secures API endpoints for user login and resume submission.

Cross-Platform: Works on Windows, Linux, and Mac (requires pdflatex installation).

🚀 Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.

Vite: A fast build tool for modern web projects.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

React Router DOM: For declarative routing in React applications.

Axios: A promise-based HTTP client for the browser and Node.js.

Lucide React: A collection of beautiful, pixel-perfect icons.

Backend
Rust: A systems programming language focused on safety, speed, and concurrency.

Actix Web: A powerful, pragmatic, and extremely fast web framework for Rust.

MongoDB: A NoSQL database for storing user data.

jsonwebtoken: For handling JSON Web Tokens (JWT) for authentication.

argon2: For secure password hashing.

chrono: Date and time library for Rust.

tempfile: For creating temporary files and directories.

async-process: For asynchronous process management (running pdflatex).

actix-cors: Middleware for handling Cross-Origin Resource Sharing.

LaTeX: A document preparation system for high-quality typesetting (specifically used for PDF generation).

⚙️ Setup and Installation
Prerequisites
Rust: https://www.rust-lang.org/tools/install

Node.js & npm/yarn: Install Node.js

MongoDB: Install MongoDB and ensure it's running.

LaTeX Distribution: Install a LaTeX distribution that includes pdflatex (e.g., TeX Live for Linux/Windows, MacTeX for macOS).

1. Clone the Repository
git clone https://github.com/krisn2/rust-cohort/tree/main/resume_craft
cd resume_craft

2. Backend Setup (Rust)
Navigate to the resume_back directory:

cd resume_back

Configure Environment Variables:

Create a .env file in the resume_back directory and add your MongoDB URI and JWT secret key:

DATABASE_URL=mongodb://localhost:27017
JWT_SECRET=your-super-secret-key-for-jwt-signing # IMPORTANT: Change this to a strong, random key in production!

Run the Backend:

cargo run

The backend server will start on http://127.0.0.1:8080.

3. Frontend Setup (React)
Open a new terminal and navigate to the resume-frontend directory:

cd ../resume-frontend

Install Dependencies:

npm install # or yarn install

Configure API Endpoint:

Create a .env file in the resume-frontend directory and add the backend API URL:

VITE_API=http://127.0.0.1:8080

Run the Frontend:

npm run dev # or yarn dev

The frontend application will typically open in your browser at http://localhost:5173.

🤝 Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.