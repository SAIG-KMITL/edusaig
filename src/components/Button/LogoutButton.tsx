import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { Toast } from "../Toast/Toast";

export default function LogoutButton() {
  const toggleLogout = () => {
    Toast("Logout Success","success")
    Cookies.remove("AUTH_TOKEN", { path: "" });
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href="/login"
        onClick={toggleLogout}
        className="flex gap-2 items-center justify-center border mt-4 p-2 md:mt-0 md:rounded-lg md:opacity-80"
      >
        <LogOut className="w-5 h-5" />
        <p className="md:hidden block">Log out</p>
      </Link>
    </motion.div>
  );
}
