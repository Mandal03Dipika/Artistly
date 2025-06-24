"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "./Hero";
import { motion, Variants } from "framer-motion";

export default function HomePage({
  categories,
}: {
  categories: { id: string; name: string; icon: string }[];
}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-white dark:bg-gray-950 md:px-12 lg:px-24">
      <Hero />
      <section className="mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100"
        >
          Performing Artists
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                // onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center justify-center w-full h-56 p-4 transition cursor-pointer hover:shadow-md dark:hover:shadow-purple-900 hover:border-purple-500"
              >
                <CardContent className="flex flex-col items-center justify-center space-y-2">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={64}
                    height={64}
                  />
                  <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
