"use client";

import { useEffect, useState } from "react";
import { getArtists } from "@/lib/api";
import { Artist } from "@/types";
import ArtistCard from "@/components/cards/ArtistCard";
import Filter from "@/components/Filter";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion, Variants } from "framer-motion";

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const updatedCategory = initialCategory.slice(0, -1);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [category, setCategory] = useState(updatedCategory);
  const [location, setLocation] = useState("");
  const [feeRange, setFeeRange] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getArtists();
      setArtists(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filtered = artists.filter((artist) => {
    return (
      (!category || artist.category.includes(category)) &&
      (!location || artist.location === location) &&
      (!feeRange || artist.feeRange === feeRange)
    );
  });

  const uniqueLocations = [...new Set(artists.map((a) => a.location))];
  const uniqueFees = [...new Set(artists.map((a) => a.feeRange))];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-10 bg-background text-foreground md:px-8 lg:px-20"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            Explore Artists
          </CardTitle>
        </CardHeader>
      </Card>
      <Filter
        uniqueLocations={uniqueLocations}
        uniqueFees={uniqueFees}
        setCategory={setCategory}
        setLocation={setLocation}
        setFeeRange={setFeeRange}
      />
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-purple-500 rounded-full border-t-transparent animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="sync">
            {filtered.map((artist) => (
              <motion.div
                key={artist.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                layout
              >
                <ArtistCard artist={artist} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="mt-16 text-sm text-center text-muted-foreground">
          No matching artists found.
        </p>
      )}
    </motion.main>
  );
}
