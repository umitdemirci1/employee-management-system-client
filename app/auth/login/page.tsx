// import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/login/LoginForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[350px] mb-24">
        <CardHeader>
          <CardTitle>Login to company</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
