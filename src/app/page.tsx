'use client'
import { Blogs, getAllBlog } from "@/actions/blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [blogData, setBlogData] = useState<Blogs[] | null>(null);

  async function getBlogData() {
    const data = await getAllBlog();
    setBlogData(data);
  }

  useEffect(() => {
    getBlogData();
  }, []);

  if (blogData === null)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 animate-pulse">
        Loading Blogs...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#f8f9fa] to-[#eaeaea] p-8">
      
      {/* 🏞️ Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Inspire & Create <span className="text-blue-600">Stories</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          "Turning logic into magic"
        </p>
        <Link
          href="/create"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition"
        >
          ✍️ Write a Blog
        </Link>
      </motion.div>

      {/* 📰 Blog Section */}
      {blogData?.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogData.map((blog, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Decorative gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-40 pointer-events-none rounded-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                  {blog.content}
                </p>

                {/* Category Tag */}
                {/* <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {blog.category || "General"}
                </span> */}

                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                  <p>✍️ {blog.author?.name || "Unknown"}</p>
                  {blog.updatedAt && (
                    <p>{new Date(blog.updatedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <Link
                href={`/blog/${blog._id}`}
                className="relative z-10 mt-5 inline-block text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Read more →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-20 text-lg">
          😔 No blogs found. Be the first to create one!
        </p>
      )}
    </div>
  );
}
