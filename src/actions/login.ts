"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function loginUser(email: string, password: string) {
  await connectDB();

  console.log(email,password)

  if (!email || !password) {
    return { success: false, message: "All fields are required" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  // Create JWT token (optional, if you want authentication)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

   (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true, message: "Login successful", token };
}
