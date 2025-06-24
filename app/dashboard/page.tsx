"use client";

import { useEffect, useState } from "react";
import { getArtists } from "@/lib/api";
import ArtistsTable from "@/components/ArtistsTable";
import Pagination from "@/components/Pagination";
import ArtistModal from "@/components/ArtistModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface Artist {
  id: number;
  name: string;
  category: string[];
  location: string;
  feeRange: string;
  profileImage: string;
  bio: string;
}

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Artist | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const artistsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtists();
      setArtists(data);
    };
    fetchData();
  }, []);

  const handleSort = (key: keyof Artist | "") => {
    setSortKey(key);
    setCurrentPage(1);
  };

  const filteredArtists = artists
    .filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aValue = a[sortKey]?.toString().toLowerCase();
      const bValue = b[sortKey]?.toString().toLowerCase();
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage);

  return (
    <motion.div
      className="max-w-6xl px-4 py-10 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-md dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Artist Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              placeholder="Search by name..."
              className="w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={(val) => handleSort(val as keyof Artist)}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent
                className="z-50 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700"
                side="bottom"
                align="end"
                position="popper"
              >
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="feeRange">Fee</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ArtistsTable
              currentArtists={currentArtists}
              setSelectedArtist={setSelectedArtist}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </motion.div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            key="artist-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ArtistModal
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
