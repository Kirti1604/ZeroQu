const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 👈 Add this
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, enum: [1, 2], default: 2 }, // 1 = admin, 2 = user
});

module.exports = mongoose.model("User", userSchema);
