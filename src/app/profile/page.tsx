'use client'

import { APIResponse, getUserDetails, updateProfile, UserData } from "@/actions/user";
import ManageUser from "@/components/ManageUser";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function Profile() {
    const [apiStatus, setApiStatus] = useState<APIResponse | undefined>()
    const [userData, setUserData] = useState<UserData | null>(null);
    const { user, setUser } = useUserContext();

    async function getUserData() {
            const data = await getUserDetails();
            if (!data) return;
            setUserData(data?.user);
        }
    
        useEffect(() => {
            getUserData();
        }, []);

    async function submitHandler(name: string, email:string, dateOfBirth:string) {
        try {
            const formData: any = {
                name: name,
                email: email,
                dob: dateOfBirth
            }
            
            const res = await updateProfile(formData);
            
            setApiStatus(res);
            
            if (res?.success){
                setUser({...userData, ...formData});
            }
        } catch (err) {
            console.error(err);

        }

    }

    return (

        <div className="flex justify-center h-screen items-center">
            <ManageUser submitHandler={submitHandler} apiStatus={apiStatus} userData={userData} />
        </div>
    )
}