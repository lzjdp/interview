import Layout from '../views/layout'

const routes = [
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/login',
                name: 'login',
                meta: {
                    title: '登陆'
                },
                component: () => import('@/views/login/index')
            },
            {
                path: '/register',
                name: 'register',
                meta: {
                    title: '注册'
                },
                component: () => import('@/views/register')
            },
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '面试题'
                },
                component: () => import('../views/home')
            },
            {
                path: '/problems',
                name: 'problems',
                meta: {
                    title: '问题'
                },
                component: () => import('../views/problems')
            },
            {
                path: '/detailed',
                name: 'detailed',
                meta: {
                    title: ''
                },
                component: () => import('../views/detailed')
            }
        ]
    },
    {
        path: '*',
        name: '404',
        component: () => import('../views/errors/404')
    }
]

export default routes