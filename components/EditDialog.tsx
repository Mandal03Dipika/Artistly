"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Artist } from "@/types";
interface EditDialogProps {
  showEditModal: boolean;
  setShowEditModal: (value: boolean) => void;
  artistToEdit: Artist | null;
  setArtistToEdit: (artist: Artist) => void;
}

const EditDialog = ({
  showEditModal,
  setShowEditModal,
  artistToEdit,
  setArtistToEdit,
}: EditDialogProps) => {
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated artist:", artistToEdit);
    setShowEditModal(false);
  };

  return (
    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            key="edit-dialog"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <DialogContent className="p-6 bg-white border shadow-xl sm:max-w-md rounded-2xl dark:bg-zinc-900 text-foreground border-border">
              <DialogHeader className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <DialogTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                    Edit Artist
                  </DialogTitle>
                </motion.div>
              </DialogHeader>

              <motion.form
                onSubmit={handleEditSubmit}
                className="mt-4 space-y-5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="space-y-1"
                >
                  <Label
                    htmlFor="name"
                    className="text-sm text-muted-foreground"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={artistToEdit?.name || ""}
                    onChange={(e) =>
                      setArtistToEdit({
                        ...(artistToEdit as Artist),
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter artist name"
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="space-y-1"
                >
                  <Label
                    htmlFor="location"
                    className="text-sm text-muted-foreground"
                  >
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={artistToEdit?.location || ""}
                    onChange={(e) =>
                      setArtistToEdit({
                        ...(artistToEdit as Artist),
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter location"
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="space-y-1"
                >
                  <Label
                    htmlFor="fee"
                    className="text-sm text-muted-foreground"
                  >
                    Fee Range
                  </Label>
                  <Input
                    id="fee"
                    value={artistToEdit?.feeRange || ""}
                    onChange={(e) =>
                      setArtistToEdit({
                        ...(artistToEdit as Artist),
                        feeRange: e.target.value,
                      })
                    }
                    placeholder="Enter fee range"
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Save Changes
                  </Button>
                </motion.div>
              </motion.form>
            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default EditDialog;
