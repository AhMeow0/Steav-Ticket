<template>
  <div class="profile-page">
    <div class="sidebar">
      <div class="profile-header">
        <div class="avatar">
          <img src="../../assets/img/avatar.png" alt="User Avatar" />
        </div>
        <!-- <p class="profile-status">{{ isEditing ? 'Editing Profile' : 'View Mode' }}</p> -->
        <a href="#" @click.prevent="toggleEdit">{{ isEditing ? 'Cancel' : 'Edit' }}</a>
        <h2 class="welcome-text">Welcome, {{ formData.firstName || 'Steav' }}</h2>
      </div>

      <nav class="menu">
        <router-link to="/homepage" class="menu-item" active-class="active">
          <span class="icon">🏠</span>
          <span>Back to Home</span>
        </router-link>
        <router-link to="/account/profile" class="menu-item" active-class="active">
          <span class="icon">👤</span>
          <span>Personal Information</span>
        </router-link>
        <router-link to="/account/methodpay" class="menu-item" active-class="active">
          <span class="icon">💳</span>
          <span>Payments</span>
        </router-link>
        <router-link to="/account/language" class="menu-item">
          <span class="icon">Aa</span>
          <span>Language</span>
        </router-link>
        <router-link to="/account/help" class="menu-item">
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
      <h1 class="page-title">Personal Profile</h1>

      <form class="profile-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input
              v-model="formData.firstName"
              type="text"
              placeholder="Enter your First name"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input
              v-model="formData.lastName"
              type="text"
              placeholder="Enter your Last name"
              :disabled="!isEditing"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Birth of date</label>
            <input
              v-model="formData.birthDate"
              type="date"
              placeholder="DD/MM/YYYY"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-group gender-group">
            <label class="radio-label">
              <input v-model="formData.gender" type="radio" value="male" :disabled="!isEditing" />
              <span>Male</span>
            </label>
            <label class="radio-label">
              <input v-model="formData.gender" type="radio" value="female" :disabled="!isEditing" />
              <span>Female</span>
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Nationality</label>
            <input
              v-model="formData.nationality"
              type="text"
              placeholder="Nationality"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input
              v-model="formData.phoneNumber"
              type="tel"
              placeholder="Phone Number"
              :disabled="!isEditing"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Username</label>
            <input
              v-model="formData.username"
              type="text"
              placeholder="Enter Username"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="Enter email"
              :disabled="!isEditing"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-edit" @click="toggleEdit">
            {{ isEditing ? 'Cancel' : 'Edit Profile' }}
          </button>
          <button type="submit" class="btn btn-continue" :disabled="!isEditing">Continue</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isEditing = ref(false)
const showLogoutModal = ref(false)

const formData = ref({
  firstName: 'Steav',
  lastName: '',
  birthDate: '',
  gender: 'male',
  nationality: '',
  phoneNumber: '',
  username: '',
  email: '',
})

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      localStorage.removeItem('access_token')
      router.push('/login')
      return
    }

    const profile = await response.json()

    // backend profile is JWT payload: { sub, name, email, role, iat, exp }
    if (profile?.name) {
      formData.value.firstName = String(profile.name)
      formData.value.username = String(profile.name)
    }
    if (profile?.email) {
      formData.value.email = String(profile.email)
    }
  } catch (e) {
    console.error('Failed to load profile', e)
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const handleSubmit = () => {
  if (isEditing.value) {
    console.log('Profile updated:', formData.value)
    // Save the data (you can add API call here later)
    isEditing.value = false
    alert('Profile updated successfully!')
  }
}

const handleLogout = () => {
  localStorage.removeItem('access_token')
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

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.form-group input[type='text'],
.form-group input[type='email'],
.form-group input[type='tel'],
.form-group input[type='date'] {
  padding: 15px 20px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: background-color 0.3s;
}

.form-group input:focus {
  background-color: #ebebeb;
}

.form-group input:disabled {
  background-color: #e8e8e8;
  cursor: not-allowed;
  opacity: 0.7;
}

.gender-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  padding-top: 30px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
}

.radio-label input[type='radio'] {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #ff6b9d;
}

.form-actions {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.btn {
  padding: 15px 50px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-edit {
  background-color: #ff6b9d;
  color: white;
}

.btn-continue {
  background-color: #ff6b9d;
  color: white;
}

/* Logout Modal */
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
