'use client'

import { createBlog } from "@/actions/blog";
import { APIResponse } from "@/actions/user";
import ManageBlog from "@/components/ManageBlog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateBlog() {
  const [apiStatus, setApiStatus] = useState<APIResponse | undefined>();

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    // const blog = { title, content };
    const result = await createBlog(formData);
    setApiStatus(result);
    router.push("/my-blogs"); // Redirect to home
  };

  return (
    <ManageBlog isNew={true} apiStatus={apiStatus} handleSubmit={handleSubmit} />
  );
}
