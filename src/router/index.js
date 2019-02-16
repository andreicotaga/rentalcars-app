import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/Main.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Main Page',
            component: Main,
        },
        { path: '*', redirect: '/' }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router
