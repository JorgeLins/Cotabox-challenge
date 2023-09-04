import {createRouter , createWebHashHistory} from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProjectPage from '../views/ProjectPage.vue'


const routes = [
  {
    path: '/',
    name:'home',
    component: HomePage
  },
  {
    path: '/project',
    name:'project',
    component: ProjectPage
  },
  {
    path: '/register',
    name:'register',
    component: RegisterPage
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

