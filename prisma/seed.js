const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.enrollment.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.course.deleteMany();
  await prisma.academicProgress.deleteMany();

  console.log('Database cleaned');

  // Create initial courses
  const courses = [
    // CS Courses
    {
      code: 'CS101',
      title: 'Introduction to Programming',
      description: 'Start your coding journey with Python! Learn fundamental programming concepts, problem-solving techniques, and build your first applications.',
      credits: 3,
      prerequisites: 'None',
      price: 1050.0
    },
    {
      code: 'CS201',
      title: 'Data Structures and Algorithms',
      description: 'Master essential data structures and algorithms. Learn to write efficient code and solve complex computational problems.',
      credits: 4,
      prerequisites: 'CS101',
      price: 1400.0
    },
    {
      code: 'CS301',
      title: 'Web Development',
      description: 'Build modern, responsive websites using the latest technologies. Learn HTML5, CSS3, JavaScript, and popular frameworks like React and Next.js.',
      credits: 3,
      prerequisites: 'CS201',
      price: 1050.0
    },
    {
      code: 'CS302',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn to protect systems and networks from cyber threats. Covers encryption, security protocols, and ethical hacking techniques.',
      credits: 3,
      prerequisites: 'CS201',
      price: 1050.0
    },
    {
      code: 'CS401',
      title: 'Artificial Intelligence',
      description: 'Explore AI concepts, machine learning algorithms, and neural networks. Build intelligent systems and understand AI ethics.',
      credits: 4,
      prerequisites: 'CS301',
      price: 1400.0
    },

    // Business Courses
    {
      code: 'BUS101',
      title: 'Introduction to Business',
      description: 'Start your business journey! Learn fundamental business concepts, management principles, and organizational structures.',
      credits: 3,
      prerequisites: 'None',
      price: 1050.0
    },
    {
      code: 'BUS201',
      title: 'Marketing Principles',
      description: 'Master essential marketing strategies and consumer behavior analysis. Learn to create effective marketing campaigns and build strong brands.',
      credits: 3,
      prerequisites: 'BUS101',
      price: 1050.0
    },
    {
      code: 'BUS301',
      title: 'Financial Management',
      description: 'Dive into financial planning and analysis. Learn investment strategies, risk management, and corporate finance principles.',
      credits: 4,
      prerequisites: 'BUS201',
      price: 1400.0
    },
    {
      code: 'BUS302',
      title: 'Business Analytics',
      description: 'Learn to make data-driven business decisions using statistical analysis and business intelligence tools.',
      credits: 3,
      prerequisites: 'BUS201',
      price: 1050.0
    },
    {
      code: 'BUS401',
      title: 'Strategic Management',
      description: 'Develop strategic thinking and leadership skills. Learn to create and implement effective business strategies.',
      credits: 4,
      prerequisites: 'BUS301',
      price: 1400.0
    },

    // Engineering Courses
    {
      code: 'ENG101',
      title: 'Engineering Fundamentals',
      description: 'Introduction to engineering principles and problem-solving methodologies. Learn basic concepts across various engineering disciplines.',
      credits: 3,
      prerequisites: 'None',
      price: 1050.0
    },
    {
      code: 'ENG201',
      title: 'Engineering Mathematics',
      description: 'Advanced mathematical concepts for engineering applications. Covers calculus, differential equations, and linear algebra.',
      credits: 4,
      prerequisites: 'ENG101',
      price: 1400.0
    },
    {
      code: 'ENG301',
      title: 'Mechanical Systems',
      description: 'Study mechanical engineering principles and system design. Learn thermodynamics, mechanics, and material science.',
      credits: 3,
      prerequisites: 'ENG201',
      price: 1050.0
    },
    {
      code: 'ENG302',
      title: 'Civil Engineering Design',
      description: 'Learn structural design and construction principles. Master AutoCAD and project management techniques.',
      credits: 3,
      prerequisites: 'ENG201',
      price: 1050.0
    },
    {
      code: 'ENG401',
      title: 'Robotics Engineering',
      description: 'Design and build robotic systems. Learn control systems, sensors, and automation principles.',
      credits: 4,
      prerequisites: 'ENG301',
      price: 1400.0
    }
  ];

  // Seed courses
  for (const course of courses) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: course,
      create: course,
    });
  }

  console.log(`Successfully seeded ${courses.length} courses`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 