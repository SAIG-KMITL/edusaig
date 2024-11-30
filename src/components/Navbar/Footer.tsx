"use client";

import { Facebook, Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/SAIG-KMITL",
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/saig.kmitl/",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: "Facebook",
      href: "https://web.facebook.com/saigkmitl",
      icon: <Facebook className="w-5 h-5" />,
    },
  ];

  const resourceLinks = [
    { name: "Careers", href: "#" },
    { name: "Students", href: "#" },
    { name: "Investors", href: "#" },
    { name: "Developers", href: "#" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "AI Additional Terms of Use", href: "#" },
  ];

  return (
    <footer className="bg-opacity-5 backdrop-blur-md text-white flex mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <div className="font-bold text-[26px] leading-[100%] text-white flex ml-5 pointer">
              <Link href="/" className="flex flex-row items-center gap-3">
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
            <p className="mt-4 text-gray-400 text-sm">
              Empowering education through technology and innovation. Join our
              community of learners and educators.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Follow Us</h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Resources</h2>
            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Legal</h2>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SAIG. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
