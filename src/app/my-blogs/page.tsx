'use client'

import { Blogs, deleteBlog, getBlog } from "@/actions/blog";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import APIStatusCard from "@/components/APIStatusCard";
import { APIResponse } from "@/actions/user";

export default function MyBlogs() {
  const [blogData, setBlogData] = useState<Blogs[] | null>(null);
    const [apiStatus, setApiStatus] = useState<APIResponse | undefined>();

  const router = useRouter();

  async function getBlogData() {
    const data = await getBlog();
    setBlogData(data);
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await deleteBlog(id);
    setApiStatus(res)
    if (res.success) {
      // alert("✅ Blog deleted successfully!");
      getBlogData(); // refresh the blog list
    } else {
      // alert("❌ " + res.message);
    }
  }

  useEffect(() => {
    getBlogData();
  }, []);

  if (blogData === null)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading your blogs...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9fc] via-[#eef2f3] to-[#dfe9f3] p-10">
      {/* 🌟 Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          My <span className="text-blue-600">Blogs</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage, update, and delete your stories.
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition"
        >
          <PlusCircle className="w-5 h-5" />
          Write New Blog
        </Link>
      </motion.div>

{apiStatus && <APIStatusCard apiStatus={apiStatus} />}

      {/* 📰 Blog List */}
      {blogData?.length > 0 ? (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white/80 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 backdrop-blur-md overflow-hidden"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/blog/${blog._id}`);
              }}>


              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-40 rounded-2xl pointer-events-none"></div>
              <img className="h-52" src={Array.isArray(blog.image) ? blog.image[0] : '/default.webp'} alt="" />

              <div className="relative z-10 flex flex-col justify-between h-fit">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  {/* <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {blog.category|| "General"}
                  </span> */}

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <p>✍️ {blog.author?.name || "Unknown"}</p>
                    <p>{new Date(blog.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* 🛠️ Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <Link
                    href={`/blog/${blog._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                  >
                    Read More →
                  </Link>

                  <div className="flex gap-3">
                    <div
                      className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/blog/${blog._id}/update`);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog._id!)
                      }
                      }
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 mt-20 text-lg">
          😔 You haven’t written any blogs yet.
          <Link href="/create" className="text-blue-600 font-medium ml-1 hover:underline">
            Write your first one!
          </Link>
        </div>
      )}
    </div>
  );
}
