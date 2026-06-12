import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import Image from "next/image"

/**
 * Componentes personalizados que sustituyen las etiquetas HTML del MDX.
 * Aplican el sistema de diseño del proyecto.
 */
const components = {
  h2: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2
      id={id}
      className="text-2xl sm:text-3xl font-bold mt-10 mb-5 text-foreground scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h3
      id={id}
      className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground scroll-mt-24"
    >
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground scroll-mt-24">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => {
    // En RSC los children de <p> que contienen <img> llegan como array
    // donde algún elemento tiene props.src — detectamos así:
    const hasImage = (child: React.ReactNode): boolean => {
      if (!child || typeof child !== "object") return false
      const c = child as { type?: unknown; props?: { src?: string } }
      if (c.type === "img" || (c.props?.src && typeof c.props.src === "string")) return true
      return false
    }

    const childArray = Array.isArray(children) ? children : [children]
    if (childArray.some(hasImage)) {
      return <>{children}</>
    }

    return (
      <p className="mb-6 text-base sm:text-lg leading-relaxed text-foreground">
        {children}
      </p>
    )
  },
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul
      className="list-disc ml-6 mb-6 space-y-2 text-foreground marker:text-primary"
      role="list"
    >
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol
      className="list-decimal ml-6 mb-6 space-y-2 text-foreground marker:text-primary marker:font-semibold"
      role="list"
    >
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-base sm:text-lg leading-relaxed pl-2">{children}</li>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => {
    if (!href) return <span>{children}</span>
    const isExternal = href.startsWith("http")
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-primary font-medium underline underline-offset-4 decoration-2 hover:text-primary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        {children}
        {isExternal && (
          <span className="sr-only"> (abre en nueva pestaña)</span>
        )}
      </Link>
    )
  },
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary/50 pl-6 py-4 my-8 bg-muted/30 rounded-r-xl italic text-foreground/80">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="divider-section my-10" aria-hidden="true" />
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-foreground/90">{children}</em>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const isBlock = className?.includes("language-")
    return isBlock ? (
      <code className="block bg-neutral-900 text-neutral-100 p-6 rounded-xl overflow-x-auto my-8 text-sm font-mono shadow-lg">
        {children}
      </code>
    ) : (
      <code className="bg-muted text-foreground px-2 py-0.5 rounded text-sm font-mono border border-border">
        {children}
      </code>
    )
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="my-8 overflow-x-auto">{children}</pre>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-border shadow-sm">
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground bg-muted border-b-2 border-border">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-6 py-4 text-sm sm:text-base text-foreground border-b border-border">
      {children}
    </td>
  ),
  img: ({ src, alt, title }: { src?: string; alt?: string; title?: string }) => {
    if (!src) return null
    const caption = title || null  // usa title como pie de foto, no alt
    return (
      <figure className="my-8">
        <Image
          src={src}
          alt={alt ?? ""}
          width={800}
          height={450}
          className="rounded-xl w-full h-auto shadow-md"
          loading="lazy"
        />
        {caption && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2 px-4">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },
}

interface MdxContentProps {
  /** compiledSource del objeto MDX que devuelve el backend */
  source: string
}

/**
 * MdxContent — renderiza MDX como React Server Component.
 *
 * - Sin hidratación en cliente
 * - Componentes personalizados con el sistema de diseño del proyecto
 * - Tipografía y estilos consistentes con el resto del blog
 */
export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            format: "md", // ← clave: trata el contenido como markdown, no MDX
          },
        }}
      />
    </div>
  )
}
