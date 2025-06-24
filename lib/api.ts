import db from "@/mock-api/db.json";

export async function getArtists() {
  const res = await fetch("http://localhost:5000/artists");
  return res.json();
}

export async function getCategories() {
  const res = await fetch("http://localhost:5000/categories");
  return res.json();
}

export const useOptions = () => {
  const categoryOptions = db.categories.map((item) => item.name);
  const languageOptions = db.languages.map((item) => item.id);
  const feeOptions = db.feeRanges.map((item) => item.id);
  return { categoryOptions, languageOptions, feeOptions };
};
