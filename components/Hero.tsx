"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="grid items-center gap-10 py-10 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
          Book Performing Artists Easily
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-gray-600 dark:text-gray-300"
        >
          Connect event planners with artist managers to seamlessly book
          singers, dancers, speakers, DJs, and more.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/artists"
            className="inline-block px-6 py-3 font-medium text-white transition bg-purple-600 rounded-2xl hover:bg-purple-700"
          >
            Explore Artists
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="flex justify-center"
      >
        <Image
          src="/images/model.png"
          alt="Artist Illustration"
          width={400}
          height={400}
          className="object-contain"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
