'use client'

import { createBlog } from "@/actions/blog"
import React, { useState } from "react"


export default function CreateBlog() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [apiStatus, setApiStatus] = useState<any>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const blog = {
            content: content,
            title: title,
        }

        const result = await createBlog(blog)
        console.log(343534, result);
        setApiStatus(result)

    }

    console.log(54545454, apiStatus);
    

    return (
        <div className="border border-gray-300 w-xl p-6 m-auto rounded-xl shadow-xl bg-white text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Create Blog</h2>
            {apiStatus?.success === true ? <div className="bg-green-100 text-green-800 p-4">{apiStatus?.message}</div> : apiStatus?.success === false ? <div className="bg-red-200 text-red-800 p-4">{apiStatus?.message}</div> : <></>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">title</label>
                    <input type="text" name="title" placeholder="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>
                <div>

                    <label className="block text-sm font-medium text-gray-700">content</label>
                    <textarea name="content" placeholder="text" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"></textarea>
                </div>

                <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-200">Create Blog</button>


            </form>
        </div>
    )

}    