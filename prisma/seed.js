// seed.js
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some initial users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      phoneNumber: '123-456-7890',
      role: 'STUDENT',
      studentId: 'S123456',
      department: 'Computer Science',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      phoneNumber: '987-654-3210',
      role: 'FACULTY',
      facultyId: 'F654321',
      department: 'Mathematics',
    },
  });

  console.log({ user1, user2 });

  // Create some initial courses
  const course1 = await prisma.course.create({
    data: {
      courseCode: 'CS101',
      title: 'Introduction to Computer Science',
      description: 'Learn the basics of computer science.',
      credits: 3,
      capacity: 30,
      schedule: { days: ['Monday', 'Wednesday'], time: '10:00 AM - 11:30 AM' },
      prerequisites: [],
      department: 'Computer Science',
      semester: 'Fall 2024',
      instructorId: user2.id,
    },
  });

  console.log({ course1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });