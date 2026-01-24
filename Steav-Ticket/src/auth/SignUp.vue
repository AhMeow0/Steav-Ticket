<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="title">Create Your Account</h1>
      <p class="subtitle">Join Steav‑Ticket and automate your payments easily</p>

      <form class="form" @submit.prevent="submitForm">
        <!-- Username -->
        <div class="field">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="Enter username" />
          <p v-if="errors.username" class="error">{{ errors.username }}</p>
        </div>

        <!-- Email -->
        <div class="field">
          <label>Email Address</label>
          <input v-model="email" type="email" placeholder="example@gmail.com" />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div class="field">
          <label>Password</label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter password" />
            <span class="toggle" @click="showPassword = !showPassword">{{ showPassword ? '🙈' : '👁️' }}</span>
          </div>
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <div class="field">
          <label>Confirm Password</label>
          <div class="password-input">
            <input :type="showConfirm ? 'text' : 'password'" v-model="confirmPassword" placeholder="Re-enter password" />
            <span class="toggle" @click="showConfirm = !showConfirm">{{ showConfirm ? '🙈' : '👁️' }}</span>
          </div>
          <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Terms -->
        <div class="terms">
          <input type="checkbox" v-model="agree" />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </div>
        <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

        <!-- Submit -->
        <button type="submit" class="submit-btn">Sign Up</button>
        <p v-if="errors.general" class="error general">{{ errors.general }}</p>

        <p class="switch">Already have an account?
          <router-link class="switch-link" to="/login">Log In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/lib/api'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)

const showPassword = ref(false)
const showConfirm = ref(false)

const errors = ref({ username: '', email: '', password: '', confirmPassword: '', agree: '', general: '' })

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
function isStrongPassword(value: string) {
  return value.length >= 8
}

async function submitForm() {
  errors.value = { username: '', email: '', password: '', confirmPassword: '', agree: '', general: '' }

  if (!username.value) errors.value.username = 'Username is required'
  if (!email.value || !validateEmail(email.value)) errors.value.email = 'Valid email is required'
  if (!password.value) errors.value.password = 'Password is required'
  else if (!isStrongPassword(password.value)) errors.value.password = 'Password must be at least 8 characters'
  if (confirmPassword.value !== password.value) errors.value.confirmPassword = 'Passwords do not match'
  if (!agree.value) errors.value.agree = 'You must agree to continue'

  const hasErrors = Object.values(errors.value).some((e) => e)
  if (hasErrors) return

  try {
    const response = await fetch(apiUrl('/auth/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username.value, email: email.value, password: password.value }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => null)
      let msg = err?.message || 'Registration failed'
      if (Array.isArray(msg)) msg = msg.join(', ')
      throw new Error(msg)
    }

    router.push('/login')
  } catch (err: any) {
    errors.value.general = err.message || 'Unknown error occurred'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff7a95, #ff416c);
  padding: 20px;
  box-sizing: border-box;
}

.auth-card {
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  padding: 35px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  margin: auto;
}

.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
}

.field {
  width: 100%;
  margin-bottom: 15px;
}

label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #ffa4b8;
  font-size: 14px;
  display: block;
  margin: 0 auto 10px auto;
}

input:focus {
  border-color: #ff3e6c;
  outline: none;
  box-shadow: 0 0 6px rgba(255,82,120,0.4);
}

.password-input {
  position: relative;
}

.toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
  font-size: 14px;
}

.terms {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  margin: 10px 0;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #ff5577;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background: #ff3d63;
  transform: translateY(-2px);
}

.switch {
  text-align: center;
  font-size: 13px;
  margin-top: 15px;
}

.switch-link {
  color: #ff3366;
  font-weight: 600;
  text-decoration: none;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 3px;
}

.general {
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);} 
  to { opacity: 1; transform: translateY(0);} 
}
</style>
