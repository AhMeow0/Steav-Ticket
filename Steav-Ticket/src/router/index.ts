import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// ============================================
// 1. USER SIDE IMPORTS (The Clean UI Pages)
// ============================================
import UserHome from '@/view/User-Panel/UserHome.vue'
import UserBooking from '@/component/UserBooking.vue'
import UserExplore from '@/component/UserExplore.vue'
import AboutUs from '@/component/AboutUs.vue'

// ============================================
// 2. AUTH IMPORTS
// ============================================
// FIX: Ensure you have created an 'auth' folder in 'src' and moved these files there!
import LoginPage from '@/auth/Login.vue'   
import SignupPage from '@/auth/SignUp.vue' // Fixed spelling from 'anuth'

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

<<<<<<< HEAD
const routes: Array<RouteRecordRaw> = [
  // ============================================
  //  USER ROUTES (Public)
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
=======
// ===== Account/User Routes =====
import AccountView from '@/view/Account-User/AccountView.vue'
import ProfilePage from '@/view/Account-User/ProfilePage.vue'
import MethodPay from '@/view/Account-User/MethodPay.vue'
import Language from '@/view/Account-User/Language.vue'
import HelpPage from '@/view/Account-User/HelpPage.vue'


>>>>>>> b13c4250bea7258d590938cc7c5eae348ed0c60f

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
  //  ADMIN ROUTES (Protected)
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
<<<<<<< HEAD
=======

  // ===== ACCOUNT ROUTES =====
  {
    path: '/account',
    name: 'AccountView',
    component: AccountView,
    children: [
      { path: 'profile', name: 'ProfilePage', component: ProfilePage },
      { path: 'methodpay', name: 'MethodPay', component: MethodPay },
      { path: 'language', name: 'Language', component: Language },
      { path: 'help', name: 'HelpPage', component: HelpPage },
      
    ],
  },
>>>>>>> b13c4250bea7258d590938cc7c5eae348ed0c60f
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  // This class makes the active link (like "Home" or "Explore") turn Pink automatically
  linkActiveClass: 'active-link' 
})

export default router