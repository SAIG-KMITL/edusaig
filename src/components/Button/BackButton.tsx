"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import backButton from "../../../public/ulits/back-button.svg";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  customAction?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = "Back",
  customAction,
  className = "",
  ...props
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (customAction) {
      customAction();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center w-24 h-10 rounded-3xl space-x-3 bg-slate-100 ${className}`}
      {...props}
    >
      <Image
        src={backButton}
        alt="Back button"
        width={12}
        height={12}
        className="object-cover"
        priority={false}
      />
      <h2 className="text-sm font-normal text-black">{label}</h2>
    </button>
  );
};

export default BackButton;
