//src/components/sections/blog/archive-section.tsx
import { getPaginatedPostsForArchive } from "@/lib/strapi/api";
import type { ArchiveSectionProps } from "@/types/blog";
import { getPaginationParams } from "@/hooks/use-pagination";
import ArchiveSectionContent from "./archive-section-content";
import { POSTS_PER_PAGE_ARCHIVE } from "@/lib/blog/constants"; 


export default async function ArchiveSection({ locale, searchParams }: ArchiveSectionProps) {
    const pagination = await getPaginationParams(searchParams, POSTS_PER_PAGE_ARCHIVE);

    const { posts, pagination: paginationData } = await getPaginatedPostsForArchive({
        locale,
        page: pagination.currentPage,
        pageSize: POSTS_PER_PAGE_ARCHIVE
    });

    // Calcular valores primitivos aquí (Server Side)
    const isLastPage = pagination.currentPage >= paginationData.pageCount;

    return (
        <ArchiveSectionContent
            posts={posts}
            currentPage={pagination.currentPage}
            isFirstPage={pagination.isFirstPage}
            isLastPage={isLastPage}
            totalPosts={paginationData.total}
        />
    );
}
