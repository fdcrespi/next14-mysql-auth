import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";
import { Button } from "@/components/ui/button";


export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <LoginForm />;
        
        <Button>
          <a href="/register">Register</a>
        </Button>
        
      </div>
    </section>
  );
}