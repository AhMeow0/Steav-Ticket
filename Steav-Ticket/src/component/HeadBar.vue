<template>
  <header class="head-bar">
    <div class="container header-content">
      <div class="logo">
        <h2 class="logo-text">Steav-Ticket</h2>
      </div>

      <nav class="nav-links">
        <router-link to="/homepage">Home</router-link>
        <router-link to="/booking">Ticket</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/aboutus">About Us</router-link>
      </nav>

      <div class="auth-action">
        <div v-if="user" class="user-profile">
          <router-link to="/account/profile" class="profile-link">
            <span class="welcome-text">Hi, {{ user.name || user.email }}</span>
            <img src="../assets/img/avatar.png" alt="User" class="avatar" />
          </router-link>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>

        <router-link v-else to="/login" class="login-btn">
          Login/Sign up <span class="icon">🎫</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref<any>(null) // Store user info here

onMounted(async () => {
  // 1. Check if we have a key (token) in our pocket
  const token = localStorage.getItem('access_token')

  if (token) {
    try {
      // 2. Ask Backend: "Who owns this token?"
      // Note: If you used 'api' prefix in main.ts, add /api here!
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Show the ID card
        },
      })

      if (response.ok) {
        user.value = await response.json() // Save the user data to show in UI
      } else {
        // Token might be expired -> Throw it away
        localStorage.removeItem('access_token')
      }
    } catch (error) {
      console.error('Not logged in')
    }
  }
})

function logout() {
  // 1. Destroy the token
  localStorage.removeItem('access_token')
  // 2. Reset the UI
  user.value = null
  // 3. Go to Login page
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.head-bar {
  background-color: white;
  padding: 1.2rem 0;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03); /* Subtle shadow for depth */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0;
  color: #222;
}

.nav-links {
  display: flex;
  gap: 3rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s;
}

/* Active State (Pink color for active page) */
.active-link {
  color: #f54e75 !important;
}
.nav-links a:hover {
  color: #f54e75;
}

/* User Profile Styles */
.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.welcome-text {
  font-weight: 600;
  color: #333;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #f54e75;
}

.logout-btn {
  background: transparent;
  border: 1px solid #f54e75;
  color: #f54e75;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
}

.logout-btn:hover {
  background: #f54e75;
  color: white;
}

/* Login Button Styles */
.login-btn {
  background-color: #fde8ef; /* Light pink background */
  color: #f54e75; /* Darker pink text */
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none; /* Because it's a router-link now */
  transition: background 0.3s;
}

.login-btn:hover {
  background-color: #fcd5e1;
}
</style>
