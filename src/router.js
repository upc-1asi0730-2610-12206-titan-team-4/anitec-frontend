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

const iotDashboard = () =>
    import("./devices/presentation/views/iot-dashboard.vue");

const deviceForm = () => import("./devices/presentation/views/device-form.vue");

const subscriptionPlans = () =>
    import("./subscriptions/presentation/views/subscription-plans.vue");

const subscriptionSuccess = () =>
    import("./subscriptions/presentation/views/subscription-success.vue");

const subscriptionCancel = () =>
    import("./subscriptions/presentation/views/subscription-cancel.vue");

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
        path: "/iot",
        name: "iot-dashboard",
        component: iotDashboard,
        meta: {
            title: "Dispositivos IoT",
            titleKey: "iot.title",
            roles: ["rancher", "veterinarian"],
        },
    },
    {
        path: "/iot/new",
        name: "iot-device-new",
        component: deviceForm,
        meta: {
            title: "Nuevo dispositivo IoT",
            titleKey: "iot.newTitle",
            roles: ["rancher"],
        },
    },
    {
        path: "/iot/:id/edit",
        name: "iot-device-edit",
        component: deviceForm,
        meta: {
            title: "Editar dispositivo IoT",
            titleKey: "iot.editTitle",
            roles: ["rancher"],
        },
    },
    {
        path: "/subscriptions",
        name: "subscription-plans",
        component: subscriptionPlans,
        meta: {
            title: "Planes y pagos",
            titleKey: "subscriptions.title",
            roles: ["rancher", "veterinarian"],
        },
    },
    {
        path: "/subscriptions/success",
        name: "subscription-success",
        component: subscriptionSuccess,
        meta: {
            title: "Pago confirmado",
            titleKey: "subscriptions.successTitle",
            roles: ["rancher", "veterinarian"],
        },
    },
    {
        path: "/subscriptions/cancel",
        name: "subscription-cancel",
        component: subscriptionCancel,
        meta: {
            title: "Pago cancelado",
            titleKey: "subscriptions.cancelTitle",
            roles: ["rancher", "veterinarian"],
        },
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
    if (role === "veterinarian") return "veterinarian-dashboard";
    return "iam-sign-in";
};

router.beforeEach((to, from, next) => {
    const iamStore = useIamStore();
    const isPublic = to.meta.public;
    const allowedRoles = to.meta.roles;

    if (
        (to.name === "iam-sign-in" || to.name === "iam-sign-up") &&
        iamStore.isSignedIn
    ) {
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
