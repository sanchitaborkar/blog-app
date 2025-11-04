'use client'
import { registerUser } from "@/actions/auth";
import ManageUser from "@/components/ManageUser";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
    const [apiStatus, setApiStatus] = useState(null)
    const router = useRouter();

    async function submitHandler(name, email, dateOfBirth, password) {
        console.log(name, email, password, dateOfBirth)
        try {
            const formData: any = {
                name: name,
                email: email,
                password: password,
                dob: dateOfBirth
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