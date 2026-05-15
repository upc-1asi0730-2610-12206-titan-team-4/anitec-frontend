const activitiesList = () => import("./views/activities-list.vue");

const activityForm = () => import("./views/activity-form.vue");

const activitiesRoutes = [
    {
        path: "calendar",
        name: "activities-calendar",
        component: activitiesList,
        meta: {
            title: "Calendario y actividades",
            roles: ["rancher", "veterinarian"],
        },
    },
    {
        path: "calendar/new",
        name: "activity-new",
        component: activityForm,
        meta: { title: "Nueva actividad", roles: ["rancher", "veterinarian"] },
    },
    {
        path: "calendar/:id/edit",
        name: "activity-edit",
        component: activityForm,
        meta: { title: "Editar actividad", roles: ["rancher", "veterinarian"] },
    },
];

export default activitiesRoutes;
