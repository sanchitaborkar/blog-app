'use client'

import React, { FormEvent, useEffect, useState } from "react";
import APIStatusCard from "./APIStatusCard";
import { APIResponse } from "@/actions/user";
import { Trash2 } from "lucide-react";

interface ManageBlogProps {
    isNew: boolean;
    apiStatus: APIResponse | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSubmit: (formData: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogData?: any;
}

export default function ManageBlog({ isNew, apiStatus, handleSubmit, blogData }: ManageBlogProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [submiting,setSubmiting] = useState(false)

    useEffect(() => {
        setContent(blogData?.content || "");
        setTitle(blogData?.title || "");
        setPreview(blogData?.image || null);
    }, [blogData]);

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       setSubmiting(true)

        try {
            // if (image) {

            setUploading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            console.log(44443, image);

            if (image || preview) {
                const existingImages = Array.isArray(preview) ? preview?.filter(item => !item.startsWith('blob')) : [];
                for (const file of [...image, ...existingImages]) {
                    formData.append("image", file);     // ✔ each file appended correctly
                }

                console.log(34543543, image);
            }

            await handleSubmit(formData);
            setUploading(false);
            setSubmiting(false)
        } catch (error) {
            console.error("Image upload failed:", error);
            setUploading(false);
             setSubmiting(false)

        }
    };

    const removeAt = (arr: string[], index: number): string[] => [...arr.slice(0, index), ...arr.slice(index + 1)]

    const handleDelete = (index: number) => {
        const array = removeAt(preview, index)
        setPreview(array);
    }

    console.log(76767, submiting);


    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white border border-gray-200">
                <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    {isNew ? "Create a New Blog" : "Update Blog"}
                </h2>

                {apiStatus && <APIStatusCard apiStatus={apiStatus} />}

                <form onSubmit={handleSubmitForm} encType="multipart/form-data" className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter your blog title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Blog Content
                        </label>
                        <textarea
                            name="content"
                            placeholder="Write your article here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-60 rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Add images
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files || null;
                                setImage(e.target.files);
                                const previewItem = file ? Array.from(file).map((item) => {
                                    return URL.createObjectURL(item)
                                }) : [];
                                const existing = Array.isArray(preview) ? preview : [];
                                setPreview([...existing, ...previewItem]);
                            }}
                            multiple
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {preview && Array.isArray(preview) &&
                            preview?.length && Array.from(preview)?.map((item, index) => {
                                return (
                                    <div key={item} className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            key={item}
                                            src={item || "/file.svg"}
                                            alt="Preview"
                                            className="mt-3 w-full h-56 object-cover rounded-xl border"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(index)
                                            }
                                            }
                                            className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                                            title="Delete"
                                            type="button"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <button
                        type="submit"
                        disabled={submiting}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-60"
                    >
                        {isNew ? "Create" : "Update"} Blog
                    </button>
                </form>
            </div>
        </div>
    );
}
