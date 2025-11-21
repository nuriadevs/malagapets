import { Metadata } from "next";
import { Main } from "@/components/layouts/main";
import { ArchivePageProps } from "@/types/blog";
import ArchiveSection from "@/components/sections/blog/archive-section";

export const metadata: Metadata = {
    title: "Archivo Completo | Tu Blog",
    description: "Explora nuestra colección completa de artículos",
};


export default async function ArchivePage({ params, searchParams }: ArchivePageProps) {
    const { locale } = await params;
    
    return (
        <Main ariaLabelKey="main.archive" className="min-h-screen">
            <ArchiveSection locale={locale} searchParams={searchParams} />
        </Main>
    );
}

export const revalidate = 3600; // 1 hora en segundos