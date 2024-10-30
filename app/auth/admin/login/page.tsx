import AdminLoginForm from "@/components/auth/admin/login/AdminLoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[350px] mb-24">
        <CardHeader>
          <CardTitle>Login to EMS Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
