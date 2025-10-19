// import { getAuthenticatedUser } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { ReactNode } from "react";

// export default async function AuthPage({ children }: { children: ReactNode }) {
//     // const pathname = usePathname() as string;
//     // ['sign-in', 'sign-up'].includes(pathname);
//     // console.log(445435, children);


//   const headerList = headers();
//   const path = (await headerList).get("x-invoke-path") || "";
//   console.log("Action called from:", path);
    
//     console.log(454545, ['sign-in', 'sign-up'].includes("pathname"), );
    
//     const user = await getAuthenticatedUser();
//     // if (!user) redirect("/sign-in");
//     return children
// }