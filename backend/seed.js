const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/zeroquDB").then(async () => {
  await User.deleteMany(); // Optional: clears existing users

  const users = [
    {
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      name:"Admin",
      role: 1,
    },
    {
      email: "user@example.com",
      password: await bcrypt.hash("user123", 10),
      name:"User",
      role: 2,
    },
  ];

  await User.insertMany(users);
  console.log("✅ Users inserted successfully.");
  process.exit();
});
