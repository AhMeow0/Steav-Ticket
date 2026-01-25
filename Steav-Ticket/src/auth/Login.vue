<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Welcome Back to <span class="brand">Steav-Ticket</span> 👋</h1>
      <p class="subtitle">Log in to continue your journey</p>

      <form class="auth-form">
        <!-- Email -->
        <label>Email Address</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <!-- Password -->
        <label>Password</label>
        <div class="password-box">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Enter your password"
          />
          <span class="toggle" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Options -->
        <div class="options">
          <div class="remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>

          <router-link to="/forgot-password" class="forgot">
            Forgot password?
          </router-link>
        </div>

        <!-- Login button -->
        <button class="auth-btn" @click.prevent="login">
          Log In
        </button>

        <p v-if="errors.general" class="error center">
          {{ errors.general }}
        </p>

        <!-- Switch -->
        <p class="switch">
          Don't have an account?
          <router-link to="/signup" class="link">Sign Up</router-link>
        </p>

        <p class="or">OR CONTINUE WITH</p>

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
import { apiUrl } from '@/lib/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const errors = ref({
  email: '',
  password: '',
  general: '',
})

async function login() {
  errors.value = { email: '', password: '', general: '' }

  if (!email.value) errors.value.email = 'Email is required'
  if (!password.value) errors.value.password = 'Password is required'
  if (errors.value.email || errors.value.password) return

  try {
    const response = await fetch(apiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      let message = 'Invalid email or password'
      try {
        const err = await response.json()
        if (typeof err?.message === 'string') message = err.message
      } catch {}
      throw new Error(message)
    }

    const data = await response.json()

    // ONLY LOGIC CHANGE (NO STYLE TOUCHED)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('isLoggedIn', 'true')

    // GO TO MY PROFILE
    router.push('/homepage')
  } catch (err: unknown) {
    errors.value.general =
      err instanceof Error ? err.message : 'Login failed'
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
  font-family: 'Inter', system-ui, sans-serif;
}

.auth-container {
  width: 420px;
  background: white;
  padding: 60px 80px;
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
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: center;
}

.brand {
  color: #ff5476;
}

.subtitle {
  font-size: 16px;
  color: #777;
  text-align: center;
  margin-bottom: 28px;
}

label {
  font-size: 16px;
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
  font-size: 15px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

input::placeholder {
  color: #bbb;
}

input:focus {
  outline: none;
  border-color: #ff6f8e;
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

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  margin: 12px 0 18px;
}

.remember {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}

.forgot {
  color: #ff5476;
  font-weight: 600;
  text-decoration: none;
}

.forgot:hover {
  text-decoration: underline;
}

.auth-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ff5476, #ff8fa3);
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

.or {
  text-align: center;
  margin: 20px 0;
  color: #777;
  font-size: 11px;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.social-row img {
  width: 36px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.social-row img:hover {
  transform: scale(1.1);
}

.error {
  color: #e74c3c;
  font-size: 11px;
  margin-bottom: 6px;
}

.center {
  text-align: center;
}
</style>
