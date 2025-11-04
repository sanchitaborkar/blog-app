'use client'
import { registerUser } from "@/actions/auth";
import { getUserDetails, updateProfile } from "@/actions/user";
import ManageUser from "@/components/ManageUser";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";


export default function Profile() {
    const [apiStatus, setApiStatus] = useState(null)
    const [user, setUser] = useState(false)
    const router = useRouter();

    async function getUserData() {
            const data = await getUserDetails();
            if (!data) return;
            setUser(data);
        }
    
        useEffect(() => {
            getUserData();
        }, []);

    async function submitHandler(name, email, dateOfBirth) {
        console.log(7676, name, email, dateOfBirth)
        try {
            const formData: any = {
                name: name,
                email: email,
                dob: dateOfBirth
            }

            const res = await updateProfile(formData);

            setApiStatus(res);

            if (res?.success){
                //    setName("")
                //    setEmail("")
                //    setDateOfBirth('')
                //    setPassword("")
                //    setConfirmPassword("")
                // router.push('/sign-in')
            } else {

            }
        } catch (err) {
            console.error(err);

        }

    }

    return (

        <div className="flex justify-center h-screen items-center">

            <ManageUser submitHandler={submitHandler} apiStatus={apiStatus} userData={user} />
        </div>
    )
}