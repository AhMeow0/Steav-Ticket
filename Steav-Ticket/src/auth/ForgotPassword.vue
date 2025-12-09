<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- STEP 1: ENTER EMAIL -->
      <div v-if="step === 1">
        <h1>Reset Password</h1>
        <p class="subtitle">Enter your email to receive a verification code.</p>

        <form class="auth-form" @submit.prevent="sendCode">
          <label>Email Address</label>
          <input v-model="email" type="email" placeholder="example@gmail.com" />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>

          <button class="auth-btn" type="submit">Send Verification Code</button>

          <p class="switch">
            Remember your password?
            <router-link to="/login" class="login-link">Go back to Login</router-link>
          </p>
        </form>
      </div>

      <!-- STEP 2: ENTER 6-DIGIT CODE -->
      <div v-if="step === 2">
        <h1>Enter Verification Code</h1>
        <p class="subtitle">We sent a 6-digit code to your email.</p>

        <form class="auth-form" @submit.prevent="verifyCode">
          <label>Verification Code</label>
          <input v-model="inputCode" maxlength="6" placeholder="Enter 6-digit code" />
          <p v-if="errors.code" class="error">{{ errors.code }}</p>

          <button class="auth-btn" type="submit">Verify Code</button>

          <p class="switch">
            Didn’t get the code?
            <span class="login-link" @click="resendCode">Resend</span>
          </p>
        </form>
      </div>

      <!-- STEP 3: RESET PASSWORD -->
      <div v-if="step === 3">
        <h1>Create New Password</h1>
        <p class="subtitle">Enter your new password below.</p>

        <form class="auth-form" @submit.prevent="resetPassword">
          <label>New Password</label>
          <div class="password-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter new password"
            />
            <span class="toggle" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
          <p v-if="errors.password" class="error">{{ errors.password }}</p>

          <label>Confirm Password</label>
          <div class="password-box">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Confirm password"
            />
            <span class="toggle" @click="showConfirm = !showConfirm">
              {{ showConfirm ? '🙈' : '👁️' }}
            </span>
          </div>
          <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

          <button class="auth-btn" type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import axios from "axios"

const router = useRouter()

const step = ref(1)

const email = ref('')
const inputCode = ref('')
const generatedCode = ref('')

const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirm = ref(false)

const errors = ref({
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
})

// STEP 1 ➤ SEND VERIFICATION CODE
function sendCode() {
  errors.value.email = ''

  if (!email.value) {
    errors.value.email = 'Email is required'
    return
  }

  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString()

  console.log('Your verification code =', generatedCode.value)

  alert('Verification code sent to your email.')
  step.value = 2
}

// STEP 2 ➤ RESEND CODE
function resendCode() {
  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString()

  console.log('New verification code =', generatedCode.value)

  alert('A new verification code was sent to your email.')
}

// STEP 2 ➤ VERIFY CODE
function verifyCode() {
  errors.value.code = ''

  if (!inputCode.value) {
    errors.value.code = 'Please enter the code'
    return
  }

  if (inputCode.value !== generatedCode.value) {
    errors.value.code = 'Incorrect verification code'
    return
  }

  step.value = 3
}

// STEP 3 ➤ RESET PASSWORD
function resetPassword() {
  errors.value.password = ''
  errors.value.confirmPassword = ''

  if (!password.value || password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  }

  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  if (errors.value.password || errors.value.confirmPassword) return

  alert('Password reset successfully!')
  router.push('/login')
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
  text-align: center;
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
  margin-bottom: 12px;
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

.error {
  color: red;
  font-size: 10px;
  margin-top: -8px;
  margin-bottom: 10px;
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
  margin-top: 12px;
  font-size: 12px;
  color: #444;
}

.login-link {
  color: #ff4672;
  margin-left: 4px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
