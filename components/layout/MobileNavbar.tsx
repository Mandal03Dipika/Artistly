"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 },
  }),
};

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Explore Artists", href: "/artists" },
    { label: "Onboard Artist", href: "/onboarding" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div className="md:hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-700 dark:text-purple-400 focus:outline-none"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <AnimatePresence>
          {open && (
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="z-50 p-1 mt-2 overflow-hidden bg-white border rounded-md shadow-lg w-52 dark:border-gray-700 dark:bg-gray-900"
              asChild
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={item.href}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </div>
  );
};

export default MobileNavbar;
