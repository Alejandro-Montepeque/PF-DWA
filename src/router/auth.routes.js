import AuthLayout from "@/layouts/AuthLayout.vue";

import LoginView from "@/views/auth/LoginView.vue";

export default {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    children:[
        {
            path: '',
            name: 'Login',
            component: LoginView
        }
    ]
}
