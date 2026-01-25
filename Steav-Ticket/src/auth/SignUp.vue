<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Create Account <img src="../assets/img/Logo.png" alt="Brand Logo" class="header"></h1>
      <p class="subtitle">Join us to start your journey</p>

      <form class="auth-form">
        <!-- First Name -->
        <label>First Name</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Enter your first name"
          autocomplete="given-name"
        />
        <p v-if="errors.firstName" class="error">{{ errors.firstName }}</p>

        <!-- Last Name -->
        <label>Last Name</label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Enter your last name"
          autocomplete="family-name"
        />
        <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>

        <!-- Email -->
        <label>Email Address</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          autocomplete="email"
        />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <!-- Password -->
        <label>Password</label>
        <div class="password-box">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Create a password"
            autocomplete="new-password"
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
            :type="showPasswordConfirm ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            autocomplete="new-password"
          />
          <span class="toggle" @click="showPasswordConfirm = !showPasswordConfirm">
            {{ showPasswordConfirm ? '🙈' : '👁️' }}
          </span>
        </div>
        <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

        <!-- Options -->
        <div class="options">
          <div class="remember">
            <input type="checkbox" id="terms" v-model="acceptTerms" />
            <label for="terms">I agree to Terms & Conditions</label>
          </div>
        </div>

        <!-- Sign Up button -->
        <button class="auth-btn" @click.prevent="signup">
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const acceptTerms = ref(false)

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  general: '',
})

async function signup() {
  errors.value = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' }

  if (!firstName.value.trim()) errors.value.firstName = 'First name is required'
  if (!lastName.value.trim()) errors.value.lastName = 'Last name is required'
  if (!email.value.trim()) errors.value.email = 'Email is required'
  if (!password.value) errors.value.password = 'Password is required'
  if (password.value !== confirmPassword.value) errors.value.confirmPassword = 'Passwords do not match'
  if (!acceptTerms.value) errors.value.general = 'Please accept Terms & Conditions'

  if (Object.values(errors.value).some(err => err)) return

  try {
    const response = await fetch(apiUrl('/auth/signup'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }),
    })

    if (!response.ok) {
      let message = 'Signup failed'
      try {
        const err = await response.json()
        if (typeof err?.message === 'string') message = err.message
      } catch {}
      throw new Error(message)
    }

    const data = await response.json()
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('isLoggedIn', 'true')

    router.push('/homepage')
  } catch (err: unknown) {
    errors.value.general =
      err instanceof Error ? err.message : 'Signup failed'
  }
}
</script>

<style scoped>
/* PERFECT MATCH - Same styles as your fixed Login page */
.auth-page {
  min-height: 100vh;
  background: #fdf2f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  font-family: system-ui, sans-serif;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 52px 40px;
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.09);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin: 0 0 12px 0;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.header {
  height: 48px;
  width: auto;
  vertical-align: middle;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  font-size: 1.05rem;
  margin: 0 0 48px 0;
  line-height: 1.4;
  font-weight: 400;
}

label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 9999px;
  background: #f8fafc;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 4px rgba(237, 72, 108, 0.18);
}

input::placeholder {
  color: #9ca3af;
}

.password-box {
  position: relative;
}

.toggle {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: #9ca3af;
  cursor: pointer;
  user-select: none;
}

.toggle:hover {
  color: #ed486c;
}

.options {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 24px 0 40px 0;
  font-size: 0.95rem;
}

.remember {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.4;
}

.remember input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #ed486c;
  margin-top: 2px;
  flex-shrink: 0;
}

.auth-btn {
  width: 100%;
  padding: 17px 0;
  background: linear-gradient(90deg, #ed486c, #f8718b);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(237, 72, 108, 0.25);
  transition: all 0.25s;
  margin-bottom: 32px;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(237, 72, 108, 0.32);
}

.auth-btn:active {
  transform: translateY(0);
}

.switch {
  text-align: center;
  color: #6b7280;
  font-size: 0.97rem;
  margin: 0 0 36px 0;
}

.link {
  color: #ed486c;
  font-weight: 700;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.or {
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin: 40px 0 32px 0;
  position: relative;
}

.or::before,
.or::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 38%;
  height: 1px;
  background: #e5e7eb;
}

.or::before { left: 0; }
.or::after { right: 0; }

.social-row {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 8px;
}

.social-row img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: contain;
  padding: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: transform 0.2s;
  cursor: pointer;
}

.social-row img:hover {
  transform: scale(1.12);
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 6px 0 16px 0;
  min-height: 1.25em;
}

.center {
  text-align: center;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 40px 28px;
    border-radius: 28px;
  }

  h1 {
    font-size: 1.75rem;
  }

  .social-row {
    gap: 24px;
  }

  .social-row img {
    width: 48px;
    height: 48px;
  }
}
</style>
