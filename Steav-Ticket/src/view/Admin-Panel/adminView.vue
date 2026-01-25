<template>
  <div class="body">
    <aside class="sidebar">
      <h1 class="sidebar-title">Admin Panel</h1>

      <ul class="menu">
        <li v-for="(item, index) in items" :key="index">
          <router-link class="nav-link" active-class="active" :to="item.to">
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <div class="line"></div>
    <router-view class="content"></router-view>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        { label: 'Dashboard', to: '/admin/dashboard' },
        { label: 'Routes & Schedules', to: '/admin/manage-route-schedules' },
        { label: 'Ticket Price', to: '/admin/manage-ticket-price' },
        { label: 'Booking & Passager', to: '/admin/manage-booking-passager' },
        { label: 'Promotion & News', to: '/admin/manage-promotion' },
        { label: 'Buses', to: '/admin/manage-bus' },
      ],
    }
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.body {
  display: flex;
  height: 100vh;
  background: #0f172a;
  color: white;
}

.line {
  width: 1px;
  background: #1e293b;
}

.sidebar {
  width: 240px;
  background: #111827;
  padding: 30px 20px;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-title {
  font-size: 26px;
  margin-bottom: 20px;
  margin-left: 10px;
  color: #4caf50;
  font-weight: bold;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #cbd5e1;
  text-decoration: none;
  transition:
    background 0.3s,
    transform 0.2s;
  font-size: 16px;
}

.nav-link:hover {
  background: #1e293b;
  transform: scale(1.03);
}

.nav-link .icon {
  font-size: 18px;
}

.active {
  background: #4caf50;
  color: white !important;
  transform: scale(1.03);
}

.content {
  flex: 1;
  padding: 30px;
}
</style>
