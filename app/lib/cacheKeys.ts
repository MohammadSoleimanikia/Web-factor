/**
 * Cache keys for API endpoints
 * These keys are used to store and retrieve cached data from the store
 */
export const CACHE_KEYS = {
    // Invoices (فاکتورها)
    INVOICES_LIST: "/user/invoices/",
    INVOICES_DETAIL: (id: string | number) => `/user/invoices/${id}/`,

    // Products (محصولات)
    PRODUCTS_LIST: "/user/products/",
    PRODUCTS_DETAIL: (id: string | number) => `/user/products/${id}/`,

    // User Profile (پروفایل)
    ACCOUNT_PROFILE: "/account/profile/",

    // Dashboard (داشبورد)
    DASHBOARD: "/user/dashboard/",

    // Public Invoice (فاکتور عمومی)
    PUBLIC_INVOICE: (token: string) => `/api/public/invoices/${token}/`,
} as const;

/**
 * Cache invalidation mapping
 * Defines which cache keys should be invalidated when specific CRUD operations occur
 * Example: When an invoice is created, both INVOICES_LIST and DASHBOARD caches are cleared
 */
export const INVALIDATION_MAP = {
    // Invoice operations (هنگام اضافه/ویرایش/حذف فاکتور)
    POST_INVOICE: [CACHE_KEYS.INVOICES_LIST, CACHE_KEYS.DASHBOARD],
    PUT_INVOICE: [CACHE_KEYS.INVOICES_LIST, CACHE_KEYS.DASHBOARD],
    DELETE_INVOICE: [CACHE_KEYS.INVOICES_LIST, CACHE_KEYS.DASHBOARD],

    // Product operations (هنگام اضافه/ویرایش/حذف محصول)
    POST_PRODUCT: [CACHE_KEYS.PRODUCTS_LIST, CACHE_KEYS.DASHBOARD],
    PUT_PRODUCT: [CACHE_KEYS.PRODUCTS_LIST, CACHE_KEYS.DASHBOARD],
    DELETE_PRODUCT: [CACHE_KEYS.PRODUCTS_LIST, CACHE_KEYS.DASHBOARD],

    // Profile update operations (هنگام ویرایش پروفایل)
    PUT_PROFILE: [CACHE_KEYS.ACCOUNT_PROFILE, CACHE_KEYS.DASHBOARD],
} as const;
