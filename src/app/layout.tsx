import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "MindBridge",

  description: "MindBridge is a blogging app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-100 text-gray-800`}
      >
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );


}
