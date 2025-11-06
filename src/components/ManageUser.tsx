'use client'

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link";
import APIStatusCard from "./APIStatusCard";
import { APIResponse } from "@/actions/user";
import { FormDataPayload } from "@/actions/auth";

interface ManageUserProps {
    submitHandler: (name: string, email: string, dateOfBirth: string, password: string) => void;
    apiStatus: APIResponse | undefined;
    userData?: FormDataPayload | null;
    isSignUp?: boolean;
}

export default function ManageUser({ submitHandler, apiStatus, userData, isSignUp }: ManageUserProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");


    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submitting:", { name, email, password, dateOfBirth });
        submitHandler(name, email, dateOfBirth, password);
    }


    useEffect(() => {
        console.log("User data received:", userData);

        if (userData) {
            setName(userData.name || "");
            setEmail(userData.email || "");
            setDateOfBirth(userData.dob || "");
        }
    }, [userData]);

    console.log("API Status:", apiStatus);

    return (
        <div className="border border-gray-300 w-xl p-6 m-auto rounded-xl shadow-xl bg-white text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                {isSignUp ? "Sign Up" : "Update Profile"}
            </h2>

            {/* ✅ API success/error message card */}
            {apiStatus && <APIStatusCard apiStatus={apiStatus} />}

            <form onSubmit={formSubmitHandler}>
                {/* Name */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Date of Birth */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>

                {/* Password fields only for Sign Up */}
                {isSignUp && (
                    <>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm"
                                placeholder="Confirm password"
                                className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Submit button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        {isSignUp ? "Sign Up" : "Update Profile"}
                    </button>
                </div>

                {/* Sign In link only for Sign Up */}
                {isSignUp && (
                    <div className="mt-6 text-center">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                )}
            </form>
        </div>
    );
}
