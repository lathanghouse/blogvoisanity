"use client";
import Link from "next/link";

import { ProjectListItem } from "@/components/pages/home/ProjectListItem";
import { resolveHref } from "@/sanity/lib/utils";
import type { HomePagePayload } from "@/types";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import React from "react";
import { Header } from "@/components/shared/Header";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";
export interface HomePageProps {
  data: HomePagePayload | null;
}
interface CurrentItems {
  _type: string;
  coverImage?: Image;
  overview?: PortableTextBlock[];
  slug?: string;
  tags?: string[];
  title?: string;
}
export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = "" } = data ?? {};
  //   console.log(showcaseProjects.splice(0, 1));
  // const currentItems?: ShowcaseProject[];
  const [currentItems, setCurrentItems] = useState<CurrentItems[]>([
    { _type: "" },
  ]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const endOffset = itemOffset + 1;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(showcaseProjects.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(showcaseProjects.length / 1));
  }, [itemOffset, showcaseProjects]);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * 1) % showcaseProjects.length;
    console.log(
      `User requested page number ${selectedItem.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <main>
      <div className="space-y-20">
        {/* Header */}
        {title && <Header centered title={title} description={overview} />}
        {/* Showcase projects */}
        {currentItems && currentItems.length > 0 && (
          <div className="mx-auto max-w-[100rem] rounded-md border">
            {currentItems.map((project, key) => {
              const href = resolveHref(project._type, project.slug);
              if (!href) {
                return null;
              }
              return (
                <Link key={key} href={href}>
                  <ProjectListItem project={project} odd={key % 2} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="sm:text-xs md:text-2xl">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          pageCount={pageCount}
          previousLabel="<Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </main>
  );
}

export default HomePage;
