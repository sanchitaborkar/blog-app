'use server'

import "@/model/User";
import authGuard from "@/lib/authGuard";
import { connectDB } from "@/lib/mongodb"
import Blog from "@/model/Blog";
import { APIResponse } from "./user";
import { writeFile } from "fs/promises";
import cloudinary from "@/lib/cloudinary";

export interface Blogs {
    _id: string;
    title: string;
    content: string;
    image: string[];
    author: {
        name: string;
    };
    updatedAt: string;
}

interface BLogPayload {
    title: string;
    content: string;
    image: string;
    author?: string;
}

export async function createBlog(formData: FormData): Promise<APIResponse> {
    try {
        await connectDB();

        const { authenticated, user, message } = await authGuard();
        if (!authenticated) {
            return { success: false, message }
        }

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageFileData = formData.getAll("image") as any;
        console.log(3254345345, imageFileData);


        const imageUrls = [];

        // ✅ Save image locally
        if (imageFileData) {

            for (const file of imageFileData) {
                try {
                    if (file && file.size > 0) {

                        const arrayBuffer = await file.arrayBuffer();
                        const dataURI = Buffer.from(arrayBuffer).toString('base64');

                        const base64 = `data:${file.type};base64,${dataURI}`;

                        const result = await cloudinary.uploader.upload(base64, {
                            folder: "blog-images",
                        });
                        imageUrls.push(result.secure_url);

                    }
                } catch (error) {
                    console.log(544331, error);
                }
            }
        }

        // ✅ Save blog with image path
        await Blog.create({
            title,
            content,
            author: user?._id,
            image: imageUrls,
        });

        return { success: true, message: "Blog created successfully" };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(34535, error);

        return { success: false, message: error?.message }
    }

}
export async function getAllBlog(search?: string): Promise<Blogs[]> {
    try {
        await connectDB();
        const query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        }

        const list = await Blog.find(search ? query : {})
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
        const { user } = await authGuard();

        const list = await Blog.find({ author: user?._id })
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
        await authGuard();

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
        const { authenticated, message } = await authGuard();

        if (!authenticated) {
            return { success: false, message };
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
export async function updateBlog(id: string, formData: FormData) {
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

        const payload: BLogPayload = {
            title: formData.get("title"),
            content: formData.get("content")
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageFileData = formData.getAll("image") as any;
        console.log(3254345345, imageFileData);


        const imageUrls = [];

        // ✅ Save image locally
        if (imageFileData) {

            for (const file of imageFileData) {
                try {
                    if (typeof file === 'string' && file.startsWith('/uploads')) {
                        imageUrls.push(file);
                    } else {
                        console.log(98989898, file, file.buffer);
                        if (file && file.size > 0) {

                            const arrayBuffer = await file.arrayBuffer();
                            const dataURI = Buffer.from(arrayBuffer).toString('base64');

                            const base64 = `data:${file.type};base64,${dataURI}`;

                            const result = await cloudinary.uploader.upload(base64, {
                                folder: "blog-images",
                            });

                            console.log(65656, result);


                            imageUrls.push(result.secure_url);
                            // const bytes = await file.arrayBuffer();
                            // const buffer = Buffer.from(bytes);

                            // const filename = `${Date.now()}-${file.name}`;
                            // await writeFile(`public/uploads/${filename}`, buffer);

                            // imageUrls.push(`/uploads/${filename}`);
                        }
                    }
                } catch (error) {
                    console.log(544331, error);
                }
            }
        }

        if (imageUrls.length) payload.image = imageUrls;

        console.log(34535, payload);


        await Blog.findByIdAndUpdate(id, { $set: payload });
        return { success: true, message: "Blog updated successfully" };



    } catch (error) {

    }
}

