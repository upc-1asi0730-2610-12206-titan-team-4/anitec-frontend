const financialList = () => import("./views/financial-list.vue");

const financialForm = () => import("./views/financial-form.vue");

const financialRoutes = [
    {
        path: "records",
        name: "financial-records",
        component: financialList,
        meta: { title: "Gestion financiera", roles: ["rancher"] },
    },
    {
        path: "records/new",
        name: "financial-record-new",
        component: financialForm,
        meta: { title: "Nuevo movimiento", roles: ["rancher"] },
    },
    {
        path: "records/:id/edit",
        name: "financial-record-edit",
        component: financialForm,
        meta: { title: "Editar movimiento", roles: ["rancher"] },
    },
];

export default financialRoutes;
