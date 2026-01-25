<template>
  <div class="profile-page">
    <div class="sidebar">
      <div class="profile-header">
        <router-link to="/homepage" class="back-home" aria-label="Back to homepage">← Back to Home</router-link>
        <div class="avatar">
          <img src="../../assets/img/avatar.png" alt="User Avatar" />
        </div>
        <!-- <p class="profile-status">{{ isEditing ? 'Editing Profile' : 'View Mode' }}</p> -->
        <a href="#">{{ 'Edit' }}</a>
        <h2 class="welcome-text">Welcome, Steav</h2>
      </div>

      <nav class="menu">
        <router-link to="/account/profile" class="menu-item" exact-active-class="active">
          <span class="icon">👤</span>
          <span>Personal Information</span>
        </router-link>
        <router-link to="/account/methodpay" class="menu-item" exact-active-class="active">
          <span class="icon">💳</span>
          <span>Payments</span>
        </router-link>
        <router-link to="/account/language" class="menu-item" exact-active-class="active">
          <span class="icon">Aa</span>
          <span>Language</span>
        </router-link>
        <router-link to="/account/help" class="menu-item" exact-active-class="active">
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
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.back-home {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.back-home:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}

.back-icon {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 16px;
  line-height: 1;
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
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 14px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  text-align: left;
  text-decoration: none;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.22);
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
}

.menu-item .icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.menu-item.logout {
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.2);
}

.menu-item.logout:hover {
  background: rgba(0, 0, 0, 0.32);
}

.content {
  flex: 1;
  background-color: white;
  padding: 60px 80px;
  font-size: 18px;
  line-height: 1.5;
}

.page-title {
  font-size: 40px;
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
  accent-color: #0f172a;
}

.language-name {
  font-size: 20px;
  font-weight: 600;
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
  background: linear-gradient(90deg, #0f172a 0%, #1e293b 100%);
  color: white;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.35);
}
</style>
