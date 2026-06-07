import {
    index,
    layout,
    route,
    type RouteConfig,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("public/:invoiceToken", "routes/invoices/publicInvoice.tsx"),
    route("*", "routes/notFound.tsx"), // ✅ 404
    layout("routes/guestOnly.tsx", [
        route("login", "routes/logIn.tsx"),
        route("signup", "routes/signUp.tsx"),
        route("demo", "routes/demoInvoice.tsx"),
        route("demo-invoice/preview", "routes/demoInvoicePreview.tsx"),
    ]),
    // layout
    layout("routes/dashboard/protected.tsx", [
        layout("routes/dashboard/dashboardLayout.tsx", [
            route("dashboard", "routes/dashboard/dashboard.tsx"),
            route("products", "routes/products.tsx"),

            route("invoices", "routes/invoices/invoices.tsx"),

            route("invoices/new", "routes/invoices/newInvoice.tsx"),

            route("invoices/edit/:id", "routes/invoices/editInvoice.tsx"),

            route("invoices/:id", "routes/invoices/invoice.tsx"),

            route("profile", "routes/profile.tsx"),

            route("customers", "routes/customers.tsx"),
            
        ]),
    ]),
] satisfies RouteConfig;
