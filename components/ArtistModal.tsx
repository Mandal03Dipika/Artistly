"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Artist } from "@/types";
import Image from "next/image";

interface ArtistModalProps {
  setSelectedArtist: (artist: null) => void;
  selectedArtist: Artist | null;
}

const ArtistModal = ({
  setSelectedArtist,
  selectedArtist,
}: ArtistModalProps) => {
  const isOpen = Boolean(selectedArtist);

  return (
    <Dialog open={isOpen} onOpenChange={() => setSelectedArtist(null)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="artist-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DialogContent className="p-6 bg-white border shadow-xl sm:max-w-md rounded-2xl dark:bg-zinc-900 text-foreground border-border">
              {selectedArtist && (
                <>
                  <DialogHeader className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <DialogTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                        {selectedArtist.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">
                        {selectedArtist.bio}
                      </DialogDescription>
                    </motion.div>
                  </DialogHeader>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-3 mt-6 text-sm"
                  >
                    {selectedArtist.profileImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Image
                          src={selectedArtist.profileImage}
                          alt={selectedArtist.name}
                          width={96}
                          height={96}
                          className="object-cover w-24 h-24 border rounded-full"
                        />
                      </motion.div>
                    )}
                    <div className="space-y-1 text-center">
                      <p>
                        <span className="font-medium text-muted-foreground">
                          Category:
                        </span>{" "}
                        {selectedArtist.category?.join(", ")}
                      </p>
                      <p>
                        <span className="font-medium text-muted-foreground">
                          Location:
                        </span>{" "}
                        {selectedArtist.location}
                      </p>
                      <p>
                        <span className="font-medium text-muted-foreground">
                          Fee Range:
                        </span>{" "}
                        {selectedArtist.feeRange}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex justify-end mt-6"
                  >
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedArtist(null)}
                    >
                      Close
                    </Button>
                  </motion.div>
                </>
              )}
            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default ArtistModal;
