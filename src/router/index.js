import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import TableBooking from '../views/TableBooking'
import MainLk from '../views/MainLk'
import Profile from '../views/Profile'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/booking',
    name: 'Booking',
    component: TableBooking
  },
  {
    path:'/mainlk',
    name: 'Mainlk',
    component: MainLk
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    // path: '/about',
    // name: 'About',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
