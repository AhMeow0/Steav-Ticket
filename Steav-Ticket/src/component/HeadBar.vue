<template>
  <header class="head-bar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="header-inner">
      <router-link to="/homepage" class="logo" aria-label="Back to homepage">
        <span class="logo-text">Steav-Ticket</span>
      </router-link>

      <nav class="nav-links" aria-label="Primary navigation">
        <router-link to="/homepage" class="nav-link">Home</router-link>
        <router-link to="/booking" class="nav-link">Ticket</router-link>
        <router-link to="/explore" class="nav-link">Explore</router-link>
        <router-link to="/aboutus" class="nav-link">About Us</router-link>
      </nav>

      <div class="right-actions">

        <div v-if="user" class="user-profile">
          <span class="welcome">Hi, {{ displayName }}</span>
          <button type="button" class="avatar-btn" aria-label="Open profile" @click="goToProfile">
            <img src="../assets/img/avatar.png" alt="Profile" class="avatar" />
          </button>
          <button class="ghost-btn logout-btn" @click="logout">Logout</button>
        </div>

        <div v-else class="auth-buttons">
          <router-link to="/signup" class="ghost-btn signup-btn"
            >Sign Up</router-link
          >
          <router-link to="/login" class="cta-btn login-btn"
            >Log In</router-link
          >
        </div>

        <button
          class="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-nav"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="mobile-nav" :class="{ open: isMenuOpen }">
      <router-link to="/homepage" @click="closeMenu">Home</router-link>
      <router-link to="/booking" @click="closeMenu">Ticket</router-link>
      <router-link to="/explore" @click="closeMenu">Explore</router-link>
      <router-link to="/aboutus" @click="closeMenu">About Us</router-link>

      <div v-if="user" class="mobile-user">
        <div class="mobile-greeting">Hi, {{ displayName }}</div>
        <button type="button" class="ghost-btn" @click="goToProfile">My Profile</button>
        <button class="ghost-btn logout-btn" @click="logout">Logout</button>
      </div>


      <div v-else class="mobile-actions">
        <router-link to="/signup" class="ghost-btn" @click="closeMenu"
          >Sign Up</router-link
        >
        <router-link to="/login" class="cta-btn" @click="closeMenu"
          >Log In</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/lib/api'

defineOptions({ name: 'HeadBar' })

function goToProfile(){
  closeMenu()
  router.push('/account/profile')
}

type UserProfile = {
  name?: string
  email?: string
}

const router = useRouter()
const user = ref<UserProfile | null>(null)
const isHidden = ref(false)
const isScrolled = ref(false)
const isMenuOpen = ref(false)

const displayName = computed(() => {
  if (!user.value) return ''
  return user.value.name || user.value.email?.split('@')[0] || 'there'
})

let lastScrollY = 0
let ticking = false

function updateScrollState() {
  const current = window.scrollY
  isHidden.value = current > lastScrollY && current > 140
  isScrolled.value = current > 24
  lastScrollY = current
  ticking = false
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState)
    ticking = true
  }
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onResize() {
  if (window.innerWidth > 920 && isMenuOpen.value) {
    closeMenu()
  }
}

async function fetchProfile() {
  const token = localStorage.getItem('access_token')
  if (!token) {
    user.value = null
    return
  }

  try {
    const response = await fetch(apiUrl('/auth/profile'), {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.ok) {
      user.value = (await response.json()) as UserProfile
      return
    }

    localStorage.removeItem('access_token')
    user.value = null
  } catch (error) {
    console.error('Profile fetch failed', error)
  }
}

function logout() {
  localStorage.removeItem('access_token')
  user.value = null
  closeMenu()
  router.push('/login')
}

onMounted(async () => {
  await nextTick()
  lastScrollY = window.scrollY
  updateScrollState()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  await fetchProfile()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap");

.head-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
  background: transparent;
  transition: transform 0.35s ease, background 0.35s ease,
    box-shadow 0.35s ease;
}

.head-bar.scrolled {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12);
}

.head-bar.hidden {
  transform: translateY(-100%);
}

.avatar-link {
  display: inline-flex;
  text-decoration: none;
}

.avatar-btn {
  display: inline-flex;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;
}

.avatar-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35);
}

.header-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.logo {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.logo-text {
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 2.8rem;
  position: relative;
  padding-bottom: 10px;
  transition: color 0.3s ease;
}

.head-bar.scrolled .logo-text {
  color: #1a1a1a;
}

.logo-text::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70%;
  height: 4px;
  background: #0f172a;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.logo:hover .logo-text::after {
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.6rem;
}

.nav-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  color: black;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.head-bar.scrolled .nav-link {
  color: #2d2d2d;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 0;
  height: 3px;
  background: #0f172a;
  border-radius: 999px;
  transform: translateX(-50%);
  transition: width 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #0f172a;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 60%;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.flag-icon {
  width: 34px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}

.auth-buttons,
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.user-profile {
  color: #ffffff;
}

.head-bar.scrolled .user-profile {
  color: #2d2d2d;
}

.welcome {
  font-weight: 600;
  white-space: nowrap;
  color: inherit;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
}

.ghost-btn,
.cta-btn {
  border-radius: 999px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  font-size: 0.98rem;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ghost-btn {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.6);
  background: transparent;
}

.head-bar.scrolled .ghost-btn {
  color: #0f172a;
  border-color: #0f172a;
}

.ghost-btn:hover,
.ghost-btn:focus-visible {
  transform: translateY(-1px);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.12);
}

.head-bar.scrolled .ghost-btn:hover,
.head-bar.scrolled .ghost-btn:focus-visible {
  color: #0f172a;
  border-color: #0f172a;
  background: rgba(15, 23, 42, 0.06);
}

.cta-btn {
  background: #0f172a;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.28);
}

.cta-btn:hover,
.cta-btn:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.35);
}

.logout-btn {
  padding: 0.5rem 1rem;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.head-bar.scrolled .menu-toggle {
  border-color: #e6e6e6;
  background: rgba(255, 255, 255, 0.9);
}

.menu-toggle span {
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 999px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.head-bar.scrolled .menu-toggle span {
  background: #2d2d2d;
}

.menu-toggle[aria-expanded="true"] span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.menu-toggle[aria-expanded="true"] span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-nav {
  display: none;
  padding: 0 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(224, 224, 224, 0.8);
}

.mobile-nav.open {
  display: block;
}

.mobile-nav a {
  display: block;
  padding: 0.85rem 0;
  font-weight: 600;
  color: #2d2d2d;
  text-decoration: none;
  border-bottom: 1px solid rgba(226, 226, 226, 0.7);
}

.mobile-nav a:last-of-type {
  border-bottom: none;
}

.mobile-actions,
.mobile-user {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
}

.mobile-greeting {
  font-weight: 600;
  color: #2d2d2d;
}

@media (max-width: 1100px) {
  .header-inner {
    padding: 0 1.8rem;
  }

  .logo-text {
    font-size: 2.4rem;
  }

  .nav-links {
    gap: 1.8rem;
  }
}

@media (max-width: 920px) {
  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .auth-buttons,
  .user-profile {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-inner {
    height: 80px;
    padding: 0 1.2rem;
  }

  .logo-text {
    font-size: 2rem;
  }

  .flag-icon {
    width: 30px;
  }
}

@media (max-width: 560px) {
  .logo-text {
    font-size: 1.8rem;
  }
}
</style>
