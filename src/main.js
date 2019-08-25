import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
import VueRouter from 'vue-router'
import TableComponent from "@/components/TableComponent"
import AuthorizationComponent from "@/components/AuthorizationComponent"
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(VueRouter)
Vue.use(VueNativeSock, 'ws://localhost:3000',
    {
        connectManually: true,
    }
)
const routes = [
    {
        path: '/',
        name: 'table',
        component: TableComponent,
        beforeEnter: async function (to, from, next) {
            try {
                await axios.get('http://localhost:3000/session', {withCredentials: true})
                next()
            } catch (e) {
                if (to.path!=='auth')
                    next({name: 'auth'})
                else
                    next()
            }
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthorizationComponent,
        beforeEnter: async function (to, from, next) {
            try {
                await axios.get('http://localhost:3000/session', {withCredentials: true})
                next({name: 'table'})
            } catch (e) {
                next()
            }

        }
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
