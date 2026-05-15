
const signInForm = () => import('./views/sign-in-form.vue')

const iamRoutes = [
    { path: 'sign-in', name: 'iam-sign-in', component: signInForm, meta: { title: 'Sign in', public: true } }
];

export default iamRoutes;
