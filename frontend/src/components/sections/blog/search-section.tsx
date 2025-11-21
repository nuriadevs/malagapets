import { searchPostsByTitle } from "@/lib/strapi/api";
import { SearchSectionProps } from "@/types/components";
import { mapPostsToCards } from "@/lib/strapi/mappers";
import SearchSectionContent from "./search-section-content";
import { POSTS_PER_PAGE_SEARCH } from "@/lib/blog/constants";




export default async function SearchSection({ params, searchParams }: SearchSectionProps) {

    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.q || "";
    const currentPage = Number(resolvedSearchParams.page) || 1;

    const postsResponse = query
        ? await searchPostsByTitle(query, resolvedParams.locale, currentPage, POSTS_PER_PAGE_SEARCH)
        : { data: [], meta: { pagination: { total: 0 } } };

    const posts = mapPostsToCards(postsResponse.data);
    const totalPosts = postsResponse.meta?.pagination?.total || 0;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE_SEARCH);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <SearchSectionContent
            query={query}
            posts={posts}
            totalPosts={totalPosts}
            currentPage={currentPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            locale={resolvedParams.locale}
            postsPerPage={POSTS_PER_PAGE_SEARCH}
        />
    );
}