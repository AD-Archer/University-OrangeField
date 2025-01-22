import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial courses
  const courses = [
    {
      code: 'CS101',
      title: 'Introduction to Programming',
      description: 'Learn programming fundamentals with Python',
      credits: 3,
      prerequisites: 'None',
    },
    // Add more courses...
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: {},
      create: course,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 