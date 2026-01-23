<template>
  <header ref="headerEl" class="head-bar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="container header-content">
      <!-- Logo -->
      <router-link to="/homepage" class="logo">
        <h2 class="logo-text">Steav-Ticket</h2>
      </router-link>

      <!-- Navigation -->
      <nav class="nav-links">
        <router-link to="/homepage">Home</router-link>
        <router-link to="/booking">Ticket</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/aboutus">About Us</router-link>
      </nav>

      <!-- Auth / User -->
      <div class="auth-action">
        <div v-if="user" class="user-profile">
          <span class="welcome">Hi, {{ user.name || user.email.split('@')[0] }}</span>
          <img src="../assets/img/avatar.png" alt="Profile" class="avatar" />
          <button @click="logout" class="logout-btn">Logout</button>
        </div>

        <router-link v-else to="/login" class="login-btn">
          Login / Sign Up
          <span class="ticket-icon">🎫</span>
        </router-link>
      </div>

      <!-- Mobile Menu Button (optional - add later if needed) -->
      <!-- <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref<any>(null)
const headerEl = ref<HTMLElement | null>(null)
const isHidden = ref(false)
const isScrolled = ref(false)

let lastScrollY = 0
let ticking = false

onMounted(async () => {
  await nextTick()

  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      const res = await fetch('http://localhost:3000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        user.value = await res.json()
      } else {
        localStorage.removeItem('access_token')
      }
    } catch (err) {
      console.error('Profile fetch failed', err)
    }
  }

  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const current = window.scrollY

      // Hide when scrolling down past header height
      isHidden.value = current > lastScrollY && current > 120

      // Add scrolled class when past 50px
      isScrolled.value = current > 50

      lastScrollY = current
      ticking = false
    })
    ticking = true
  }
}

function logout() {
  localStorage.removeItem('access_token')
  user.value = null
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

.head-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
}

.head-bar.scrolled {
  padding: 0.9rem 0;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 6px 35px rgba(0, 0, 0, 0.12);
}

.head-bar.hidden {
  transform: translateY(-100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.1rem;
  color: #111;
  letter-spacing: -0.6px;
  margin: 0;
  transition: color 0.3s;
}

.logo-text:hover {
  color: #f54e75;
}

/* Navigation */
.nav-links {
  display: flex;
  gap: 3.2rem;
}

.nav-links a {
  position: relative;
  color: #2d2d2d;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.6rem 0;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #f54e75;
}

.nav-links a.router-link-active::after,
.nav-links a:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #f54e75;
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Auth area */
.auth-action {
  display: flex;
  align-items: center;
  gap: 1.8rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.welcome {
  font-weight: 500;
  color: #444;
  font-size: 1.05rem;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2.5px solid #f54e75;
  object-fit: cover;
  box-shadow: 0 3px 12px rgba(245, 78, 117, 0.18);
}

.logout-btn {
  background: transparent;
  border: 2px solid #f54e75;
  color: #f54e75;
  font-weight: 600;
  padding: 0.55rem 1.4rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #f54e75;
  color: white;
}

/* Login button */
.login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f54e75;
  color: white;
  padding: 0.85rem 2.1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(245, 78, 117, 0.28);
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #ef3768;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(245, 78, 117, 0.38);
}

.ticket-icon {
  font-size: 1.35rem;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .nav-links {
    gap: 2rem;
  }

  .header-content {
    height: 70px;
  }

  .logo-text {
    font-size: 1.9rem;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* You can implement hamburger menu here later */
  }

  .header-content {
    justify-content: space-between;
  }

  .login-btn,
  .logout-btn {
    padding: 0.7rem 1.4rem;
    font-size: 1rem;
  }
}
</style>
