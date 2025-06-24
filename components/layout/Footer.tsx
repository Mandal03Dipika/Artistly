"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const Footer = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Browse Artists", href: "/artists" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-white border-t dark:bg-gray-950"
    >
      <div className="container flex flex-col items-center justify-between gap-4 px-4 py-6 mx-auto text-center md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Artistly. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
            >
              <Link
                href={link.href}
                className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
