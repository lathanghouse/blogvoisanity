import { toPlainText } from "@portabletext/react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPage } from "@/components/pages/project/ProjectPage";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { loadProject } from "@/sanity/loader/loadQuery";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data: project } = await loadProject(params.slug);
  const ogImage = urlForOpenGraphImage(project?.coverImage);

  return {
    title: project?.title,
    description: project?.overview
      ? toPlainText(project.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  };
}

export function generateStaticParams() {
  return generateStaticSlugs("project");
}

export default async function ProjectSlugRoute({ params }: Props) {
  const initial = await loadProject(params.slug);

  if (!initial.data) {
    notFound();
  }

  return <ProjectPage data={initial.data} />;
}
