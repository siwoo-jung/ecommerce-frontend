"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../components/AuthContext";
import Footbar from "@/components/Footbar";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footbar />
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
