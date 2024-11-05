"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RegisterRequest } from "@/types/registerRequest";
import { apiClientHelper } from "@/services/apiClientHelper";
import { RegisterResponse } from "@/types/registerResponse";

const formSchema = z.object({
  FirstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  LastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  CompanyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  Email: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  Password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  ConfirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const registerRequest: RegisterRequest = {
      FirstName: values.FirstName,
      LastName: values.LastName,
      CompanyName: values.CompanyName,
      Email: values.Email,
      Password: values.Password,
    };

    try {
      const response = await apiClientHelper.post<RegisterResponse>(
        "/Account/register",
        registerRequest
      );

      if (response.data.success) {
        router.push("/auth/pending-verification");
      } else {
        form.setError("root", {
          type: "manual",
          message: response.data.message,
        });

        if (response.data.errors) {
          Object.entries(response.data.errors).forEach(([field, errors]) => {
            const errorMessage = Array.isArray(errors) ? errors[0] : errors;
            const formField = field.charAt(0).toLowerCase() + field.slice(1);

            if (formField in formSchema.shape) {
              form.setError(formField as keyof z.infer<typeof formSchema>, {
                type: "manual",
                message: errorMessage,
              });
            }
          });
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;

        Object.entries(apiErrors).forEach(([field, errors]) => {
          const errorMessage = Array.isArray(errors) ? errors[0] : errors;
          const formField = field.charAt(0).toLowerCase() + field.slice(1);

          if (formField in formSchema.shape) {
            form.setError(formField as keyof z.infer<typeof formSchema>, {
              type: "manual",
              message: errorMessage,
            });
          }
        });
      } else {
        form.setError("root", {
          type: "manual",
          message:
            error.response?.data?.message || "An unexpected error occurred",
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CompanyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ConfirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
