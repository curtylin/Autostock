import IRoute from "../interfaces/route.interface";
import signUp from "../pages/auth/signUp";
import index from "../pages/index";

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: index,
        name: 'Home Page',
        protected: false
    },
    {
        path: '/auth/signup',
        exact: true,
        component: signUp,
        name: 'Login Page',
        protected: false
    },

];
export default routes;