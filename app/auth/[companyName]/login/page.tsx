"use client";

import LoginForm from "@/components/auth/login/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [company, setCompany] = useState<string | null>("");

  useEffect(() => {
    const name = Cookies.get("companyName");
    if (!name) {
      router.push("/auth/company");
    } else {
      setCompany(name?.toUpperCase());
    }
  }, [router]);

  const title = `Login to ${company}`;

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[350px] mb-24">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
