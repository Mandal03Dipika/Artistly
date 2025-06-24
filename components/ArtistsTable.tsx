"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Artist } from "@/types";

const tableContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

interface ArtistsTableProps {
  setSelectedArtist: (artist: Artist) => void;
  currentArtists: Artist[];
}

const ArtistsTable = ({
  setSelectedArtist,
  currentArtists,
}: ArtistsTableProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [artistToEdit, setArtistToEdit] = useState<any | null>(null);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={tableContainerVariants}
      >
        <Card className="p-4 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="text-left bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b">City</th>
                <th className="px-4 py-3 border-b">Fee</th>
                <th className="px-4 py-3 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentArtists.map((artist) => (
                  <motion.tr
                    key={artist.id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "var(--muted)",
                      transition: { duration: 0.2 },
                    }}
                    className="transition-colors border-b cursor-pointer hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 text-foreground">{artist.name}</td>
                    <td className="px-4 py-3 text-foreground">
                      {artist.category?.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {artist.location}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {artist.feeRange}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="z-50 bg-white border rounded-md shadow-md w-36 dark:bg-gray-900"
                          align="end"
                          side="bottom"
                          sideOffset={4}
                        >
                          <DropdownMenuItem
                            onClick={() => setSelectedArtist(artist)}
                            className="cursor-pointer"
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setArtistToEdit(artist);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer focus:text-red-600"
                            onClick={() => {
                              setArtistToDelete(artist);
                              setShowDeleteDialog(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </Card>
      </motion.div>
      <DeleteDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        artistToDelete={artistToDelete}
      />
      <EditDialog
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        artistToEdit={artistToEdit}
        setArtistToEdit={setArtistToEdit}
      />
    </>
  );
};

export default ArtistsTable;
