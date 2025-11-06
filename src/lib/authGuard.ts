'use server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface User {
    id: string;
}

interface AuthGuard {
    authenticated: boolean;
    message?: string;
    user?: User;
}

export default async function authGuard(): Promise<AuthGuard> {

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return { authenticated: false, message: "No token in cookies" };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string | jwt.JwtPayload;
        return { authenticated: true, user: decoded as {id: string} };
    } catch {
        return { authenticated: false, message: "Invalid token" };
    }
}