"use client";

import HomePage from "@/components/HomePage";
import { getCategories } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      <HomePage categories={categories} />
    </main>
  );
}
