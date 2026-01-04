import {
    index,
    layout,
    route,
    type RouteConfig,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("routes/guestOnly.tsx", [
        route("login", "routes/logIn.tsx"),
        route("signup", "routes/signUp.tsx"),
    ]),
    // layout
    layout("routes/dashboard/protected.tsx", [
        layout("routes/dashboard/dashboardLayout.tsx", [
            route("dashboard", "routes/dashboard/dashboard.tsx"),
            route("products", "routes/products.tsx"),

            route("invoices", "routes/invoices/invoices.tsx"),

            route("invoices/new", "routes/invoices/newInvoice.tsx", {
                id: "invoice-new",
            }),

            route("invoices/edit/:id", "routes/invoices/newInvoice.tsx", {
                id: "invoice-edit",
            }),

            route("invoices/:id", "routes/invoices/invoice.tsx"),

            route("profile", "routes/profile.tsx"),

            route("customers", "routes/customers.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
