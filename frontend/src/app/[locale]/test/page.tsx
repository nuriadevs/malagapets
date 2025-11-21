// app/[locale]/test-strapi/page.tsx

import { STRAPI_URL, STRAPI_API_TOKEN, ENV } from "@/config/constants";
import { Main } from "@/components/layouts/main";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

interface TestStrapiPageProps {
    params: Promise<{ locale: Locale }>;
}

async function testStrapiConnection() {
    try {
        // Test sin token
        const responseNoAuth = await fetch(`${STRAPI_URL}/api/articles?pagination[limit]=1`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        const noAuthResult = {
            status: responseNoAuth.status,
            ok: responseNoAuth.ok,
            data: responseNoAuth.ok ? await responseNoAuth.json() : null,
            error: !responseNoAuth.ok ? await responseNoAuth.text() : null,
        };

        // Test con token (si existe)
        let withAuthResult = null;
        if (STRAPI_API_TOKEN) {
            const responseWithAuth = await fetch(`${STRAPI_URL}/api/articles?pagination[limit]=1`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
                },
                cache: 'no-store',
            });

            withAuthResult = {
                status: responseWithAuth.status,
                ok: responseWithAuth.ok,
                data: responseWithAuth.ok ? await responseWithAuth.json() : null,
                error: !responseWithAuth.ok ? await responseWithAuth.text() : null,
            };
        }

        return { noAuthResult, withAuthResult };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
            noAuthResult: null,
            withAuthResult: null,
        };
    }
}

export default async function TestStrapiPage({ params }: TestStrapiPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const { noAuthResult, withAuthResult, error } = await testStrapiConnection();

    return (
        <Main ariaLabelKey="main.homeContent" className="min-h-screen">
            <div className="container mx-auto p-8 space-y-8">
                {/* Header */}
                <div className="border-b pb-4">
                    <h1 className="text-3xl font-bold mb-2">🔌 Strapi Connection Test</h1>
                    <p className="text-muted-foreground">
                        Prueba de conexión a la API de Strapi
                    </p>
                </div>

                {/* Error General */}
                {error && (
                    <div className="p-4 border border-red-500 rounded-lg bg-red-500/10">
                        <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                            ❌ Error de conexión
                        </h3>
                        <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
                            {error}
                        </pre>
                    </div>
                )}

                {/* Config Info */}
                <div className="p-6 border rounded-lg space-y-3 bg-card">
                    <h2 className="text-xl font-semibold">⚙️ Configuration</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Strapi URL:</span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                                {STRAPI_URL}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">API Token:</span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                                {STRAPI_API_TOKEN
                                    ? `✓ Configured (${STRAPI_API_TOKEN.substring(0, 15)}...)`
                                    : '❌ Not configured'}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Environment:</span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                                {ENV.isDevelopment ? '🔧 Development' : '🚀 Production'}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Vercel:</span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                                {ENV.isVercel ? `✓ Yes (${ENV.vercelEnv})` : '✗ No'}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Test Without Auth */}
                {noAuthResult && (
                    <div className={`p-6 border rounded-lg space-y-3 ${noAuthResult.ok
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                        }`}>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            {noAuthResult.ok ? '✅' : '❌'}
                            Test WITHOUT Authentication
                        </h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <code className={`px-2 py-1 rounded text-xs ${noAuthResult.ok
                                        ? 'bg-green-600 text-white'
                                        : 'bg-red-600 text-white'
                                    }`}>
                                    {noAuthResult.status}
                                </code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Success:</span>
                                <span>{noAuthResult.ok ? '✓ Yes' : '✗ No'}</span>
                            </div>
                            {noAuthResult.ok && noAuthResult.data && (
                                <div className="mt-3">
                                    <span className="font-medium">Articles found:</span>
                                    <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">
                                        {noAuthResult.data.data?.length || 0}
                                    </code>
                                </div>
                            )}
                            {!noAuthResult.ok && (
                                <div className="mt-3">
                                    <span className="font-medium text-red-600 dark:text-red-400">Error:</span>
                                    <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
                                        {noAuthResult.error}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Test With Auth */}
                {withAuthResult && (
                    <div className={`p-6 border rounded-lg space-y-3 ${withAuthResult.ok
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                        }`}>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            {withAuthResult.ok ? '✅' : '❌'}
                            Test WITH Authentication
                        </h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <code className={`px-2 py-1 rounded text-xs ${withAuthResult.ok
                                        ? 'bg-green-600 text-white'
                                        : 'bg-red-600 text-white'
                                    }`}>
                                    {withAuthResult.status}
                                </code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Success:</span>
                                <span>{withAuthResult.ok ? '✓ Yes' : '✗ No'}</span>
                            </div>
                            {withAuthResult.ok && withAuthResult.data && (
                                <div className="mt-3">
                                    <span className="font-medium">Articles found:</span>
                                    <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">
                                        {withAuthResult.data.data?.length || 0}
                                    </code>
                                </div>
                            )}
                            {!withAuthResult.ok && (
                                <div className="mt-3">
                                    <span className="font-medium text-red-600 dark:text-red-400">Error:</span>
                                    <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
                                        {withAuthResult.error}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* No Token Warning */}
                {!STRAPI_API_TOKEN && (
                    <div className="p-4 border border-yellow-500/50 rounded-lg bg-yellow-500/10">
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                            ⚠️ API Token no configurado
                        </h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                            Si la conexión sin autenticación falla, necesitas configurar un token de Strapi.
                        </p>
                        <ol className="text-sm space-y-1 text-yellow-700 dark:text-yellow-300 ml-4 list-decimal">
                            <li>Abre Strapi Admin: <code className="bg-yellow-200/50 px-1 rounded">http://localhost:1337/admin</code></li>
                            <li>Ve a Settings → API Tokens</li>
                            <li>Crea un nuevo token (Read-only o Full access)</li>
                            <li>Copia el token</li>
                            <li>Agrégalo a tu <code className="bg-yellow-200/50 px-1 rounded">.env.local</code>:</li>
                        </ol>
                        <pre className="mt-3 p-3 bg-yellow-200/30 rounded text-xs">
STRAPI_API_TOKEN=tu_token_aqui
                        </pre>
                    </div>
                )}

                {/* Recommendations */}
                <div className="p-4 border rounded-lg bg-card">
                    <h3 className="font-semibold mb-2">💡 Recomendaciones</h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>✓ Si la prueba <strong>sin autenticación</strong> funciona: no necesitas token en desarrollo</li>
                        <li>✓ Si la prueba <strong>con autenticación</strong> funciona: tu token está correctamente configurado</li>
                        <li>⚠️ Si ambas fallan: verifica que Strapi esté corriendo en {STRAPI_URL}</li>
                        <li>🔒 En producción, siempre usa un token con los permisos mínimos necesarios</li>
                    </ul>
                </div>

                {/* Environment Details */}
                <div className="p-4 border rounded-lg bg-card">
                    <h3 className="font-semibold mb-2">🔍 Detalles del Entorno</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">NODE_ENV:</span>
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">
                                {process.env.NODE_ENV}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Is Production:</span>
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">
                                {ENV.isProduction ? '✓' : '✗'}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Is Development:</span>
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">
                                {ENV.isDevelopment ? '✓' : '✗'}
                            </code>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Is Vercel:</span>
                            <code className="bg-muted px-2 py-0.5 rounded text-xs">
                                {ENV.isVercel ? '✓' : '✗'}
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export const metadata = {
    title: "Strapi Connection Test | MálagaPets",
    robots: {
        index: false,
        follow: false,
    },
};

// Don't cache this page
export const dynamic = 'force-dynamic';