"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Artist } from "@/types";
import { motion } from "framer-motion";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className="transition-all bg-white border shadow-sm dark:bg-zinc-900 border-border hover:shadow-md rounded-2xl">
        <CardContent className="flex flex-col gap-3 p-5">
          <img
            src={artist.profileImage}
            alt={artist.name}
            className="object-cover w-full h-48 mb-3 rounded-xl"
          />
          <h3 className="text-lg font-semibold text-foreground">
            {artist.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {artist.category.join(", ")}
          </p>
          <p className="text-sm text-muted-foreground">{artist.location}</p>
          <p className="text-base font-medium text-purple-600 dark:text-purple-400">
            {artist.feeRange}
          </p>
          <Button className="w-full mt-2">Ask for Quote</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
