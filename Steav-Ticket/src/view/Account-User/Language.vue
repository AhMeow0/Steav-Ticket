<template>
  <div class="profile-page">
    <div class="sidebar">
      <div class="profile-header">
        <div class="avatar">
          <img src="../../assets/img/avatar.png" alt="User Avatar" />
        </div>
        <!-- <p class="profile-status">{{ isEditing ? 'Editing Profile' : 'View Mode' }}</p> -->
        <a href="#">{{ 'Edit' }}</a>
        <h2 class="welcome-text">Welcome, Steav</h2>
      </div>

      <nav class="menu">
        <router-link to="/account/profile" class="menu-item">
          <span class="icon">👤</span>
          <span>Personal Information</span>
        </router-link>
        <router-link to="/account/methodpay" class="menu-item">
          <span class="icon">💳</span>
          <span>Payments</span>
        </router-link>
        <router-link to="/account/language" class="menu-item">
          <span class="icon">Aa</span>
          <span>Language</span>
        </router-link>
        <router-link to="/account/help" class="menu-item" active-class="active">
          <span class="icon">❓</span>
          <span>Help</span>
        </router-link>
        <button class="menu-item logout" @click="showLogoutModal = true">
          <span class="icon">↩</span>
          <span>Log out</span>
        </button>
      </nav>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal-overlay" @click="showLogoutModal = false">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Log out of your account?</h3>
        <div class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="showLogoutModal = false">Cancel</button>
          <button class="modal-btn logout-btn" @click="handleLogout">Log out</button>
        </div>
      </div>
    </div>

    <div class="content">
      <h1 class="page-title">Language Settings</h1>

      <div class="language-options">
        <label class="language-option">
          <input type="radio" name="language" value="khmer" v-model="selectedLanguage" />
          <span class="language-name">Khmer</span>
        </label>

        <label class="language-option">
          <input type="radio" name="language" value="english" v-model="selectedLanguage" />
          <span class="language-name">English</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'AccountLanguage' })

const router = useRouter()
const selectedLanguage = ref('english')
const showLogoutModal = ref(false)

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  display: flex;
  height: 99vh;
  background-color: #000;
}

.sidebar {
  width: 305px;
  background: linear-gradient(180deg, #ff6b9d 0%, #ff5e8f 100%);
  padding: 40px 20px;
  color: white;
  margin-left: -5px;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  border: #f0eded 1px solid;
  border-radius: 10px;
  gap: 40px;
}

.profile-header {
  text-align: center;
  margin-bottom: 60px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-text {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  text-align: left;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-item .icon {
  font-size: 20px;
}

.content {
  flex: 1;
  background-color: white;
  padding: 60px 80px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #000;
}

.profile-form {
  max-width: 900px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.language-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 20px 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.language-option:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.language-option input[type='radio'] {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #ff6b9d;
}

.language-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  padding: 30px 40px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: 15px;
}

.modal-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background-color: #e8e8e8;
}

.logout-btn {
  background: linear-gradient(90deg, #ff6b9d 0%, #ff5e8f 100%);
  color: white;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.4);
}
</style>
