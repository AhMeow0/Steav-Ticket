<script setup lang="ts">
import { ref } from 'vue';

// FIXED: Correct folder name 'view' and file path
import UserHome from './view/User-Panel/UserHome.vue';

// FIXED: Changed 'ManageRoutesSche' to 'ManageRouteSche' (removed the 's') to match your file tree
import ManageRouteSche from './view/Admin-Panel/ManageRouteSche.vue';

const currentView = ref('user');
</script>

<template>
<<<<<<< HEAD
  <div class="app-container">
    <nav class="navbar">
      <div class="logo">Steav-Ticket</div>
      <div class="links">
        <a href="#" @click.prevent="currentView = 'user'" :class="{active: currentView === 'user'}">Home</a>
        <a href="#">Booking</a>
        <a href="#" @click.prevent="currentView = 'admin'" :class="{active: currentView === 'admin'}">Admin Panel</a>
      </div>
      <button class="login-pill">Login / Sign up</button>
    </nav>

    <component :is="currentView === 'user' ? UserHome : ManageRouteSche" />
  </div>
=======
  <router-view />
>>>>>>> b13c4250bea7258d590938cc7c5eae348ed0c60f
</template>

<style>
/* Global Styles */
body { margin: 0; font-family: 'Poppins', sans-serif; background: #f9f9f9; }

.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 50px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.logo { font-size: 24px; font-weight: bold; color: #f54d65; }
.links a { margin: 0 15px; text-decoration: none; color: #333; font-weight: 500; cursor: pointer; }
.links a.active { color: #f54d65; }
.login-pill {
  background: #ffeef1; color: #f54d65; border: none; padding: 10px 20px;
  border-radius: 5px; font-weight: bold; cursor: pointer;
}
</style>