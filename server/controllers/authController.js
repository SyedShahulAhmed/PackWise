import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Validate input
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, username, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Hide password before sending
    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json({ token, user: userToReturn });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};
// @desc    Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
