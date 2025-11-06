'use client'

import React, { FormEvent, useEffect, useState } from "react";
import APIStatusCard from "./APIStatusCard";
import { APIResponse } from "@/actions/user";

interface ManageBlogProps{
    isNew: boolean;
    apiStatus: APIResponse | undefined;
    handleSubmit:(title:string, Content:string)=>void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogData?: any;
}

export default function ManageBlog({ isNew, apiStatus, handleSubmit, blogData }:ManageBlogProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(blogData?.content);
        setTitle(blogData?.title)
    }, [blogData])

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(title, content);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white border border-gray-200">
                <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    {
                        isNew === true ? "Create a New Blog" : "Update Blog"
                    }
                </h2>

                { apiStatus && <APIStatusCard apiStatus={apiStatus} /> }

                <form onSubmit={handleSubmitForm} className="space-y-6">
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        {
                            isNew === true ? "Create" : "Update"
                        } Blog
                    </button>
                </form>
            </div>
        </div>
    );
}

