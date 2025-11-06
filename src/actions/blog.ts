'use server'

import "@/model/User";
import authGuard from "@/lib/authGuard";
import { connectDB } from "@/lib/mongodb"
import Blog from "@/model/Blog";
import { APIResponse } from "./user";

export interface Blogs {
    _id:string;
    title: string;
    content: string;
    author: {
        name: string;
    };
    updatedAt: string;
}

interface BLogPayload {
    title: string;
    content: string;
    author?: string;
}

export async function createBlog(payload: BLogPayload): Promise<APIResponse> {
    try {
        await connectDB();

        const { authenticated, user, message } = await authGuard();
        if (!authenticated) {
            return { success: false, message }
        }

        if (user?.id) {
            payload.author = user?.id;
        }

        await Blog.create(payload);
        return { success: true, message: "Blog created successfully" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, message: error?.message }
    }

}
export async function getAllBlog(): Promise<Blogs[]> {
    try {
        await connectDB()
        const { authenticated, user, message } = await authGuard();

        console.log(authenticated, user, message);
        const list = await Blog.find()
            .populate("author", "name email")
            .sort({ updatedAt: -1 })
            .lean();

        return JSON.parse(JSON.stringify(list));

    } catch (error) {

        console.log(error);
        return [];

    }
}
export async function getBlog(): Promise<Blogs[]> { // my blog
    try {
        await connectDB()
        const { authenticated, user, message } = await authGuard();

        const list = await Blog.find({ author: user?.id })
            .populate("author", "name email")
            .sort({ updatedAt: -1 })
            .lean();

        return JSON.parse(JSON.stringify(list));

    } catch (error) {

        console.log(error);
        return []

    }
}
export async function getBlogById(id: string): Promise<Blogs | null> { // my blog
    try {
        await connectDB()
        const { authenticated, user, message } = await authGuard();

        const blog = await Blog.findById(id).populate("author", "name email").lean();
        return JSON.parse(JSON.stringify(blog));

    } catch (error) {

        console.log(error);
        return null;

    }
}


export async function deleteBlog(id: string) {
    try {
        await connectDB();
        const { authenticated, user, message } = await authGuard();

        if (!authenticated) {
            return { success: false, message: "Unauthorized access" };
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return { success: false, message: "Blog not found" };
        }

        await Blog.findByIdAndDelete(id);
        return { success: true, message: "Blog deleted successfully" };

    } catch (error) {
        console.error("Delete error:", error);
        return { success: false, message: "Something went wrong" };

    }


}
export async function updateBlog(id: string, payload: BLogPayload) {
    try {
        await connectDB()
        const authData = await authGuard()
        if (authData.authenticated === false) {
            return { success: false, message: "Unauthorized access" };

        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return { success: false, message: "Blog not found" };
        }

        await Blog.findByIdAndUpdate(id, { $set: payload });
        return { success: true, message: "Blog updated successfully" };



    } catch (error) {

    }
}


