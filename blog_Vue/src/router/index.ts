import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import UnauthorizedComponent from '@/components/UnauthorizedComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*', // This catches all undefined routes
      name: 'NotFound',
      component: PageNotFound
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,meta:{requiresAuth:true}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),meta:{requiresAuth:true}
    },
    {
      path:'/settings',
      name:'settings',
      component:()=>import('../views/SettingsView.vue'),meta:{requiresAuth:true}
    },{
      path:'/ourPosts',
      name:'ourPosts',
      component:()=>import('../views/OurPosts.vue'),meta:{requiresAuth:true}
    },
    {
      path:'/form',
      name:'form',
      component:()=>import('../views/AddBlogView.vue'),meta:{requiresAuth:true}
    },
    {
      path:'/login',
    name:'login',
    component:()=>import('../views/LoginView.vue')
    },{
      path:'/register',
      name:'register',
      component:()=>import('../views/RegisterView.vue'),
    },{
      path:'/Unauthorized',
      name:'Unauthorized',
      component:UnauthorizedComponent
    }

  ]
}
)
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')  
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/Unauthorized');
  } else {
    next();
  }})

export default router
