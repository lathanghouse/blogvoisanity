import HomePage from "@/components/pages/home/HomePage";
import Image from "next/image";
import { loadHomePage } from "@/sanity/loader/loadQuery";

export default async function Home() {
  const initial = await loadHomePage();
  return <HomePage data={initial.data} />;
}
