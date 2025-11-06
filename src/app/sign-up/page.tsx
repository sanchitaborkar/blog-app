'use client'
import { FormDataPayload, registerUser } from "@/actions/auth";
import { APIResponse } from "@/actions/user";
import ManageUser from "@/components/ManageUser";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
    const [apiStatus, setApiStatus]= useState <APIResponse | undefined>(undefined)
    const router = useRouter();
    

    async function submitHandler(name:string, email:string, dateOfBirth:string, password:string) {
        console.log(name, email, password, dateOfBirth)
        try {
            const formData: FormDataPayload = {
                name: name,
                email: email,
                password: password,
                dob: dateOfBirth,
                
            }

            const res = await registerUser(formData);

            setApiStatus(res)

            if (res.success) {
                router.push('/sign-in')
            } else {

            }
        } catch (err) {
            console.error(err);

        }

    }

    return (
        <div className="flex justify-center h-screen items-center">
            <ManageUser isSignUp={true} submitHandler={submitHandler} apiStatus={apiStatus} />
        </div>
    )
}