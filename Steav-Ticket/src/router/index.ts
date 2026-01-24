import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// ============================================
// 1. USER SIDE IMPORTS (The Clean UI Pages)
// ============================================
import UserHome from '@/view/User-Panel/UserHome.vue'
import UserTicket from '@/component/TicketBooking.vue'
import Bookseat from '@/component/UserBookseat.vue'
import UserExplore from '@/component/UserExplore.vue'
import AboutUs from '@/component/AboutUs.vue'
import SeatSelect from '@/component/SeatSelect.vue'

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

// ============================================
// 4. ACCOUNT/USER ROUTES IMPORTS
// ============================================
import AccountView from '@/view/Account-User/AccountView.vue'
import ProfilePage from '@/view/Account-User/ProfilePage.vue'
import MethodPay from '@/view/Account-User/MethodPay.vue'
import Language from '@/view/Account-User/Language.vue'
import HelpPage from '@/view/Account-User/HelpPage.vue'

type JwtPayload = {
  sub: string
  email: string
  role?: string
  exp?: number
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const base64Url = parts[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const json = atob(padded)
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

const routes: Array<RouteRecordRaw> = [
  // ============================================
  //  USER ROUTES (Public)
  // ============================================
  {
    path: '/',
    redirect: '/homepage',
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/component/Checkout.vue'),
  },

  {
    path: '/seat-select',
    name: 'seat-select',
    component: SeatSelect,
  },

  {
    path: '/homepage',
    name: 'UserHome',
    component: UserHome,
  },
  {
    path: '/booking',
    name: 'UserTicket',
    component: UserTicket,
  },
  {
    path: '/bookseat',
    name: 'UserBookseat',
    component: Bookseat,
  },
  {
    path: '/explore',
    name: 'UserExplore',
    component: UserExplore,
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
  },

  // AUTH ROUTES
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/auth/ForgotPassword.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },

  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage,
  },

  // ============================================
  //  ADMIN ROUTES (Protected)
  // ============================================
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    meta: { requiresAdmin: true },
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

  // ============================================
  //  ACCOUNT ROUTES
  // ============================================
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
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  // This class makes the active link (like "Home" or "Explore") turn Pink automatically
  linkActiveClass: 'active-link',
})

router.beforeEach((to) => {
  const needsAdmin = to.matched.some((r) => Boolean(r.meta?.requiresAdmin))
  if (!needsAdmin) return true

  const token = localStorage.getItem('access_token')
  if (!token) return { name: 'LoginPage' }

  const payload = parseJwt(token)
  if (payload?.exp && Date.now() >= payload.exp * 1000) {
    localStorage.removeItem('access_token')
    return { name: 'LoginPage' }
  }
  if (!payload?.role || payload.role !== 'admin') {
    return { name: 'UserHome' }
  }

  return true
})

export default router
