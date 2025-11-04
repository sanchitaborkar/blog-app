"use server";

import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    // Remove the JWT cookie
    (await cookies()).delete("token");

    return { success: true, message: "Logout successful" };
  } catch (error: any) {
    console.error("Logout Error:", error);
    return { success: false, message: "Logout failed" };
  }
}
