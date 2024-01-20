import { loadSettings } from "@/sanity/loader/loadQuery";

import FooterLayout from "./FooterLayout";

export async function Footer() {
  const initial = await loadSettings();

  return <FooterLayout data={initial.data} />;
}
