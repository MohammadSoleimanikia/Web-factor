import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("invoice/:invoiceId", "routes/invoice.tsx"),

    // layout
    layout("routes/protected.tsx", [
        layout("routes/dashboardLayout.tsx", [
            route("dashboard", "routes/dashboard.tsx"),
        ]),
    ]),
    route("login","routes/logIn.tsx"),
    route("signup","routes/signUp.tsx")
] satisfies RouteConfig;
