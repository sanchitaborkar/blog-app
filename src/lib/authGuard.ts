'use server'
import { UserData } from "@/actions/user";
import User from "@/model/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";

interface User {
    id: string;
}

interface AuthGuard {
    authenticated: boolean;
    message?: string;
    user?: UserData;
}

export default async function authGuard(): Promise<AuthGuard> {
    await connectDB();
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return { authenticated: false, message: "No token in cookies" };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id as string);
        
        if (!user) {
            return { authenticated: false, message: "User not found" };
        }

        return { authenticated: true, user: user };
    } catch (error) {
        console.log(76876, error);
        return { authenticated: false, message: "Invalid token" };
    }
}