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
          <span style="font-size: 10px">I agree to the Terms of Service and Privacy Policy.</span>
        </div>
        <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

        <!-- Sign Up button -->
        <button class="auth-btn" type="submit">Sign Up</button>

        <p v-if="errors.general" class="error">{{ errors.general }}</p>

        <!-- Switch to Login -->
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

// ⭐ SIMPLE STRONG PASSWORD: must be 8+ characters
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

  if (!username.value) {
    errors.value.username = 'Username is required'
  }

  if (!email.value || !validateEmail(email.value)) {
    errors.value.email = 'Valid email is required'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (!isStrongPassword(password.value)) {
    errors.value.password = 'Password must be at least 8 characters long'
  }

  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  if (!agree.value) {
    errors.value.agree = 'You must agree to continue'
  }

  const hasErrors = Object.values(errors.value).some((e) => e !== '')

  if (hasErrors) return

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
        role: 'user',
      }),
    })

    if (!response.ok) {
      const message = await response.text().catch(() => '')
      throw new Error(message || 'Sign up failed')
    }

    alert('Account created successfully! Please log in.')
    router.push('/login')
  } catch (err: any) {
    errors.value.general = err?.message || 'Sign up failed'
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
}

.auth-container {
  width: 500px;
  background: white;
  padding: 25px 50px;
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
  margin-top: 5px;
}

label {
  font-size: 13px;
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ff7895;
  border-radius: 8px;
  margin-bottom: 8px;
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
  font-size: 12px;
}

.terms {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 8px;
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

.switch {
  text-align: center;
  margin-top: 12px;
  margin-bottom: 10px;
  font-size: 12px;
}

.link {
  color: #ff4672;
  text-decoration: none;
  font-weight: 600;
}

.error {
  color: red;
  font-size: 10px;
  margin-top: -4px;
  margin-bottom: 10px;
}
</style>
