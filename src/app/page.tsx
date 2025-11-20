'use client'
import { Blogs, getAllBlog } from "@/actions/blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import SearchBlog from "@/components/SearchBlog";
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const [blogData, setBlogData] = useState<Blogs[] | null>(null);

  const param = useSearchParams()
  const searchValue = param.get('search')

  async function getBlogData(search?: string) {
    const data = await getAllBlog(search);
    setBlogData(data);
  }

  useEffect(() => {
    getBlogData(searchValue);
  }, [searchValue]);

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
          &quot;Turning logic into magic&quot;
        </p>
        <Link
          href="/create"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition"
        >
          ✍️ Write a Blog
        </Link>
      </motion.div>

      <motion.div className="my-10">
        <SearchBlog className="mx-auto" currentSearch={searchValue} onSubmit={(search)=> console.log(search)} />
      </motion.div>

      {/* 📰 Blog Section */}
      {blogData?.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {blogData.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
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
