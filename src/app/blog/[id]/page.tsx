'use client'

import { Blogs, getBlogById } from "@/actions/blog";
import { UserData } from "@/actions/user";
import ShareButtons from "@/components/Sharebutton";
import authGuard from "@/lib/authGuard";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blogData, setBlogData] = useState<Blogs | null>();
  const [user, setUser] = useState<UserData>();
  const [selectedImg, setSelectedImg] = useState(0);
  const [showOPtions, setShowOptions] = useState(false);

  const router = useRouter();

  async function getBlogData() {
    const { user } = await authGuard();
    setUser(user?._id);
    const data = await getBlogById(params.id);
    setBlogData(data);
  }

  useEffect(() => {
    getBlogData();
  }, []);

  if (blogData === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }


  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Blog not found
      </div>
    );
  }


  const blog = JSON.parse(JSON.stringify(blogData));

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-2xl my-10">
      {blog.image &&
        // eslint-disable-next-line @next/next/no-img-element
        <img className="object-cover w-full h-[400px]" src={blog.image && Array.from(blog.image) && blog.image[selectedImg]} alt="" />
      }

      <div className="flex items-center justify-start gap-1 mt-1 object">
        {
          blog.image && Array.from(blog.image)?.map((item, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={`cursor-pointer w-20 h-20 ${index !== selectedImg ? 'opacity-50' : ''}`} key={index} src={item || ''} alt="" onClick={(e) => {
              e.stopPropagation();
              setSelectedImg(index);
            }}
              onError={(e) => {
                console.log(786877687);
                
                e.currentTarget.src = '/default.webp';
              }}
            />
          ))
        }
      </div>
      <h1 className="text-4xl font-bold text-gray-900 my-4">{blog.title}</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500 text-sm">
          ✍️ {blog.author?.name || "Unknown"} •{" "}
          {new Date(blog.updatedAt).toLocaleDateString()}
        </p>
        <div className="flex gap-4 items-center">
          {blog.author._id === user &&
            <div
              className="p-2 cursor-pointer rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
              title="Edit"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/blog/${blog._id}/update`);
              }}
            >
              <Pencil className="w-4 h-4" />

            </div>

          }
          <div className=""
            title="share"
            onClick={() => setShowOptions(!showOPtions)}

          >
            <ShareButtons title={'hbyhgvyg'} blogId={blog._id} />
          </div>
        </div>
      </div>

      <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
        {blog.content}
      </p>
    </div>
  );
}
