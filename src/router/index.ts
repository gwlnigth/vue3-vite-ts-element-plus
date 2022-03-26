import { createRouter, createWebHistory} from 'vue-router'

export default createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'Home',
                // component: ()=> import('../views/Home/index.vue')
                component: ()=> import('views/Home/index.vue')
            },
            // 登录
            {
                path: '/login',
                name: 'login',
                component: ()=> import('views/Login/LoginRegister.vue')
            },
            // 错误
            {
                path: '/:catchAll(.*)', // 当所有路由找不到的时候会执行这个页面
                name: 'Error',
                component: ()=> import('views/Error/index.vue')
            },
            //
            {
                path: '/forgotpassword', // 当所有路由找不到的时候会执行这个页面
                name: 'Forgotpassword',
                component: ()=> import('views/Forgotpassword/Forgotpassword.vue')
            },

            {
                path: '/resetpassword/:id', // 当所有路由找不到的时候会执行这个页面
                name: 'resetpassword',
                component: ()=> import('views/ResetPassword/index.vue')
            },

        ]
    }
)