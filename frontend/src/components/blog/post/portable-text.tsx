// src/lib/strapi/portable-text.tsx
import Image from "next/image";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi/helpers";
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import type { StrapiImage } from "@/types/strapi";
import { PortableTextProps } from "@/types/blog";



export function PortableText({ value }: PortableTextProps) {
    if (!value) return null;

    // Si es un array de bloques de Strapi
    if (Array.isArray(value)) {
        return (
            <article aria-label="Contenido del artículo">
                {value.map((block, index) => {
                    // Bloques de Rich Text
                    if (
                        (block.__component === 'shared.rich-text' ||
                            block.__component === 'blocks.rich-text') &&
                        'body' in block
                    ) {
                        return <RichTextBlock key={index} content={block.body} />;
                    }

                    // Bloques de Quote
                    if (
                        (block.__component === 'shared.quote' ||
                            block.__component === 'blocks.quote') &&
                        'body' in block
                    ) {
                        return (
                            <blockquote
                                key={index}
                                className="border-l-4 border-success/50 pl-6 py-4 my-8 bg-muted/30 rounded-r-lg"
                            >
                                <p className="text-foreground/80 text-lg md:text-xl leading-relaxed italic">
                                    {block.body}
                                </p>
                                {block.title && (
                                    <footer className="text-sm md:text-base text-muted-foreground mt-3 not-italic font-medium">
                                        <cite>— {block.title}</cite>
                                    </footer>
                                )}
                            </blockquote>
                        );
                    }

                    // Bloques de Media (imágenes)
                    if (
                        (block.__component === 'shared.media' ||
                            block.__component === 'blocks.media') &&
                        'file' in block && block.file
                    ) {
                        const imageUrl = getStrapiImageUrl(block.file as StrapiImage, "large");
                        if (!imageUrl || typeof imageUrl !== 'string') return null;

                        const altText = block.file.alternativeText || '';
                        const hasCaption = !!block.file.caption;

                        return (
                            <figure
                                key={index}
                                className="my-10"
                                aria-label={hasCaption ? undefined : altText}
                            >
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src={imageUrl}
                                        alt={altText}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                        className="object-cover"
                                        loading="lazy"
                                        quality={85}
                                    />
                                </div>
                                {hasCaption && (
                                    <figcaption
                                        className="text-center text-sm md:text-base text-muted-foreground mt-3 px-4"
                                        id={`caption-${index}`}
                                    >
                                        {block.file.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    } else {
                        console.log("🔍 Bloque no reconocido:", {
                            component: block.__component,
                            hasFile: 'file' in block,
                            fileValue: 'file' in block ? block.file : undefined,
                            blockKeys: Object.keys(block),
                            fullBlock: block
                        });
                    }

                    // Bloques de Slider (Galería)
                    if (
                        (block.__component === 'shared.slider' ||
                            block.__component === 'blocks.slider') &&
                        'files' in block && block.files && block.files.length > 0
                    ) {
                        return (
                            <section
                                key={index}
                                className="my-10"
                                aria-label="Galería de imágenes"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {block.files.map((file, fileIndex) => {
                                        const imageUrl = getStrapiImageUrl(file as StrapiImage, "medium");
                                        if (!imageUrl || typeof imageUrl !== 'string') return null;

                                        const altText = file.alternativeText || `Imagen ${fileIndex + 1} de ${block.files.length}`;

                                        return (
                                            <figure
                                                key={fileIndex}
                                                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                                            >
                                                <Image
                                                    src={imageUrl}
                                                    alt={altText}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover"
                                                    loading="lazy"
                                                    quality={85}
                                                />
                                            </figure>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    }

                    return null;
                })}
            </article>
        );
    }

    // Si es HTML string directo (no recomendado por seguridad)
    if (typeof value === 'string') {
        return (
            <div
                className=""
                dangerouslySetInnerHTML={{ __html: value }}
            />
        );
    }

    return null;
}

// Componente para renderizar Rich Text (Markdown/HTML)
function RichTextBlock({ content }: { content: string }) {
    if (!content) return null;

    const components: Components = {
        // Encabezados - WCAG 2.2 AA compliant (contraste 4.5:1 mínimo)
        h1: ({ children, ...props }) => {
            const id = typeof children === 'string'
                ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                : undefined;
            return (
                <h1
                    className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 mt-12 text-foreground leading-[1.2] tracking-tight scroll-mt-24"
                    id={id}
                    tabIndex={-1}
                    {...props}
                >
                    {children}
                </h1>
            );
        },
        h2: ({ children, ...props }) => {
            const id = typeof children === 'string'
                ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                : undefined;

            return (
                <h2
                    className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-5 mt-10 text-foreground leading-[1.3] tracking-tight scroll-mt-24"
                    id={id}
                    tabIndex={-1}
                    {...props}
                >
                    {children}
                </h2>
            );
        },
        h3: ({ children, ...props }) => {
            const id = typeof children === 'string'
                ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                : undefined;

            return (
                <h3
                    className="text-xl sm:text-2xl lg:text-2xl font-semibold mb-4 mt-8 text-foreground leading-[1.4] scroll-mt-24"
                    id={id}
                    tabIndex={-1}
                    {...props}
                >
                    {children}
                </h3>
            );
        },
        h4: ({ children, ...props }) => (
            <h4
                className="text-lg sm:text-xl lg:text-xl font-semibold mb-3 mt-6 text-foreground leading-normal scroll-mt-24"
                tabIndex={-1}
                {...props}
            >
                {children}
            </h4>
        ),
        h5: ({ children, ...props }) => (
            <h5
                className="text-base sm:text-lg lg:text-lg font-semibold mb-2 mt-5 text-foreground leading-normal scroll-mt-24"
                tabIndex={-1}
                {...props}
            >
                {children}
            </h5>
        ),
        h6: ({ children, ...props }) => (
            <h6
                className="text-base sm:text-base font-semibold mb-2 mt-4 text-foreground leading-normal scroll-mt-24"
                tabIndex={-1}
                {...props}
            >
                {children}
            </h6>
        ),

        // Párrafos - Tamaño óptimo 16-18px, line-height 1.7-1.8
        p: ({ children, ...props }) => (
            <p
                className="mb-6 text-base sm:text-lg leading-[1.75] text-foreground"
                {...props}
            >
                {children}
            </p>
        ),

        strong: ({ children, ...props }) => (
            <strong className="font-bold text-foreground" {...props}>
                {children}
            </strong>
        ),

        em: ({ children, ...props }) => (
            <em className="italic text-foreground/90" {...props}>
                {children}
            </em>
        ),

        del: ({ children, ...props }) => (
            <del className="line-through text-muted-foreground opacity-75" {...props}>
                {children}
            </del>
        ),

        // Enlaces - WCAG 2.2: área clickable mínima 24x24px
        a: ({ children, href, ...props }) => {
            // Strapi siempre envía href, pero TypeScript necesita validación
            if (!href || typeof href !== 'string') {
                console.warn('Link sin href válido en contenido de Strapi:', children);
                return <span className="text-foreground/90">{children}</span>;
            }

            const isExternal = href.startsWith('http');
            const linkText = typeof children === 'string' ? children : 'enlace';

            return (
                <Link
                    href={href}
                    className="text-success font-medium underline decoration-2 underline-offset-4 hover:text-success/60 hover:decoration-success/80 transition-colors focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 rounded-sm inline-block min-h-[24px] py-0.5"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={isExternal ? `${linkText} (se abre en nueva pestaña)` : undefined}
                    {...props}
                >
                    {children}
                    {isExternal && (
                        <span className="inline-block ml-1 align-middle" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                <path d="M12 2L12 6M12 2L6 2M12 2L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </span>
                    )}
                </Link>
            );
        },

        // Listas - Espaciado óptimo para lectura
        ul: ({ children, ...props }) => (
            <ul
                className="list-disc ml-6 mb-6 space-y-3 text-foreground/90 marker:text-primary"
                role="list"
                {...props}
            >
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol
                className="list-decimal ml-6 mb-6 space-y-3 text-foreground/90 marker:text-primary marker:font-semibold"
                role="list"
                {...props}
            >
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="text-base sm:text-lg leading-[1.75] pl-2" {...props}>
                {children}
            </li>
        ),

        // Blockquote
        blockquote: ({ children, ...props }) => (
            <blockquote
                className="border-l-4 border-primary/50 pl-6 py-4 my-8 bg-muted/30 rounded-r-lg"
                {...props}
            >
                {children}
            </blockquote>
        ),

        // Código - Contraste alto y área suficiente
        code: ({ children, className, ...props }) => {
            const isInline = !className?.includes('language-');

            return isInline ? (
                <code
                    className="bg-muted text-foreground px-2 py-1 rounded text-sm font-mono border border-border"
                    {...props}
                >
                    {children}
                </code>
            ) : (
                <code
                    className="block bg-neutral-900 text-neutral-100 p-6 rounded-xl overflow-x-auto my-8 text-sm sm:text-base font-mono shadow-lg dark:bg-neutral-950"
                    {...props}
                >
                    {children}
                </code>
            );
        },
        pre: ({ children, ...props }) => (
            <pre className="my-8" {...props}>
                {children}
            </pre>
        ),

        // Tablas - Responsive y semántica completa
        table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-border shadow-sm">
                <table className="min-w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),
        thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>
                {children}
            </thead>
        ),
        tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-border" {...props}>
                {children}
            </tbody>
        ),
        tr: ({ children, ...props }) => (
            <tr className="hover:bg-muted/50 transition-colors" {...props}>
                {children}
            </tr>
        ),
        th: ({ children, ...props }) => (
            <th
                className="px-6 py-4 text-left text-sm font-semibold text-foreground border-b-2 border-border min-h-[44px]"
                scope="col"
                {...props}
            >
                {children}
            </th>
        ),
        td: ({ children, ...props }) => (
            <td className="px-6 py-4 text-sm sm:text-base text-foreground min-h-[44px]" {...props}>
                {children}
            </td>
        ),

        // Línea horizontal
        hr: ({ ...props }) => (
            <hr
                className="my-12 border-t-2 border-border"
                aria-hidden="true"
                {...props}
            />
        ),

        // Imágenes dentro del markdown - VALIDACIÓN CRÍTICA
        img: ({ src, alt }) => {
            // VALIDACIÓN: src debe ser string válido
            if (!src || typeof src !== 'string') {
                console.warn('Imagen omitida: src inválido o no es string');
                return null;
            }

            const altText = alt || '';

            return (
                <figure className="my-8">
                    <Image
                        src={src}
                        alt={altText}
                        width={800}
                        height={600}
                        className="rounded-lg w-full h-auto shadow-md"
                        loading="lazy"
                        quality={85}
                    />
                    {altText && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-2">
                            {altText}
                        </figcaption>
                    )}
                </figure>
            );
        },
    };

    return (
        <div className="prose-custom">
            <ReactMarkdown components={components}>
                {content}
            </ReactMarkdown>
        </div>
    );
}