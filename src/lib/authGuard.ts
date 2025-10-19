import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function authGuard() {

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return { authenticated: false, message: "No token in cookies" };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return { authenticated: true, user: decoded };
    } catch {
        return { authenticated: false, message: "Invalid token" };
    }
}