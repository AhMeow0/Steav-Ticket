import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// ============================================
// 1. USER SIDE IMPORTS (New UI)
// ============================================
import UserHome from '@/view/User-Panel/UserHome.vue'
import UserBooking from '@/component/UserBooking.vue'
import UserExplore from '@/component/UserExplore.vue'
import AboutUs from '@/component/AboutUs.vue'

// ============================================
// 2. AUTH PAGE IMPORTS
// ============================================
import LoginPage from '@/auth/Login.vue'
import SignupPage from '@/auth/SignUp.vue' 

// ============================================
// 3. ADMIN PANEL IMPORTS
// ============================================
import AdminView from '@/view/Admin-Panel/adminView.vue'
import DashBoard from '@/view/Admin-Panel/DashBoard.vue'
import ManagePromotionNew from '@/view/Admin-Panel/ManagePromotionNew.vue'
import ManageTicketPrice from '@/view/Admin-Panel/ManageTicketPrice.vue'
import ManageBookingPassager from '@/view/Admin-Panel/ManageBookingPassager.vue'
import ManageBuses from '@/view/Admin-Panel/ManangeBuses.vue'
import ManageRouteSche from '@/view/Admin-Panel/ManageRouteSche.vue'


const routes: Array<RouteRecordRaw> = [
  // ============================================
  //  USER ROUTES
  // ============================================
  { 
    path: '/', 
    redirect: '/homepage' 
  },
  { 
    path: '/homepage', 
    name: 'UserHome', 
    component: UserHome 
  },
  { 
    path: '/booking', 
    name: 'UserBooking', 
    component: UserBooking 
  },
  { 
    path: '/explore', 
    name: 'UserExplore', 
    component: UserExplore 
  },
  { 
    path: '/aboutus', 
    name: 'AboutUs', 
    component: AboutUs
  },

  // ============================================
  //  AUTH ROUTES
  // ============================================
  { 
    path: '/login', 
    name: 'LoginPage', 
    component: LoginPage 
  },
  { 
    path: '/signup', 
    name: 'SignupPage', 
    component: SignupPage 
  },

  // ============================================
  //  ADMIN ROUTES
  // ============================================
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: DashBoard },
      { path: 'manage-bus', name: 'ManageBus', component: ManageBuses },
      { path: 'manage-promotion', name: 'ManagePromotionNew', component: ManagePromotionNew },
      { path: 'manage-ticket-price', name: 'ManageTicketPrice', component: ManageTicketPrice },
      {
        path: 'manage-booking-passager',
        name: 'ManageBookingPassager',
        component: ManageBookingPassager,
      },
      { path: 'manage-route-schedules', name: 'ManageRouteSche', component: ManageRouteSche },
    ],
  },
]

const router = createRouter({
  // FIX IS HERE: Changed from import.meta.env.BASE_URL to '/'
  history: createWebHistory('/'),
  routes,
  linkActiveClass: 'active-link' // IMPORTANT: Makes the pink text work when you are on that page
})

export default router