'use client'
import { registerUser } from "@/actions/register"
import { FormEvent, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const router = useRouter();

    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(name, email, password, dateOfBirth)
        try {
            const formData: any = {
                name: name,
                email: email,
                password: password,
                dob: dateOfBirth
            }

            const res = await registerUser(formData);


            console.log(565656, res);


            if (res.success) {
                setIsSuccess(true)
                setName("")
                setEmail("")
                setDateOfBirth('')
                setPassword("")
                setConfirmPassword("")
                router.push('/sign-in')
            } else {

            }
        } catch (err) {
            console.error(err);

        }

    }
    return (
        <div className="border border-gray-300 w-xl p-6 m-auto rounded-xl shadow-xl bg-white text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign Up</h2>
            {isSuccess && <div className="px-6 py-4 rounded-lg bg-green-200 text-green-700 my-4">✅ Registration successful!</div>}
            <form onSubmit={submitHandler}>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" placeholder="Enter your name" className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Email :</label>
                    <input type="email" placeholder="enter email" name="email" className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" id="dob"
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Password :</label>
                    <input type="password" placeholder="enter password" name="password" className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirm" placeholder="Confirm your password"
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mt-8">
                    <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-200">Sign Up</button>
                </div>

                <div className="mt-6 text-center">Already account?
                    <Link href="/sign-in" className="text-blue-600 hover:underline"> Sign in</Link>
                </div>
            </form>
        </div>
    )
}