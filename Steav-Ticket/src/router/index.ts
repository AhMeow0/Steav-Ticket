import { createRouter, createWebHistory } from 'vue-router'


// ===== Auth Pages =====
import LoginPage from '@/auth/Login.vue'
import SignupPage from '@/auth/SignUp.vue' // MUST MATCH FILE NAME

// ===== Admin Panel =====
import AdminView from '@/view/Admin-Panel/adminView.vue'
import DashBoard from '@/view/Admin-Panel/DashBoard.vue'
import ManagePromotionNew from '@/view/Admin-Panel/ManagePromotionNew.vue'
import ManageTicketPrice from '@/view/Admin-Panel/ManageTicketPrice.vue'
import ManageBookingPassager from '@/view/Admin-Panel/ManageBookingPassager.vue'
import ManageBuses from '@/view/Admin-Panel/ManangeBuses.vue'
import ManageRouteSche from '@/view/Admin-Panel/ManageRouteSche.vue'
// import Authenticator from '@/auth/Login.vue'

// ===== Account Routes =====
import AccountView from '@/view/Account-User/AccountView.vue'
import ProfilePage from '@/view/Account-User/ProfilePage.vue'
import MethodPay from '@/view/Account-User/MethodPay.vue'
import path from 'path'

const routes = [
  // ===== PUBLIC ROUTES =====
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/signup', name: 'SignupPage', component: SignupPage },
  // {
  //   path: 'auth',
  //   name: 'authitication',
  //   component: Authenticator,
  //   children: [

  //   ]
  // }

  // ===== ADMIN ROUTES =====
  {
    path: '/admin',
    name: 'adminView',
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

  // ===== ACCOUNT ROUTES =====
  {
    path: '/account',
    name: 'AccountView',
    component: AccountView,
    children: [
      { path: 'profile', name: 'ProfilePage', component: ProfilePage },
      { path: 'methodpay', name: 'MethodPay', component: MethodPay },
    ],
  },


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
