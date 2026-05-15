import { createRouter, createWebHistory } from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import livestockRoutes from "./livestock/presentation/livestock-routes.js";
import sanitaryRoutes from "./sanitary/presentation/sanitary-routes.js";
import financialRoutes from "./financial/presentation/financial-routes.js";
import activitiesRoutes from "./activities/presentation/activities-routes.js";
import analyticsRoutes from "./analytics/presentation/analytics-routes.js";
import iamRoutes from "./iam/presentation/iam-routes.js";
import useIamStore from "./iam/application/iam.store.js";

const about = () => import("./shared/presentation/views/about.vue");

const rancherDashboard = () =>
    import("./shared/presentation/views/rancher-dashboard.vue");

const veterinarianDashboard = () =>
    import("./shared/presentation/views/veterinarian-dashboard.vue");

const veterinaryClients = () =>
    import("./shared/presentation/views/veterinary-clients.vue");

const veterinaryAddClient = () =>
    import("./shared/presentation/views/veterinary-add-client.vue");

const veterinaryPatients = () =>
    import("./shared/presentation/views/veterinary-patients.vue");

const animalClinicalHistory = () =>
    import("./shared/presentation/views/animal-clinical-history.vue");

const pageNotFound = () =>
    import("./shared/presentation/views/page-not-found.vue");

const routes = [
    { path: "/iam", name: "iam", children: iamRoutes, meta: { public: true } },
    { path: "/home", name: "home", component: Home, meta: { title: "Inicio" } },
    {
        path: "/rancher/dashboard",
        name: "rancher-dashboard",
        component: rancherDashboard,
        meta: { title: "Dashboard Ganadero", roles: ["rancher"] },
    },
    {
        path: "/veterinarian/dashboard",
        name: "veterinarian-dashboard",
        component: veterinarianDashboard,
        meta: { title: "Dashboard Veterinario", roles: ["veterinarian"] },
    },
    {
        path: "/veterinary/clients",
        name: "veterinary-clients",
        component: veterinaryClients,
        meta: { title: "Clientes asignados", roles: ["veterinarian"] },
    },
    {
        path: "/veterinary/add-client",
        name: "veterinary-add-client",
        component: veterinaryAddClient,
        meta: { title: "Agregar cliente", roles: ["veterinarian"] },
    },
    {
        path: "/veterinary/patients",
        name: "veterinary-patients",
        component: veterinaryPatients,
        meta: { title: "Pacientes por ganadero", roles: ["veterinarian"] },
    },
    {
        path: "/veterinary/animals/:id/clinical-history",
        name: "animal-clinical-history",
        component: animalClinicalHistory,
        meta: { title: "Historial clinico", roles: ["veterinarian"] },
    },
    {
        path: "/livestock",
        name: "livestock",
        children: livestockRoutes,
        meta: { roles: ["rancher", "veterinarian"] },
    },
    {
        path: "/sanitary",
        name: "sanitary",
        children: sanitaryRoutes,
        meta: { roles: ["rancher", "veterinarian"] },
    },
    {
        path: "/financial",
        name: "financial",
        children: financialRoutes,
        meta: { roles: ["rancher"] },
    },
    {
        path: "/activities",
        name: "activities",
        children: activitiesRoutes,
        meta: { roles: ["rancher", "veterinarian"] },
    },
    {
        path: "/analytics",
        name: "analytics",
        children: analyticsRoutes,
        meta: { roles: ["rancher", "veterinarian"] },
    },
    {
        path: "/about",
        name: "about",
        component: about,
        meta: { title: "Acerca de" },
    },
    { path: "/", redirect: "/iam/sign-in" },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: pageNotFound,
        meta: { title: "Pagina no encontrada", public: true },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const dashboardByRole = (role) => {
    if (role === "rancher") return "rancher-dashboard";
    return "veterinarian-dashboard";
};

router.beforeEach((to, from, next) => {
    const iamStore = useIamStore();
    const isPublic = to.meta.public;
    const allowedRoles = to.meta.roles;

    if (to.name === "iam-sign-in" && iamStore.isSignedIn) {
        return next({ name: dashboardByRole(iamStore.currentRole) });
    }

    if (!isPublic && !iamStore.isSignedIn) {
        return next({ name: "iam-sign-in" });
    }

    if (allowedRoles && !allowedRoles.includes(iamStore.currentRole)) {
        return next({ name: dashboardByRole(iamStore.currentRole) });
    }

    let pageTitle = "Web App";

    if (to.meta["title"]) {
        pageTitle = to.meta["title"];
    }

    document.title = `AniTec - ${pageTitle}`;
    return next();
});

export default router;
