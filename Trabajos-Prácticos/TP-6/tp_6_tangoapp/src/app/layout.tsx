import React from "react";
import "../styles/globals.css";
import Header from "@/components/layout/Header";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden">
        <Header />

        <main className="max-w-screen mt-[70px] flex grow md:mt-[100px] bg-[#CDCDCD]">
          {children}
        </main>
      </body>
    </html>
  );
}
