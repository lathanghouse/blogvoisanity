import { toPlainText } from "@portabletext/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { Page } from "@/components/pages/page/Page";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadPage } from "@/sanity/loader/loadQuery";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: page } = await loadPage(params.slug);

  return {
    title: page?.title,
    description: page?.overview
      ? toPlainText(page.overview)
      : (await parent).description,
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("page");
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug);

  if (!initial.data) {
    notFound();
  }

  return <Page data={initial.data} />;
}
