'use client'

import { loginUser } from "@/actions/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()


    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const web = await loginUser(email, password);

        if (web.success) {
            router.push("/");
            localStorage.setItem("token", web.token || "")
        }

        console.log(web)
    }
    return (
        <div className="border border-gray-300 w-xl p-6 m-auto rounded-xl shadow-xl bg-white text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign In</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email :</label>
                    <input type="email" placeholder="enter email" name="email" className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Password :</label>
                    <input type="password" placeholder="enter password" name="password" className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-8">
                    <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-200">Sign in</button>
                </div>
                <div className="mt-6 text-center">Don't have account?
                    <Link href="/sign-up" className="text-blue-600 hover:underline"> Sign up</Link>
                </div>
            </form>
        </div>
    );
}
