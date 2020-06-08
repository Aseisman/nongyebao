import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import HomePage from '../components/HomePage.vue'
import Home from '../components/Home.vue'
import UserList from '../components/UserManagement/UserList.vue'
import Access from "../components/Access/Access.vue"
import RecordList from "../components/RecordManagement/RecordList.vue"
import AdminList from "../components/AdminManagement/AdminList.vue"
import AdminAdd from "../components/AdminManagement/AdminAdd.vue"
import AdminChange from "../components/AdminManagement/AdminChange.vue"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: "/HomePage",
        name: "HomePage",
        component: HomePage,
        redirect: "/Home",
        children: [{
                path: "/Home",
                name: "Home",
                component: Home,
            },
            {
                path: "/UserList",
                name: "UserList",
                component: UserList,
            },
            {
                path: "/Access",
                name: "Access",
                component: Access,
            },
            {
                path: "/RecordList",
                name: "RecordList",
                component: RecordList,
            },
            {
                path: "/AdminList",
                name: "AdminList",
                component: AdminList,
            },
            {
                path: "/AdminAdd",
                name: "AdminAdd",
                component: AdminAdd,
            },
            {
                path: "/AdminChange",
                name: "AdminChange",
                component: AdminChange,
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router