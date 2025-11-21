// backend/src/api/article/controllers/article.ts
import { factories } from "@strapi/strapi";
import type { Core } from "@strapi/strapi";

// ============================================
// TIPOS
// ============================================
interface PaginationParams {
    page?: string | number;
    pageSize?: string | number;
}

interface ArticleFilters {
    publishedAt?: { $notNull: boolean };
    slug?: string;
    category?: { id: string | number };
    author?: { id: string | number };
    [key: string]: any;
}

// ============================================
// CONFIGURACIÓN CENTRALIZADA
// ============================================
const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_LOCALE = "es";

/**
 * Populate por defecto para listados (SIN bloques)
 */
const DEFAULT_POPULATE = {
    cover: true,
    author: {
        populate: {
            avatar: true,
        },
    },
    category: true,
    tags: true,
};

/**
 * ✅ POPULATE COMPLETO PARA DETALLE CON BLOQUES
 * Estructura correcta para Strapi v5 Document Service
 */
const DETAILED_POPULATE = {
    cover: true,
    author: {
        populate: {
            avatar: true
        }
    },
    category: true,
    tags: true,
    readingTime: true,
    blocks: {
        on: {
            'shared.media': {
                populate: {
                    file: true
                }
            },
            'shared.slider': {
                populate: {
                    files: true
                }
            },
            'shared.quote': true,
            'shared.rich-text': true,
            'shared.seo': {
                populate: {
                    shareImage: true
                }
            }
        }
    }
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

async function enrichArticlesWithAuthors(
    strapi: Core.Strapi,
    articles: any[]
): Promise<any[]> {
    if (!articles || articles.length === 0) return [];

    const authorIds = [
        ...new Set(
            articles
                .filter((article) => article.author?.id)
                .map((article) => article.author.id)
        ),
    ];

    if (authorIds.length === 0) return articles;

    try {
        const authors = await strapi.entityService.findMany("api::author.author", {
            filters: { id: { $in: authorIds } },
            populate: { avatar: true },
        });

        const authorsMap = new Map(
            authors.map((author: any) => [author.id, author])
        );

        return articles.map((article) => {
            if (article.author?.id && authorsMap.has(article.author.id)) {
                article.author = authorsMap.get(article.author.id);
            }
            return article;
        });
    } catch (error) {
        strapi.log.error("Error enriching articles with authors:", error);
        return articles;
    }
}

function normalizePagination(pagination?: PaginationParams) {
    const page = pagination?.page ? Number(pagination.page) : 1;
    const pageSize = pagination?.pageSize
        ? Number(pagination.pageSize)
        : DEFAULT_PAGE_SIZE;

    return { page, pageSize };
}

function buildBaseQueryParams(
    filters: ArticleFilters = {},
    locale?: string | unknown,
    sort: any = { publishedAt: "desc" },
    populate: any = DEFAULT_POPULATE
) {
    return {
        filters: {
            ...filters,
            publishedAt: { $notNull: true },
        },
        sort,
        populate,
        locale: (locale as string) || DEFAULT_LOCALE,
    };
}

// ============================================
// CONTROLLER
// ============================================

export default factories.createCoreController(
    "api::article.article",
    ({ strapi }: { strapi: Core.Strapi }) => ({
        /**
         * GET /api/articles
         */
        async find(ctx) {
            const { pagination, populate, sort, filters, locale } = ctx.query;

            const { page, pageSize } = normalizePagination(
                pagination as PaginationParams
            );

            const finalPopulate = populate || DEFAULT_POPULATE;

            try {
                const queryParams = {
                    filters: {
                        ...(filters as ArticleFilters || {}),
                        publishedAt: { $notNull: true }
                    },
                    sort: sort || { publishedAt: 'desc' },
                    populate: finalPopulate,
                    locale: (locale as string) || DEFAULT_LOCALE,
                    page: page,
                    pageSize: pageSize
                };

                const { results, pagination: paginationInfo } = await strapi
                    .entityService.findPage('api::article.article', queryParams);

                const enrichedResults = await enrichArticlesWithAuthors(
                    strapi,
                    results
                );
                const sanitizedResults = await this.sanitizeOutput(
                    enrichedResults,
                    ctx
                );

                return this.transformResponse(sanitizedResults, {
                    pagination: {
                        page: paginationInfo.page,
                        pageSize: paginationInfo.pageSize,
                        pageCount: paginationInfo.pageCount,
                        total: paginationInfo.total,
                    },
                });
            } catch (error) {
                strapi.log.error("Error in find articles:", error);
                return ctx.internalServerError("Error fetching articles");
            }
        },

        /**
         * GET /api/articles/:id
         */
        async findOne(ctx) {
            const { id } = ctx.params;
            const { locale } = ctx.query;

            try {
                const entity = await strapi.documents("api::article.article").findOne({
                    documentId: id,
                    locale: (locale as string) || DEFAULT_LOCALE,
                    status: "published",
                    populate: DETAILED_POPULATE,
                });

                if (!entity) {
                    return ctx.notFound("Article not found");
                }

                const enrichedArticles = await enrichArticlesWithAuthors(strapi, [entity]);
                const sanitizedEntity = await this.sanitizeOutput(enrichedArticles[0], ctx);

                return this.transformResponse(sanitizedEntity);
            } catch (error) {
                strapi.log.error("Error in findOne article:", error);
                return ctx.internalServerError("Error fetching article");
            }
        },

        /**
         * GET /api/articles/by-slug/:slug
         */
        async findBySlug(ctx) {
            const { slug } = ctx.params;
            const { locale } = ctx.query;

            if (!slug) {
                return ctx.badRequest("Slug is required");
            }

            try {
                const entities = await strapi
                    .documents("api::article.article")
                    .findMany({
                        filters: {
                            slug: slug,
                            publishedAt: { $notNull: true },
                        },
                        locale: (locale as string) || DEFAULT_LOCALE,
                        status: "published",
                        populate: DETAILED_POPULATE,
                    });

                if (!entities || entities.length === 0) {
                    return ctx.notFound(`Article with slug "${slug}" not found`);
                }

                const enrichedArticles = await enrichArticlesWithAuthors(strapi, [entities[0]]);
                const sanitizedEntity = await this.sanitizeOutput(enrichedArticles[0], ctx);

                return this.transformResponse(sanitizedEntity);
            } catch (error) {
                strapi.log.error("Error in findBySlug:", error);
                return ctx.internalServerError("Error fetching article by slug");
            }
        },

        /**
         * GET /api/articles/by-category/:categorySlug
         */
        async findByCategory(ctx) {
            const { categorySlug } = ctx.params;
            const { page = 1, pageSize = 5, locale } = ctx.query;

            if (!categorySlug) {
                return ctx.badRequest("Category slug is required");
            }

            try {
                const categories = await strapi.entityService.findMany(
                    "api::category.category",
                    {
                        filters: { slug: categorySlug },
                        locale: (locale as string) || DEFAULT_LOCALE,
                    }
                );

                if (!categories || categories.length === 0) {
                    return ctx.notFound(`Category "${categorySlug}" not found`);
                }

                const category = categories[0];

                const { page: normalizedPage, pageSize: normalizedPageSize } =
                    normalizePagination({
                        page: page as string | number,
                        pageSize: pageSize as string | number,
                    });

                const queryParams = {
                    ...buildBaseQueryParams({ category: { id: category.id } }, locale),
                    page: normalizedPage,
                    pageSize: normalizedPageSize,
                };

                const { results, pagination } = await strapi.entityService.findPage(
                    "api::article.article",
                    queryParams
                );

                const enrichedResults = await enrichArticlesWithAuthors(
                    strapi,
                    results
                );
                const sanitizedEntities = await this.sanitizeOutput(
                    enrichedResults,
                    ctx
                );

                return this.transformResponse(sanitizedEntities, {
                    pagination: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        pageCount: pagination.pageCount,
                        total: pagination.total,
                    },
                    category,
                });
            } catch (error) {
                strapi.log.error("Error in findByCategory:", error);
                return ctx.internalServerError("Error fetching articles by category");
            }
        },

        /**
         * GET /api/articles/by-author/:authorDocumentId
         */
        async findByAuthor(ctx) {
            const { authorDocumentId } = ctx.params;
            const { page = 1, pageSize = 10, locale } = ctx.query;

            if (!authorDocumentId) {
                return ctx.badRequest("Author document ID is required");
            }

            try {
                const authors = await strapi.documents("api::author.author").findMany({
                    filters: { documentId: authorDocumentId },
                    locale: (locale as string) || DEFAULT_LOCALE,
                });

                if (!authors || authors.length === 0) {
                    return ctx.notFound(`Author with ID "${authorDocumentId}" not found`);
                }

                const author = authors[0];

                const { page: normalizedPage, pageSize: normalizedPageSize } =
                    normalizePagination({
                        page: page as string | number,
                        pageSize: pageSize as string | number,
                    });

                const queryParams = {
                    ...buildBaseQueryParams({ author: { id: author.id } }, locale),
                    page: normalizedPage,
                    pageSize: normalizedPageSize,
                };

                const { results, pagination } = await strapi.entityService.findPage(
                    "api::article.article",
                    queryParams
                );

                const enrichedResults = await enrichArticlesWithAuthors(
                    strapi,
                    results
                );
                const sanitizedEntities = await this.sanitizeOutput(
                    enrichedResults,
                    ctx
                );

                return this.transformResponse(sanitizedEntities, {
                    pagination: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        pageCount: pagination.pageCount,
                        total: pagination.total,
                    },
                    author,
                });
            } catch (error) {
                strapi.log.error("Error in findByAuthor:", error);
                return ctx.internalServerError("Error fetching articles by author");
            }
        },
    })
);