<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Sign up to Steav-Ticket</h1>
      <p class="subtitle">Quick & Simple way to Automate your payment</p>

      <form class="auth-form" @submit.prevent="submitForm">
        <!-- Username -->
        <label>Username</label>
        <input v-model="username" type="text" autocomplete="off" placeholder="Enter username" />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>

        <!-- Email -->
        <label>Email Address</label>
        <input v-model="email" type="email" autocomplete="off" placeholder="example@gmail.com" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <!-- Password -->
        <label>Password</label>
        <div class="password-box">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            autocomplete="new-password"
            placeholder="Enter password"
          />
          <span class="toggle" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Confirm Password -->
        <label>Confirm Password</label>
        <div class="password-box">
          <input
            :type="showConfirm ? 'text' : 'password'"
            v-model="confirmPassword"
            autocomplete="new-password"
            placeholder="Re-enter password"
          />
          <span class="toggle" @click="showConfirm = !showConfirm">
            {{ showConfirm ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

        <!-- Terms -->
        <div class="terms">
          <input type="checkbox" v-model="agree" />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </div>
        <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

        <!-- Button -->
        <button class="auth-btn" type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)

const showPassword = ref(false)
const showConfirm = ref(false)

const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: '',
})

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function submitForm() {
  errors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: '',
  }

  if (!username.value) errors.value.username = 'Username is required'
  if (!email.value || !validateEmail(email.value)) errors.value.email = 'Valid email is required'
  if (!password.value) errors.value.password = 'Password is required'
  if (confirmPassword.value !== password.value)
    errors.value.confirmPassword = 'Passwords do not match'
  if (!agree.value) errors.value.agree = 'You must agree to continue'

  const hasErrors = Object.values(errors.value).some((e) => e !== '')

  if (!hasErrors) {
    alert('Form submitted successfully!')
  }
}
</script>

<style scoped>
/* SAME CSS YOU ALREADY HAVE, only adds toggle button */
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #8bb1ff, #ffcf7c);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  width: 500px;
  background: white;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  font-size: 13px;
  margin-bottom: 25px;
  color: #555;
}

.auth-form {
  text-align: left;
}

label {
  font-size: 13px;
  margin-bottom: 5px;
  display: block;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ff7895;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}

.password-box {
  position: relative;
}

.toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
  font-size: 16px;
}

.terms {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 12px;
}

.auth-btn {
  width: 100%;
  padding: 14px;
  background: #ff5476;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
  font-weight: 600;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
}
</style>
