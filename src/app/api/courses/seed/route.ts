import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const initialCourses = [
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
  // Business Courses
  {
    code: 'BUS101',
    title: 'Introduction to Business',
    description: 'Learn fundamental business concepts, management principles, and organizational structures. Perfect for future entrepreneurs.',
    credits: 3,
    prerequisites: 'None',
    price: 1050.0
  },
  {
    code: 'BUS201',
    title: 'Business Analytics',
    description: 'Learn to make data-driven business decisions using statistical analysis and business intelligence tools.',
    credits: 3,
    prerequisites: 'BUS101',
    price: 1050.0
  },
  {
    code: 'BUS301',
    title: 'Marketing Management',
    description: 'Study marketing strategies and consumer behavior. Learn to create effective marketing campaigns and build strong brands.',
    credits: 3,
    prerequisites: 'BUS201',
    price: 1050.0
  },
  {
    code: 'BUS302',
    title: 'Financial Management',
    description: 'Learn financial planning and investment strategies. Master corporate finance principles and risk management.',
    credits: 3,
    prerequisites: 'BUS201',
    price: 1050.0
  },
  // Engineering Courses
  {
    code: 'ENG101',
    title: 'Engineering Fundamentals',
    description: 'Introduction to engineering principles and problem-solving methodologies. Covers basic concepts across various engineering disciplines.',
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
  }
];

export async function POST() {
  try {
    const courses = await Promise.all(
      initialCourses.map(course =>
        prisma.course.upsert({
          where: { code: course.code },
          update: course,  // Update existing courses with new data
          create: course
        })
      )
    );

    return NextResponse.json({
      message: 'Courses seeded successfully',
      count: courses.length,
      courses
    });
  } catch (error) {
    console.error('Error seeding courses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 