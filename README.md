# Project Title: User Login API with Email and OTP Authentication.

Description: This Rest API developed using Nodejs, Expressjs and SQLite as database

# Folder Structure:
- database.js: Contains files related to the Sqlite database connection and table creationn.
- routes: Contains route files for handling API endpoints.
- server.js: Main file where the server is initialized.
- middleware: Consist of Middleware to rate the limit of otp request.

# Security Measures taken:
- Rate limit on OTP Request✔️
- OTP expiration✔️
- OTPs hashing✔️
- Secure Communication that is https using self signed certificate✔️
- Json web token✔️
- Input Validation ✔️

# Clone the repository: 
git clone [https://github.com/Fardinsk7/Internship_Assignment2.git]

# Install dependencies: npm install
Start the server: npm start

# API Endpoints:
- POST /api/register : Register an email
- POST /api/request-otp : Send otp to register user email. 
- POST /api/verify-otp : Verify otp.



# Contributing:
- Fork the repository.
- Create a new branch: git checkout -b feature/new-feature
- Make your changes and commit them: git commit -m 'Add new feature'
- Push to the branch: git push origin feature/new-feature
- Submit a pull request.


# Author:
## Fardin Khan

Contact:
For any inquiries, please contact [itzfardinsk@gmail.com].

Feel free to contribute or provide feedback! 🚀