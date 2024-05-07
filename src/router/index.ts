import { createWebHashHistory, createRouter } from 'vue-router';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            redirect: { name: 'main' },
        },
        {
            name: 'main',
            path: '/main',
            component: () => import('@/views/test.vue'),
        }
    ],
});
