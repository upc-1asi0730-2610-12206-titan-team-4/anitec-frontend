const signInForm = () => import("./views/sign-in-form.vue");
const signUpForm = () => import("./views/sign-up-form.vue");

const iamRoutes = [
    {
        path: "sign-in",
        name: "iam-sign-in",
        component: signInForm,
        meta: { title: "Sign in", public: true },
    },
    {
        path: "sign-up",
        name: "iam-sign-up",
        component: signUpForm,
        meta: { title: "Sign up", public: true },
    },
];

export default iamRoutes;
