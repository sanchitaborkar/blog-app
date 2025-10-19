'use server'

import "@/model/User";
import authGuard from "@/lib/authGuard";
import { connectDB } from "@/lib/mongodb"
import Blog from "@/model/Blog";

export async function createBlog(payload) {
    try {
        await connectDB();

        const { authenticated, user, message } = await authGuard();
        if (!authenticated) {
            return { authenticated, message }
        }
        payload.author = user?.id;

        await Blog.create(payload);
        return { success: true, message: "Blog created successfully" };
    } catch (error) {
        console.log(876876, error);

        return { success: false, message: error?.message }

    }

}
export async function getAllBlog() {
    try {
        await connectDB()
        const { authenticated, user, message } = await authGuard();

        console.log(authenticated, user, message);
        const list = await Blog.find()
            .populate("author", "name email")
            .sort({ updatedAt: -1 })
            .lean();

        return list

    } catch (error) {

        console.log(error);


    }
}
export async function getBlog() {
    try {
        await connectDB()
        const { authenticated, user, message } = await authGuard();

        console.log(authenticated, user, message);
        const list = await Blog.find({ author: user?.id })
            .populate("author", "name email")
            .sort({ updatedAt: -1 })
            .lean();

        return list

    } catch (error) {

        console.log(error);


    }
}
