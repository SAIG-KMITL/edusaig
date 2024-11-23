"use client";

import { navbarButtons } from "@/constants/navbar";
import { UserResponseType } from "@/types/user.type";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, User, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavbarTypeProps = {
  user: UserResponseType;
};

function Navbar({ user }: NavbarTypeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div className="sticky top-0 z-20">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="h-[72px] flex bg-white bg-opacity-5 backdrop-blur-md items-center justify-between px-6 relative z-10"
      >
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="font-bold text-[26px] leading-[100%] text-white flex ml-5 cursor-pointer"
        >
          <Link href="/" className="flex flex-row items-center gap-3">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="logo"
              className="pb-2"
            />
            <p className="flex flex-row items-baseline">
              EDUSA
              <Image
                src="/icons/wand.svg"
                width={24}
                height={24}
                alt="wand icon"
              />
              G
            </p>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="items-center font-medium md:flex text-white">
          {navbarButtons.map((button, index) => (
            <motion.div
              key={index}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Link
                href={button.link}
                className={`hidden md:block px-4 lg:px-6 py-6 h-[72px] transition relative group ${
                  pathname.endsWith(button.link) && "font-bold text-lg"
                }`}
              >
                {button.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          ))}

          {/* Authentication Button */}
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            {user ? (
              <Link
                href="/profile"
                className="hidden md:flex ml-6 px-5 py-2 rounded-lg transition mr-5 bg-white hover:bg-opacity-85 font-semibold text-electricViolet"
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex ml-6 px-5 py-2 rounded-lg transition mr-5 bg-white hover:bg-opacity-85 font-semibold text-electricViolet"
              >
                Get Started
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          {!isOpen && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <MenuIcon
                onClick={toggleMenu}
                className="md:hidden cursor-pointer w-10 h-10 p-2 rounded-full hover:bg-white hover:bg-opacity-10 text-white"
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
              className="md:hidden fixed inset-0 bg-gray-900 z-10"
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden z-20 fixed top-0 right-0 w-[260px] h-full shadow-xl bg-gradient-to-b from-[#ffffff1a] to-[#ffffff66] backdrop-blur-md"
            >
              <div className="pt-4 px-6 flex flex-row justify-end">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XIcon
                    onClick={toggleMenu}
                    className="w-10 h-10 p-2 rounded-full text-white hover:bg-white hover:bg-opacity-10"
                  />
                </motion.div>
              </div>

              <motion.div
                className="grid grid-cols-1 text-white gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {navbarButtons.map((button, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={button.link}
                      className={`py-3 px-6 hover:bg-white hover:bg-opacity-10 block text-center transition-colors ${
                        pathname.endsWith(button.link) && "font-bold text-lg"
                      }`}
                      onClick={toggleMenu}
                    >
                      {button.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 pt-4"
                >
                  {user ? (
                    <Link
                      href="/profile"
                      className="w-full py-3 bg-white hover:bg-opacity-90 rounded-lg font-semibold text-electricViolet flex items-center justify-center gap-2"
                      onClick={toggleMenu}
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="w-full py-3 bg-white hover:bg-opacity-90 rounded-lg font-semibold text-electricViolet text-center"
                      onClick={toggleMenu}
                    >
                      Get Started
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
