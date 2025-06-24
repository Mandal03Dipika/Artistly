"use client";

import Link from "next/link";
import Image from "next/image";
import ToggleTheme from "./ToggleTheme";
import MobileNavbar from "./MobileNavbar";
import { motion, Variants } from "framer-motion";

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const Navbar = () => {
  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Artistly Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Artistly
          </span>
        </Link>
      </motion.div>

      <nav className="items-center hidden space-x-6 md:flex">
        {["Explore Artists", "Onboard Artist", "Dashboard"].map((text, i) => (
          <motion.div
            key={text}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
          >
            <Link
              href={
                text === "Explore Artists"
                  ? "/artists"
                  : text === "Onboard Artist"
                  ? "/onboarding"
                  : "/dashboard"
              }
              className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
            >
              {text}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="flex items-center gap-4 md:gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
      >
        <ToggleTheme />
        <MobileNavbar />
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
