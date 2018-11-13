import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import RoomView from './views/RoomView.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/:roomId',
            name: 'room',
            component: RoomView
        }
    ]
})
