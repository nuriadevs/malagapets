//import { Metadata } from "next";
import {SearchPageProps} from "@/types/components";
import { Main } from "@/components/layouts/main";
import SearchSection from "@/components/sections/blog/search-section";


export default function SearchPage({ params, searchParams }: SearchPageProps) {
    return (
        <Main ariaLabelKey="search.title" className="min-h-screen flex items-center justify-center">
            <SearchSection params={params} searchParams={searchParams} />
        </Main>
    );
}

export const revalidate = 3600; // 1 hora en segundos