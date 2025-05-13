import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';
import e from 'express';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username);
  // console.log(email);
  // console.log(password);
  
  
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Exclude password from user object before sending
    // console.log(user);
    
    const { password: pwd, ...userData } =  user;

    // console.log(userData);
    
    res.json({ token, userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

