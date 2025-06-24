"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Filter = ({
  setCategory,
  setLocation,
  setFeeRange,
  uniqueLocations,
  uniqueFees,
}: {
  setCategory: (val: string) => void;
  setLocation: (val: string) => void;
  setFeeRange: (val: string) => void;
  uniqueLocations: string[];
  uniqueFees: string[];
}) => {
  const [category, updateCategory] = useState("");
  const [location, updateLocation] = useState("");
  const [feeRange, updateFeeRange] = useState("");

  const handleClearAll = () => {
    updateCategory("");
    updateLocation("");
    updateFeeRange("");
    setCategory("");
    setLocation("");
    setFeeRange("");
  };

  const handleRemoveTag = (type: string) => {
    if (type === "category") {
      updateCategory("");
      setCategory("");
    } else if (type === "location") {
      updateLocation("");
      setLocation("");
    } else if (type === "feeRange") {
      updateFeeRange("");
      setFeeRange("");
    }
  };

  return (
    <motion.div
      className="mb-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Select
            value={category}
            onValueChange={(val) => {
              updateCategory(val);
              setCategory(val);
            }}
          >
            <SelectTrigger className="w-full md:w-48 text-foreground border-border">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent
              className="z-50 text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700"
              side="bottom"
            >
              {["Singer", "Dancer", "Speaker", "DJ"].map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Select
            value={location}
            onValueChange={(val) => {
              updateLocation(val);
              setLocation(val);
            }}
          >
            <SelectTrigger className="w-full md:w-48 text-foreground border-border">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent
              className="z-50 text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700"
              side="bottom"
            >
              {uniqueLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Select
            value={feeRange}
            onValueChange={(val) => {
              updateFeeRange(val);
              setFeeRange(val);
            }}
          >
            <SelectTrigger className="w-full md:w-48 text-foreground border-border">
              <SelectValue placeholder="Fee Range" />
            </SelectTrigger>
            <SelectContent
              className="z-50 text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700"
              side="bottom"
            >
              {uniqueFees.map((fee) => (
                <SelectItem key={fee} value={fee}>
                  {fee}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>
      {(category || location || feeRange) && (
        <motion.div
          className="flex flex-wrap items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {category && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge className="flex items-center gap-1 ml-1 text-purple-700 dark:text-purple-200 hover:text-red-500">
                    {category}
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleRemoveTag("category")}
                    />
                  </Badge>
                </motion.div>
              )}
              {location && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge className="flex items-center gap-1 ml-1 text-purple-700 dark:text-purple-200 hover:text-red-500">
                    {location}
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleRemoveTag("location")}
                    />
                  </Badge>
                </motion.div>
              )}
              {feeRange && (
                <motion.div
                  key="feeRange"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge className="flex items-center gap-1 ml-1 text-purple-700 dark:text-purple-200 hover:text-red-500">
                    {feeRange}
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleRemoveTag("feeRange")}
                    />
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="shrink-0"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Filter;
