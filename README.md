Orange Field University - Student Portal

A Next.js web application for managing student courses and academic progress.

Features:
- User authentication with email
- Course enrollment system
- Academic progress tracking
- GPA and credits updates 
- Responsive design for all devices

Tech Stack:
- Next.js 14
- React 18
- TypeScript
- Material-UI
- Prisma
- NextAuth
- Postgres
- Emotion (for styling)

Getting Started:
1. Install dependencies:
   npm install
   run "node /script/seed.js" to seed the database

2. Create a .env file in the root directory view .env.example for the variables
   Note: the database url is already set up for the azure postgres database


3. Run development server:
   npm run dev

4. Build for production:
   npm run build
   npm start


Project Structure:
/src
  /app
    /(pages)         # Route pages
    /components      # Shared components
    /contexts        # Context providers
    /styles         # CSS modules
    /shared-theme   # MUI theme setup
    /utils          # Utility functions
  /types            # TypeScript types

Key Features:
- Course Management:
  * View available courses
  * Enroll in courses
  * Track enrolled courses
  * Automatic course removal from available list after enrollment

- Academic Progress:
  * View current GPA
  * Track completed credits
  * Persistent data storage

- User Experience:
  * Toast notifications
  * Responsive design
  * Clean, modern UI
  * Easy navigation

- Admin Features:
  * View all courses
  * View all users
  * View all enrollments
  * View all departments
  * View all instructors

- Faculity Features:( to be added)
  * View all courses
  * View all users
  * View all enrollments
  * View all departments
  * View all instructors

Getting Started:
1. Clone the repository
2. Install dependencies
3. Run development server
4. Create a .env file
5. Run the application
6. Create and login with your email and password
7. Enroll in courses(using your profile page in the navbar)
8. View your academic progress(using your profile page in the navbar)
9. View your courses(using your profile page in the navbar)
10. View your enrollments(using your profile page in the navbar)
11. Create an naturally and make it an admin account(inside of your database)


Contributing:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

License:
MIT License