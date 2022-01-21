import IRoute from "../interface/route.interface";
import SignUpPage from "../auth/signup";
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
        component: SignUpPage,
        name: 'Login Page',
        protected: true
    },

];
export default routes;