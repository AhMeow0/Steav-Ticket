import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/view/Admin-Panel/adminView.vue'
import DashBoard from '@/view/Admin-Panel/DashBoard.vue'
import ManagePromotionNew from '@/view/Admin-Panel/ManagePromotionNew.vue'
import ManageTicketPrice from '@/view/Admin-Panel/ManageTicketPrice.vue'
import ManageBookingPassager from '@/view/Admin-Panel/ManageBookingPassager.vue'
import ManageBuses from '@/view/Admin-Panel/ManangeBuses.vue'
import ManageRouteScheduls from '@/view/Admin-Panel/ManageRouteSche.vue'
const routes = [
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: DashBoard },
      { path: 'manage-bus', name: 'ManageBus', component: ManageBuses },
      { path: 'manage-promotion', name: 'ManagePromotionNew', component: ManagePromotionNew },
      { path: 'manage-ticket-price', name: 'ManageTicketPrice', component: ManageTicketPrice },
      { path: 'manage-booking-passager',name: 'ManageBookingPassager',component: ManageBookingPassager},
      { path: 'manage-route-schedules',name: 'ManageRouteScheduls',component: ManageRouteScheduls},
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})
export default router
