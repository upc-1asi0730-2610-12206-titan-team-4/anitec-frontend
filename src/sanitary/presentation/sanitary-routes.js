const healthList = () => import('./views/health-list.vue');

const healthForm = () => import('./views/health-form.vue');

const sanitaryRoutes = [
    { path: 'health-events', name: 'sanitary-health-events', component: healthList, meta: { title: 'Gestion sanitaria', roles: ['rancher', 'veterinarian'] } },
    { path: 'health-events/new', name: 'sanitary-health-event-new', component: healthForm, meta: { title: 'Nuevo evento sanitario', roles: ['rancher', 'veterinarian'] } },
    { path: 'health-events/:id/edit', name: 'sanitary-health-event-edit', component: healthForm, meta: { title: 'Editar evento sanitario', roles: ['rancher', 'veterinarian'] } }
];

export default sanitaryRoutes;
