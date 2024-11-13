import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { registerUserService, loginUserService } from '../service/userService';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'All fields are required' });
    return;
  }

  const user = await registerUserService(name, email, password );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user,
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  try {
    const token = await loginUserService({ email, password });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});
