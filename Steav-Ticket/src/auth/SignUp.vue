<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Welcome to <span class="brand">Steav-Ticket</span> 👋</h1>
      <p class="subtitle">Create your account in just a minute</p>

      <form class="auth-form" @submit.prevent="submitForm">
        <!-- Username -->
        <label>Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
        />
        <p v-if="errors.username" class="error">{{ errors.username }}</p>

        <!-- Email -->
        <label>Email Address</label>
        <input
          v-model="email"
          type="email"
          placeholder="example@gmail.com"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <!-- Password -->
        <label>Password</label>
        <div class="password-box">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
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
            placeholder="Re-enter password"
          />
          <span class="toggle" @click="showConfirm = !showConfirm">
            {{ showConfirm ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.confirmPassword" class="error">
          {{ errors.confirmPassword }}
        </p>

        <!-- Terms -->
        <div class="terms">
          <input type="checkbox" v-model="agree" />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </div>
        <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

        <!-- Button -->
        <button class="auth-btn" type="submit">
          Create Account 
        </button>

        <p v-if="errors.general" class="error center">
          {{ errors.general }}
        </p>

        <!-- Switch -->
        <p class="switch">
          Already have an account?
          <router-link to="/login" class="link">Log In</router-link>
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

const errors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: '',
  general: '',
})

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isStrongPassword(value: string) {
  return value.length >= 8
}

async function submitForm() {
  errors.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: '',
    general: '',
  }

  if (!username.value) errors.value.username = 'Username is required'
  if (!email.value || !validateEmail(email.value))
    errors.value.email = 'Valid email is required'
  if (!password.value)
    errors.value.password = 'Password is required'
  else if (!isStrongPassword(password.value))
    errors.value.password = 'At least 8 characters'

  if (confirmPassword.value !== password.value)
    errors.value.confirmPassword = 'Passwords do not match'

  if (!agree.value)
    errors.value.agree = 'Please agree to continue'

  const hasErrors = Object.values(errors.value).some((e) => e !== '')

  if (!hasErrors) {
    try {
      const response = await fetch(apiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username.value,
          email: email.value,
          password: password.value,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err?.message || 'Registration failed')
      }
      router.push('/login')
    } catch (err: unknown) {
      errors.value.general =
        err instanceof Error ? err.message : 'Something went wrong'
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #ed486c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
}

.auth-container {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 36px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: center;
}

.brand {
  color: #ed486c;
}

.subtitle {
  font-size: 13px;
  color: #777;
  text-align: center;
  margin-bottom: 28px;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  display: block;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid #ffd6de;
  font-size: 14px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

input::placeholder {
  color: #bbb;
}

input:focus {
  outline: none;
  border-color: #ed486c;
  box-shadow: 0 0 0 4px rgba(255, 111, 142, 0.15);
}

.password-box {
  position: relative;
}

.toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 14px;
  opacity: 0.6;
}

.toggle:hover {
  opacity: 1;
}

.terms {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 14px 0;
  font-size: 11px;
  color: #666;
}

.auth-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background: #ed486c;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(255, 84, 118, 0.35);
}

.auth-btn:active {
  transform: translateY(0);
}

.switch {
  text-align: center;
  margin-top: 18px;
  font-size: 12px;
  color: #666;
}

.link {
  color: #ff5476;
  font-weight: 600;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: #e74c3c;
  font-size: 11px;
  margin-bottom: 6px;
}

.center {
  text-align: center;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 22px 18px;
  }

  h1 {
    font-size: 22px;
  }

  .subtitle {
    font-size: 12px;
  }
}
</style>
