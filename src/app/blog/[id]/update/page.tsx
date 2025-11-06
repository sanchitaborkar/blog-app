'use client'

import { Blogs, getBlogById, updateBlog } from "@/actions/blog";
import ManageBlog from "@/components/ManageBlog";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UpdateBlog() {
    const [apiStatus, setApiStatus] = useState<any>(null);
    const [blogData, setBlogData] = useState<Blogs | null>(null);

    const params = useParams(); // gives access to dynamic segments
    const id = params.id as string;

    const router = useRouter();

    const handleSubmit = async (title: string, content: string) => {
        const blog = { title, content };
        const result = await updateBlog(id, blog);
        setApiStatus(result);
        router.push("/my-blog"); // Redirect to home
    };

    async function getBlogData() {
        const data = id && await getBlogById(id);
        if (!data) return;
        setBlogData(data);
    }

    useEffect(() => {
        getBlogData();
    }, []);

    return (
        <ManageBlog isNew={false} apiStatus={apiStatus} handleSubmit={handleSubmit} blogData={blogData} />
    );
}
