'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Blogs } from "@/actions/blog";
import { useState } from "react";

export default function BlogCard({blog}: {blog: Blogs}) {
    const router=useRouter();
    console.log(67576,blog)
    return (
        <motion.div
              key={blog._id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              onClick={()=>router.push(`/blog/${blog._id}`)}

            >
              {/* Decorative gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-40 pointer-events-none rounded-3xl"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="object-cover w-full h-52" src={(blog.image && Array.from(blog.image)) ? blog.image[0] : '/default.webp'} alt="" />
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

              {/* <Link
                href={`/blog/${blog._id}`}
                className="relative z-10 mt-5 inline-block text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Read more →
              </Link> */}
            </motion.div>
    )
}