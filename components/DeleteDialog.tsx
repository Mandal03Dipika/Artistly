"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";

const DeleteDialog = ({
  showDeleteDialog,
  setShowDeleteDialog,
  artistToDelete,
}: any) => {
  const handleDelete = () => {
    console.log("Deleting artist:", artistToDelete?.id);
    setShowDeleteDialog(false);
  };

  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            key="delete-dialog"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <AlertDialogContent className="p-6 bg-white border shadow-xl sm:max-w-md rounded-2xl dark:bg-zinc-900 text-foreground border-border">
              <AlertDialogHeader className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <AlertDialogTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                    Confirm Deletion
                  </AlertDialogTitle>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <AlertDialogDescription className="text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <strong>{artistToDelete?.name}</strong>? This action cannot
                    be undone.
                  </AlertDialogDescription>
                </motion.div>
              </AlertDialogHeader>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </AlertDialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertDialog>
  );
};

export default DeleteDialog;
