// import { cookies } from "next/headers";
// import authGuard from "./authGuard";

// export async function getAuthenticatedUser() {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) return null;
//   const { user } = await authGuard();
//   return user;
// }