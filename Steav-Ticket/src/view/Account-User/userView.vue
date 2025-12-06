<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-circle">🚌</div>
        <h2>Khmer<span class="highlight">Bus</span></h2>
      </div>

      <nav class="nav-menu">
        <div
          class="nav-item"
          :class="{ active: currentRouteName === 'seatBooking' }"
          @click="goTo('seatBooking')"
        >
          <span class="icon">🎫</span>
          <span class="label">Book Seat</span>
        </div>

        <div
          class="nav-item"
          :class="{ active: currentRouteName === 'payment' }"
          @click="goTo('payment')"
        >
          <span class="icon">💳</span>
          <span class="label">Payments</span>
        </div>

        <div class="nav-item disabled">
          <span class="icon">🕒</span>
          <span class="label">History</span>
        </div>
      </nav>

      <div class="user-profile">
        <div class="avatar">S</div>
        <div class="user-info">
          <span class="name">Sereyvath</span>
          <span class="role">Passenger</span>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-bar">
        <div class="welcome-text">
          <h1>Hello, Sereyvath! 👋</h1>
          <p>Ready for your next trip to Siem Reap?</p>
        </div>
        <button class="logout-btn">Log Out</button>
      </header>

      <div class="content-window">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Check current route to highlight the sidebar menu
const currentRouteName = computed(() => {
  // Assuming your route names are 'seatBooking' and 'payment'
  // You might need to adjust based on your actual router config path
  if (route.path.includes('seatBooking')) return 'seatBooking'
  if (route.path.includes('payment')) return 'payment'
  return ''
})

function goTo(page: string) {
  router.push(`/user/${page}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

/* Main Layout Wrapper */
.app-container {
  display: flex;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

/* --- SIDEBAR --- */
.sidebar {
  width: 260px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-right: 1px solid #e1e4e8;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.02);
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 50px;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
}

.brand h2 {
  font-size: 1.4rem;
  color: #2d3436;
  margin: 0;
}
.highlight {
  color: #764ba2;
}

/* Navigation */
.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  border-radius: 12px;
  color: #636e72;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:hover:not(.disabled) {
  background-color: #f8f9fa;
  color: #764ba2;
  transform: translateX(5px);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);
}

.nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  font-size: 1.2rem;
}

/* User Profile at Bottom */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #f1f2f6;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #ffeaa7;
  color: #fdcb6e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-info {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3436;
}
.role {
  font-size: 0.75rem;
  color: #b2bec3;
}

/* --- MAIN CONTENT --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Top Header */
.top-bar {
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text h1 {
  font-size: 1.8rem;
  color: #2d3436;
  margin: 0;
}
.welcome-text p {
  color: #a4b0be;
  margin: 5px 0 0;
}

.logout-btn {
  padding: 8px 20px;
  border: 1px solid #dfe6e9;
  background: transparent;
  border-radius: 20px;
  color: #636e72;
  cursor: pointer;
  transition: all 0.2s;
}
.logout-btn:hover {
  border-color: #ff7675;
  color: #ff7675;
}

/* Router View Container */
.content-window {
  flex: 1;
  margin: 0 40px 40px 40px; /* Margins around the inner content */
  /* This ensures the inner content (booking/payment) doesn't stretch weirdly */
  overflow-y: auto;
  position: relative;
}

/* --- TRANSITIONS --- */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  }
  .nav-menu {
    flex-direction: row;
    justify-content: center;
  }
  .nav-item .label {
    display: none;
  } /* Hide text on mobile, show icons */
  .brand h2,
  .user-profile {
    display: none;
  }
  .content-window {
    margin: 10px;
  }
  .top-bar {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
