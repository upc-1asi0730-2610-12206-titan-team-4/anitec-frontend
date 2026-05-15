const analyticsDashboard = () => import("./views/analytics-dashboard.vue");

const analyticsRoutes = [
    {
        path: "dashboard",
        name: "analytics-dashboard",
        component: analyticsDashboard,
        meta: { title: "Analiticas", roles: ["rancher", "veterinarian"] },
    },
];

export default analyticsRoutes;
