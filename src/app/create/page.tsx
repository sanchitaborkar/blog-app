'use client'

import { createBlog } from "@/actions/blog";
import { APIResponse } from "@/actions/user";
import ManageBlog from "@/components/ManageBlog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateBlog() {
  const [apiStatus, setApiStatus] = useState<APIResponse | undefined>();

  const router = useRouter();

  const handleSubmit = async (title: string,content: string) => {
    const blog = { title, content };
    const result = await createBlog(blog);
    setApiStatus(result);
    router.push("/"); // Redirect to home
  };

  return (
    <ManageBlog isNew={true} apiStatus={apiStatus} handleSubmit={handleSubmit} />
  );
}
