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
- MongoDB
- Emotion (for styling)

Getting Started:
1. Install dependencies:
   npm install

2. Run development server:
   npm run dev

3. Build for production:
   npm run build
   npm start

4. Create a .env file in the root directory and add the following variables:
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=
   DATABASE_URL=

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

Contributing:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

License:
MIT License