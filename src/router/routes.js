import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const persons = () => import('../components/persons.vue')
const person = () => import('../components/person-card.vue')

const routes = [
    {
        name: 'home',
        path: '/',
        component: persons
    },{
        name: 'person',
        path: '/user/:id',
        component: person
    }
]

const router = new VueRouter({
    routes
})

export default router
