import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Málaga Pets API",
    status: "ok",
    version: "1.0.0",
    endpoints: [
      { path: "/api/beaches", description: "Listado de playas" },
      { path: "/api/posts", description: "Listado de publicaciones" },
      { path: "/api/posts/[slug]", description: "Detalle de una publicación" },
      { path: "/api/categories", description: "Listado de categorías" },
      {
        path: "/api/categories/[slug]",
        description: "Detalle de una categoría",
      },
      { path: "/api/authors", description: "Listado de autores" },
      { path: "/api/authors/[slug]", description: "Detalle de un autor" },
      { path: "/api/search", description: "Búsqueda general" },
      { path: "/api/veterinary", description: "Listado de veterinarios" },
    ],
  });
}
