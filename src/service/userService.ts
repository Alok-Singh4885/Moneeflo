import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import initUserModel from "../models/user.model";
import { config } from "../secretKey/secretKey";

const UserModel = initUserModel();

interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await UserModel.findOne({ email }).exec();
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    status: '1',
    created: new Date(),
    updated: new Date(),
  });

  await newUser.save();

  return newUser;
};

export const loginUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email }).exec();
  if (!user) throw new Error("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = jwt.sign({ userId: user._id }, config.jwtSecret as string, {
    expiresIn: "1h",
  });

  return token;
};
