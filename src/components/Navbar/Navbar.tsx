"use client";

import { navbarButtons } from "@/constants/navbar";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const pathname = usePathname();

  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="h-[72px] flex bg-white bg-opacity-5 backdrop-blur-md items-center justify-between px-[24px] relative z-10">
        <div className="font-bold text-[26px] leading-[100%] text-white flex ml-5 pointer">
          <Link href={"/"} className="flex flex-row items-center gap-3">
            <Image
              src={"/icons/logo.svg"}
              width={32}
              height={32}
              alt="logo"
              className="pb-2"
            />
            <p className="flex flex-row items-baseline">
              EDUSA
              <Image
                src={"/icons/wand.svg"}
                width={24}
                height={24}
                alt="wand icon"
              />
              G
            </p>
          </Link>
        </div>
        <div className="items-center font-medium md:flex text-white">
          {navbarButtons.map((button, index) => {
            return (
              <Link
                key={index}
                href={button.link}
                className={`hidden md:block px-4 lg:px-6 py-6 h-[72px] transition ${
                  pathname.endsWith(button.link) && "font-bold text-lg"
                } hover:bg-white hover:bg-opacity-5`}
              >
                {button.label}
              </Link>
            );
          })}
          {/* Waiting user data */}
          <Link
            href={"/login"}
            className="hidden md:flex ml-6 px-5 py-2 rounded-lg border-skyblue transition mr-5 bg-white hover:bg-opacity-85 font-semibold text-electricViolet"
          >
            Get Started
          </Link>

          {!isOpen && (
            <MenuIcon
              onClick={Toggle}
              className="md:hidden cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            />
          )}
        </div>
      </div>

      {/* Mobile */}
      {isOpen ? (
        <div>
          <div className="md:hidden z-20 fixed top-0 right-0 w-[260px] h-full shadow-xl bg-gradient-to-b from-[#ffffff1a] to-[#ffffff66] backdrop-blur-md transition">
            <div className="pt-4 px-6 flex flex-row justify-end">
              <XIcon
                onClick={Toggle}
                className="w-10 h-10 p-2 rounded-full text-white hover:bg-white hover:bg-opacity-10"
              />
            </div>
            <div className="grid grid-cols-1 text-white">
              {navbarButtons.map((button, index) => {
                return (
                  <Link
                    key={index}
                    href={button.link}
                    className={`py-3 hover:bg-white hover:bg-opacity-10 text-center ${
                      pathname.endsWith(button.link) && "font-bold text-lg"
                    }`}
                  >
                    {button.label}
                  </Link>
                );
              })}
              <Link
                href={"/login"}
                className="mx-6 mt-4 py-3 flex justify-center bg-trans-white rounded-full bg-white hover:bg-opacity-85 font-semibold text-electricViolet text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div
            onClick={Toggle}
            className="md:hidden fixed top-0 z-10 h-[100vh] w-full bg-gray-900 opacity-50"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
