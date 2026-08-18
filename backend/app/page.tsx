import { Heart } from "lucide-react"

export default function Home() {
  const endpoints = [
    {
      name: "API Status",
      path: "/api",
      description: "Estado y información de la API",
    },
    {
      name: "Beaches",
      path: "/api/beaches",
      description: "Listado de playas",
    },
    {
      name: "Posts",
      path: "/api/posts",
      description: "Listado de publicaciones",
    },
    {
      name: "Categories",
      path: "/api/categories",
      description: "Listado de categorías",
    },
    {
      name: "Authors",
      path: "/api/authors",
      description: "Listado de autores",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              API Online
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              Málaga Pets API
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Backend y API REST de Málaga Pets.
            </p>
          </div>

          {/* API information */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
              API
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-zinc-500">Base URL</p>
                <p className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                  https://api.malagapets.com
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Estado</p>
                <p className="mt-1 font-medium text-green-600">
                  Operativa
                </p>
              </div>
            </div>
          </section>

          {/* Endpoints */}
          <section>
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
              Endpoints
            </h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              {endpoints.map((endpoint) => (
                <a
                  key={endpoint.path}
                  href={endpoint.path}
                  className="flex flex-col gap-2 border-b border-zinc-200 p-5 transition-colors last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-black dark:text-zinc-50">
                      {endpoint.name}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {endpoint.description}
                    </p>
                  </div>

                  <code className="text-sm text-zinc-600 dark:text-zinc-400">
                    {endpoint.path}
                  </code>
                </a>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-4 flex items-center justify-between text-sm text-zinc-500">
            <p className="text-sm text-muted-foreground text-center">
              <span className="text-gradient-primary font-semibold">
                MálagaPets API · Next.js
              </span>
            </p>

            <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 flex-wrap">
              Desarrollado con
              <Heart className="w-3.5 h-3.5 text-primary-text fill-primary animate-pulse" aria-hidden="true" />
              por{" "}
              <a
                href="https://nuriavazquez.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Nuria
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}