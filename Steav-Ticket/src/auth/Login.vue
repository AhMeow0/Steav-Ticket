<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Welcome Back to <img src="../assets/img/Logo.png" alt="Brand Logo" class="header"></h1>
      <p class="subtitle">Log in to continue your journey</p>

      <form class="auth-form">
        <!-- Email -->
        <label>Email Address</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          autocomplete="email"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <div class="password-box">
          <label >Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
          <span class="toggle" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Options -->
        <div class="options">
          <div class="remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
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

        <div class="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div class="social-row">
          <button type="button" class="social-btn google" title="Continue with Google"></button>
          <button type="button" class="social-btn apple" title="Continue with Apple"></button>
          <button type="button" class="social-btn facebook" title="Continue with Facebook"></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// ────────────────────────────────────────────────
//   Your original script remains 100% unchanged
// ────────────────────────────────────────────────
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

    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('isLoggedIn', 'true')
        const token = data.access_token
    const payloadBase64 = token.split('.')[1]
    const decodedJson = atob(payloadBase64)
    const decoded = JSON.parse(decodedJson)

    if (decoded.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/homepage')
    }
  } catch (err: unknown) {
    errors.value.general =
      err instanceof Error ? err.message : 'Login failed'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #fdf2f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 48px 40px;
  border-radius: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 1.9rem;
  font-weight: 800;
  text-align: center;
  color: #111827;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.header {
  height: 60px;
  width: auto;
  vertical-align: middle;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  font-size: 1.05rem;
  margin: 0 0 36px;
  font-weight: 400;
}

label {
  display: block;
  font-size: 0.94rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

input {
  width: 95%;
  padding: 16px 20px;
  border: none;
  border-radius: 9999px;
  background: #f8fafc;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 4px rgba(237, 72, 108, 0.18);
}

.password-box {
  position: relative;
  margin-top: 20px;
}

.toggle {
  margin-top: 15px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.35rem;
  color: #9ca3af;
  cursor: pointer;
  user-select: none;
}

.toggle:hover { color: #ed486c; }

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 32px;
  font-size: 0.94rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #4b5563;
}

input:not([type="checkbox"]) {
  width: 95%;
  padding: 16px 20px;
  border: none;
  border-radius: 9999px;
  background: #f8fafc;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input:not([type="checkbox"]):focus {
  outline: none;
  background: white;
}

.forgot {
  color: #ed486c;
  font-weight: 600;
  text-decoration: none;
}

.forgot:hover { text-decoration: underline; }

.auth-btn {
  width: 100%;
  padding: 17px;
  background: linear-gradient(90deg, #ed486c, #f8718b);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(237, 72, 108, 0.22);
  transition: all 0.25s ease;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(237, 72, 108, 0.3);
}

.auth-btn:active {
  transform: translateY(0);
  box-shadow: 0 6px 16px rgba(237, 72, 108, 0.25);
}

.switch {
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
  margin: 32px 0 20px;
}

.link {
  color: #ed486c;
  font-weight: 700;
  text-decoration: none;
}

.link:hover { text-decoration: underline; }

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 32px 0 28px;
  color: #9ca3af;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.divider span {
  padding: 0 24px;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.social-btn {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-btn:hover {
  transform: scale(1.08);
}

.google   { background-image: url('https://cdn-icons-png.flaticon.com/512/300/300221.png'); background-color: #ffffff; border: 1px solid #e5e7eb; }
.apple    { background-image: url('https://cdn-icons-png.flaticon.com/512/179/179309.png'); background-color: #000000; }
.facebook { background-image: url('https://cdn-icons-png.flaticon.com/512/733/733547.png'); background-color: #1877f2; }

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 6px 0 14px;
  min-height: 1.2em;
}

.center { text-align: center; }

@media (max-width: 480px) {
  .auth-container {
    padding: 40px 28px;
    border-radius: 28px;
  }
  h1 { font-size: 1.75rem; }
  .social-row { gap: 20px; }
  .social-btn { width: 48px; height: 48px; }
}
</style>
