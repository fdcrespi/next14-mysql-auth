"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Home() {

  const handleLogout = () => {
    signOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HOLA USUARIO</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}
