"use client";

import { registerAction } from "@/actions/registerAction";
import Input from "@/components/Inputs/Input";
import { Toast } from "@/components/Toast/Toast";
import { registerSchema } from "@/schema/register.schema";
import { SERVICE_AUTH } from "@/utils/enums/service-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterUI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await registerAction(
        data.username,
        data.fullname,
        data.email,
        data.password
      );
      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        Toast(SERVICE_AUTH.REGISTER_SUCCESS, "success");
        Cookies.set("AUTH_TOKEN", response.data?.accessToken || "");
        router.push("/");
      }
      reset();
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : SERVICE_AUTH.REGISTER_FAILED,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <Image
            src="/icons/banner.svg"
            alt="register"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Register
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Register to Our Community with all time access and free
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              label="User Name"
              placeholder="User Name"
              error={errors.username}
              {...register("username")}
            />
            <Input
              type="text"
              label="Full Name"
              placeholder="FullName"
              error={errors.fullname}
              {...register("fullname")}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              error={errors.email}
              {...register("email")}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              error={errors.password}
              {...register("password")}
            />
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Do you already have an account?{" "}
              <Link href="/register" className="text-black hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
