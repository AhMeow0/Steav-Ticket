<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Log In to Steav-Ticket</h1>
      <p class="subtitle">Quick & Simple way to Automate your payment</p>

      <form class="auth-form">
        <!-- Email -->
        <label>Email Address</label>
        <input v-model="email" type="email" placeholder="Enter your email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <!-- Password -->
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter your password" />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Options -->
        <div class="options">
          <div>
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>

          <!-- NEW: Go to Forgot Password page -->
          <router-link to="/forgot-password" class="forgot">Forgot Password?</router-link>
        </div>

        <!-- Login button -->
        <button class="auth-btn" @click.prevent="login">Log In</button>

        <!-- Switch to Signup -->
        <p class="switch">
          Don't have an account?
          <router-link to="/signup" class="link">Sign Up</router-link>
        </p>

        <p class="or">OR USE</p>

        <div class="social-row">
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
          <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" />
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// form fields
const email = ref('')
const password = ref('')

// error messages
const errors = ref({
  email: '',
  password: '',
})

function login() {
  // clear errors
  errors.value.email = ''
  errors.value.password = ''

  // validate
  if (!email.value) errors.value.email = 'Email is required'
  if (!password.value) errors.value.password = 'Password is required'

  // stop here if errors
  if (errors.value.email || errors.value.password) return

  // Phase 1: fake login → navigate to user home
  router.push('/user/home')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #ed486c;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  width: 480px;
  background: white;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 26px;
  font-weight: 700;
}

.subtitle {
  font-size: 12px;
  margin-bottom: 25px;
  color: #555;
}

.auth-form {
  text-align: left;
}

label {
  font-size: 12px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ff7895;
  border-radius: 6px;
  margin-bottom: 15px;
}

.error {
  color: red;
  font-size: 10px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.options {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 15px;
  align-items: center;
}

.forgot {
  color: #ff4672;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background: #ff5476;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.switch {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

.link {
  color: #ff4672;
  text-decoration: none;
  font-weight: 600;
}

.or {
  text-align: center;
  margin: 20px 0;
  color: #777;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.social-row img {
  width: 35px;
  cursor: pointer;
}
</style>
