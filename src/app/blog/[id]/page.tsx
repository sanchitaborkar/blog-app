import { getBlogById } from "@/actions/blog";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/model/Blog";

export default async function BlogDetail({ params }: { params: { id: string } }) {
  await connectDB();

  const blogDoc = await getBlogById(params.id)

  if (!blogDoc) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-xl">
        Blog not found 
      </div>
    );
  }

  
  const blog = JSON.parse(JSON.stringify(blogDoc));

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

      <p className="text-gray-500 text-sm mb-6">
        ✍️ {blog.author?.name || "Unknown"} •{" "}
        {new Date(blog.updatedAt).toLocaleDateString()}
      </p>

      <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
        {blog.content}
      </p>
    </div>
  );
}
