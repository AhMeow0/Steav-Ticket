<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- STEP 1: ENTER EMAIL -->
      <div v-if="step === 1">
        <h1>Reset Password</h1>
        <p class="subtitle">Enter your email to receive a verification code.</p>

        <form class="auth-form" @submit.prevent="sendCode">
          <label>Email Address</label>
          <input
            v-model.trim="email"
            type="email"
            placeholder="example@gmail.com"
            autocomplete="email"
          />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>

          <button class="auth-btn" type="submit">Send Verification Code</button>

          <p class="switch">
            Remember your password?
            <router-link to="/login" class="link">Go back to Login</router-link>
          </p>
        </form>
      </div>

      <!-- STEP 2: ENTER 6-DIGIT CODE -->
      <div v-if="step === 2">
        <h1>Enter Verification Code</h1>
        <p class="subtitle">We sent a 6-digit code to <strong>{{ email }}</strong></p>

        <form class="auth-form" @submit.prevent="verifyCode">
          <label>Verification Code</label>
          <input
            v-model="inputCode"
            type="text"
            maxlength="6"
            placeholder="Enter 6-digit code"
            autocomplete="one-time-code"
            inputmode="numeric"
          />
          <p v-if="errors.code" class="error">{{ errors.code }}</p>

          <button class="auth-btn" type="submit">Verify Code</button>

          <p class="switch">
            Didn’t get the code?
            <span class="link" @click="resendCode">Resend</span>
          </p>
        </form>
      </div>

      <!-- STEP 3: RESET PASSWORD -->
      <div v-if="step === 3">
        <h1>Create New Password</h1>
        <p class="subtitle">Choose a strong password for your account.</p>

        <form class="auth-form" @submit.prevent="resetPassword">
          <label>New Password</label>
          <div class="password-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter new password"
              autocomplete="new-password"
            />
            <span class="toggle" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
          <p v-if="errors.password" class="error">{{ errors.password }}</p>

          <label class="pid">Confirm Password</label>
          <div class="password-box">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Confirm password"
              autocomplete="new-password"
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

  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    return
  }

  // In real app: call your backend API here
  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString()

  console.log('Verification code (for testing):', generatedCode.value)
  alert('A 6-digit verification code has been sent to your email.')

  step.value = 2
}

// STEP 2 ➤ RESEND CODE
function resendCode() {
  generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString()

  console.log('New verification code (for testing):', generatedCode.value)
  alert('A new verification code has been sent to your email.')
}

// STEP 2 ➤ VERIFY CODE
function verifyCode() {
  errors.value.code = ''

  if (!inputCode.value.trim()) {
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

  // In real app: call your backend API to update password here
  alert('Password has been successfully reset!')
  router.push('/login')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #fdf2f8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;          /* ← more side breathing room on very wide screens */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 60px 44px 52px;     /* ← more top padding, slightly less bottom */
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.09);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  color: #111827;
  margin: 0 0 16px 0;          /* ← little more space under heading */
}

.subtitle {
  text-align: center;
  color: #6b7280;
  font-size: 1.05rem;
  margin: 0 0 60px 0;          /* ← increased – main breathing space */
  line-height: 1.45;
  font-weight: 400;
}

label {
  display: block;
  font-size: 1rem;
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
  transition: all 0.2s ease;
  margin-bottom: 4px;          /* ← tiny buffer before error */
}
.pid{
  margin-top: 15px;            /* ← space above confirm password label */
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
  margin: 32px 0 28px;         /* ← generous space above & below button */
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(237, 72, 108, 0.32);
}

.switch {
  text-align: center;
  color: #6b7280;
  font-size: 0.97rem;
  margin: 12px 0 0 0;          /* ← closer to button but not touching */
}

.link {
  color: #ed486c;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 4px 0 20px 0;        /* ← more space after error → next label */
  min-height: 1.25em;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 48px 28px 44px;   /* ← reduced but still comfortable on small screens */
    border-radius: 28px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    margin-bottom: 48px;
  }

  .auth-btn {
    margin: 28px 0 24px;
  }
}
</style>
