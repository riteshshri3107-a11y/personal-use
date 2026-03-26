export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  ageGroup: string;
  duration: string;
  sessions: number;
  price: number;
  image: string;
  color: string;
  highlights: string[];
  curriculum: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  grade: string;
  enrolledCourses: string[];
  avatar: string;
  joinDate: string;
  progress: Record<string, number>;
}

export const courses: Course[] = [
  {
    id: "ai-fundamentals",
    title: "AI & Machine Learning Fundamentals",
    description: "Learn the basics of Artificial Intelligence and Machine Learning. Build smart projects using Python and understand how AI shapes our world.",
    category: "Artificial Intelligence",
    ageGroup: "12-18 years",
    duration: "12 weeks",
    sessions: 36,
    price: 299,
    image: "/images/ai-course.svg",
    color: "from-blue-500 to-indigo-600",
    highlights: [
      "Hands-on Python programming",
      "Build AI chatbots and image classifiers",
      "Understand neural networks",
      "Real-world AI project portfolio",
    ],
    curriculum: [
      "Introduction to AI & Python Basics",
      "Data Types & Variables in Python",
      "Control Flow & Functions",
      "Introduction to Machine Learning",
      "Supervised vs Unsupervised Learning",
      "Building Your First ML Model",
      "Neural Networks Basics",
      "Image Recognition Project",
      "Natural Language Processing",
      "AI Chatbot Development",
      "AI Ethics & Responsible AI",
      "Final Project Presentation",
    ],
  },
  {
    id: "web-development",
    title: "Full Stack Web Development",
    description: "Master HTML, CSS, JavaScript, and React to build stunning, interactive websites. Create your own portfolio and web applications.",
    category: "Web Development",
    ageGroup: "10-18 years",
    duration: "16 weeks",
    sessions: 48,
    price: 349,
    image: "/images/web-course.svg",
    color: "from-green-500 to-teal-600",
    highlights: [
      "HTML, CSS & JavaScript mastery",
      "React.js framework",
      "Build 5+ real projects",
      "Deploy your own website",
    ],
    curriculum: [
      "Introduction to Web Development",
      "HTML Structure & Semantics",
      "CSS Styling & Layouts",
      "Responsive Design & Flexbox",
      "JavaScript Fundamentals",
      "DOM Manipulation",
      "APIs & Fetch",
      "Introduction to React",
      "State & Props in React",
      "Building a Todo App",
      "Full Stack Integration",
      "Deployment & Hosting",
    ],
  },
  {
    id: "robotics",
    title: "Robotics & IoT Engineering",
    description: "Design, build, and program robots! Learn electronics, sensors, and coding to create amazing robotic projects.",
    category: "Robotics",
    ageGroup: "8-16 years",
    duration: "14 weeks",
    sessions: 42,
    price: 399,
    image: "/images/robotics-course.svg",
    color: "from-orange-500 to-red-600",
    highlights: [
      "Arduino & sensor programming",
      "Build 3 working robots",
      "IoT home automation project",
      "Competition preparation",
    ],
    curriculum: [
      "Introduction to Robotics",
      "Electronics Basics",
      "Arduino Programming",
      "Sensors & Actuators",
      "Motor Control",
      "Line Following Robot",
      "Obstacle Avoidance",
      "IoT Fundamentals",
      "Smart Home Project",
      "Advanced Robot Design",
      "Competition Prep",
      "Final Robot Showcase",
    ],
  },
  {
    id: "game-development",
    title: "Game Development with Unity",
    description: "Create your own 2D and 3D games using Unity and C#. Learn game design, physics, and storytelling to bring your imagination to life.",
    category: "Game Development",
    ageGroup: "10-18 years",
    duration: "14 weeks",
    sessions: 42,
    price: 329,
    image: "/images/game-course.svg",
    color: "from-purple-500 to-pink-600",
    highlights: [
      "Unity game engine mastery",
      "C# programming fundamentals",
      "2D & 3D game creation",
      "Publish your own game",
    ],
    curriculum: [
      "Introduction to Game Development",
      "Unity Interface & Setup",
      "C# Programming Basics",
      "Game Objects & Components",
      "Physics & Collisions",
      "2D Platformer Game",
      "UI Design for Games",
      "3D Game Environments",
      "Character Animation",
      "Sound & Music Integration",
      "Game Polish & Testing",
      "Game Publishing",
    ],
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    description: "Explore the world of data! Learn to collect, analyze, and visualize data to uncover insights and tell compelling stories with numbers.",
    category: "Data Science",
    ageGroup: "14-18 years",
    duration: "10 weeks",
    sessions: 30,
    price: 279,
    image: "/images/data-course.svg",
    color: "from-cyan-500 to-blue-600",
    highlights: [
      "Python for data analysis",
      "Data visualization with charts",
      "Statistical thinking",
      "Real-world data projects",
    ],
    curriculum: [
      "Introduction to Data Science",
      "Python for Data Analysis",
      "Pandas & DataFrames",
      "Data Cleaning Techniques",
      "Exploratory Data Analysis",
      "Data Visualization with Matplotlib",
      "Statistical Analysis",
      "Predictive Modeling",
      "Dashboard Creation",
      "Final Data Project",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Essentials",
    description: "Learn to protect digital systems and data. Understand ethical hacking, encryption, and network security fundamentals.",
    category: "Cybersecurity",
    ageGroup: "14-18 years",
    duration: "10 weeks",
    sessions: 30,
    price: 299,
    image: "/images/cyber-course.svg",
    color: "from-red-500 to-rose-600",
    highlights: [
      "Ethical hacking basics",
      "Network security fundamentals",
      "Cryptography & encryption",
      "Capture The Flag challenges",
    ],
    curriculum: [
      "Introduction to Cybersecurity",
      "Network Fundamentals",
      "Operating System Security",
      "Cryptography Basics",
      "Web Security & OWASP",
      "Ethical Hacking Tools",
      "Social Engineering Awareness",
      "Incident Response",
      "Security Best Practices",
      "CTF Competition Prep",
    ],
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    age: 14,
    course: "AI & Machine Learning",
    text: "AARNAIT AI made learning AI so fun! I built my own chatbot and even won a school science fair with my project.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    age: 12,
    course: "Web Development",
    text: "I never thought I could build a website at 12! Now I have my own portfolio site and I'm helping my school build theirs.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    age: 16,
    course: "Robotics",
    text: "The robotics course was incredible. My team built a robot that won the regional robotics competition!",
    rating: 5,
  },
  {
    name: "Rohan Gupta",
    age: 15,
    course: "Game Development",
    text: "Learning Unity was amazing. I published my first game on itch.io and my friends love playing it!",
    rating: 5,
  },
];

export const stats = [
  { label: "Students Enrolled", value: "10,000+" },
  { label: "Courses Offered", value: "25+" },
  { label: "Expert Instructors", value: "50+" },
  { label: "Countries", value: "15+" },
];

export const features = [
  {
    title: "Live Interactive Classes",
    description: "Real-time classes with expert instructors. Ask questions, collaborate with peers, and get instant feedback.",
    icon: "video",
  },
  {
    title: "Project-Based Learning",
    description: "Learn by building real projects. Every course includes hands-on projects that reinforce concepts.",
    icon: "project",
  },
  {
    title: "AI-Powered Learning",
    description: "Personalized learning paths powered by AI. Adapt to each student's pace and learning style.",
    icon: "ai",
  },
  {
    title: "Industry Certifications",
    description: "Earn recognized certificates upon completion. Boost your profile for college and career readiness.",
    icon: "certificate",
  },
  {
    title: "1-on-1 Mentorship",
    description: "Get personal guidance from industry professionals. Weekly mentorship sessions for career guidance.",
    icon: "mentor",
  },
  {
    title: "Community & Events",
    description: "Join hackathons, coding competitions, and tech events. Connect with like-minded young innovators.",
    icon: "community",
  },
];

export const demoStudents: Student[] = [
  {
    id: "student-1",
    name: "Demo Student",
    email: "demo@aarnaitai.com",
    age: 15,
    grade: "10th Grade",
    enrolledCourses: ["ai-fundamentals", "web-development"],
    avatar: "",
    joinDate: "2025-09-01",
    progress: {
      "ai-fundamentals": 65,
      "web-development": 40,
    },
  },
];
