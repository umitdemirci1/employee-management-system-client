import LoginForm from "@/components/auth/login/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";

export default function Login() {
  const cookieStore = cookies();
  const companyName = cookieStore.get("companyName")?.value || "EMS";
  const editedName = companyName.toUpperCase();
  const title = `Login to ${editedName}`;
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
