'use client'
import { getBlog } from "@/actions/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogData, setBlogData] = useState([])

  async function getBlogData() {
    const data = await getBlog()
    console.log("DATA::::::", data)

    setBlogData(data)
  }

  useEffect(() => {
    getBlogData()
  }, [])

  console.log("BLOG-DATA::::", blogData);


  return (


    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Blog List</h1>
        <Link href="/create" className="px-6 py-3 rounded-2xl bg-green-500 text-white">Create Blog</Link>
      </div>

      {/* 🧾 Step 2: Check if blogs exist */}
      {blogData?.length > 0 ? (
        <div className="space-y-4">
          {blogData.map((blog, index) => {
            console.log("blog-item:::", blog, index);

            return (
              <div key={index} className="p-4 border rounded-lg shadow">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600">{blog.content}</p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400 mt-2">
                    ✍️ By: {blog.author.name || "Unknown"}
                  </p>
                  {blog.updatedAt && <p className="text-xs text-gray-500">
                    Updated on: {new Date(blog.updatedAt).toGMTString()}
                  </p>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p>No blogs found.</p> // 💤 Show this if no blogs
      )}
    </div>
  );
}

