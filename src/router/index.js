import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import HomePage from '../components/HomePage.vue'
import Home from '../components/Home.vue'
import forget from "../components/forget.vue"
import register from "../components/register.vue"
import Message from "../components/Message.vue"
import QuestionList from "../components/QuestionList.vue"
import PublishQuestion from "../components/PublishQuestion.vue"
import Answer from "../components/Answer.vue"
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
                path: "/Message",
                name: "Message",
                component: Message,
            }, {
                path: "/QuestionList",
                name: "QuestionList",
                component: QuestionList,
            },
            {
                path: "/PublishQuestion",
                name: "PublishQuestion",
                component: PublishQuestion,
            },
            {
                path: "/Answer",
                name: "Answer",
                component: Answer,
            },
        ]
    },
    {
        path: "/forget",
        name: "forget",
        component: forget,
    },
    {
        path: "/register",
        name: "register",
        component: register,
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token");
    if (to.path === "/") {
        next();
    } else if (to.path === "/register") {
        next();
    } else if (to.path === "/forget") {
        next();
    } else if (!token) {
        next("/");
    } else {
        next();
    }
});
export default router