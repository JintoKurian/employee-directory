import { connectDB, getDB } from "./db.js";

async function seedData() {
  await connectDB();
  const db = getDB();

  const employees = [
    { name: "John Doe", position: "Software Engineer", department: "Engineering", salary: 60000 },
    { name: "Jane Smith", position: "UI/UX Designer", department: "Design", salary: 55000 },
    { name: "Michael Brown", position: "Project Manager", department: "Management", salary: 70000 },
    { name: "Sarah Wilson", position: "QA Engineer", department: "Engineering", salary: 50000 },
    { name: "David Lee", position: "HR Executive", department: "Human Resources", salary: 45000 },
  ];

  await db.collection("employees").deleteMany({});
  await db.collection("employees").insertMany(employees);

  console.log("✅ Database seeded successfully with sample employees!");
  process.exit();
}

seedData();
