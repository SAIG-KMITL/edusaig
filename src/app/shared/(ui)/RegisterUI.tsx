"use client";

import authEffect from "@/../public/ulits/auth-effect.svg";
import { registerAction } from "@/actions/authAction";
import Input from "@/components/Inputs/Input";
import { Toast } from "@/components/Toast/Toast";
import { registerSchema } from "@/schema/register.schema";
import { SERVICE_AUTH } from "@/utils/enums/service-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
      role:"student"
    },
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await registerAction(
        data.username,
        data.fullname,
        data.email,
        data.password,
        data.role
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

  const EdusaigLogo: React.FunctionComponent = () => {
    return (
      <div className="flex flex-row items-center gap-3">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="logo"
          className="pb-2 pointer-events-auto"
        />
        <p className="flex flex-row items-baseline pointer-events-auto">
          EDUSA
          <Image
            src="/icons/wand.svg"
            width={24}
            height={24}
            alt="wand icon"
            className="pointer-events-auto"
          />
          G
        </p>
      </div>
    );
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="hover:scale-105 absolute top-4 left-4 font-bold text-[26px] leading-[100%] text-white flex ml-5 cursor-pointer z-20"
      >
        <Link href="/" className="flex flex-row items-center gap-2">
          <EdusaigLogo/>
        </Link>
      </motion.div>

      <Image
        src={authEffect}
        alt="auth effect"
        width={500}
        height={500}
        className="absolute top-4 left-16 object-cover">
      </Image>

      <Image
        src={authEffect}
        alt="auth effect"
        width={500}
        height={500}
        className="absolute bottom-4 right-16 object-cover">
      </Image>

      <div className="flex flex-col space-y-4 w-full max-w-[720px] min-w-[360px] mx-36 px-16 md:px-32 py-4 rounded-3xl bg-purple-100 bg-opacity-10 backdrop-blur-md">
        <h1 className="text-[36px] md:text-[72px] font-semibold text-white text-center">
          REGISTER
        </h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4">
           <Input
             type="text"
             label="User Name"
             placeholder="User Name"
             error={errors.username}
             {...register("username")}
             labelClassName="text-white"
           />
           <Input
             type="text"
             label="Full Name"
             placeholder="FullName"
             error={errors.fullname}
             {...register("fullname")}
             labelClassName="text-white"
           />
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            error={errors.email}
            {...register("email")}
            labelClassName="text-white"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            error={errors.password}
            {...register("password")}
            labelClassName="text-white"
          />
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 from-0% via-purple-500 via-50% to-sky-500 to-100% text-xl font-semibold text-white p-2 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-300"
            >
              {isLoading ? "Loading..." : "REGISTER"}
            </button>
          </div>
        </form>
        <hr />
        <div className="m-4 text-white text-center">
          <p>
          Already have an account?{" "}
            <Link href="/login" className="text-sky-300 hover:underline">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
