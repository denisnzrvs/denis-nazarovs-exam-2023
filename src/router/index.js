import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import Songs from '../views/Songs.vue';
import Album from '../views/Album.vue';
import About from '../views/About.vue';

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Songs',
            component: Songs
        },
        {
            path: '/albums',
            name: "Albums",
            component: Album
        },
        {
            path: '/about',
            name: "About",
            component: About
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!useAuthStore().is_authenticated && to.path !== '/login') {
        next('/login');
    } else if (useAuthStore().authenticated && to.path === '/login') {
        next('/');
    } else {
        next();
    }

})

export default router
