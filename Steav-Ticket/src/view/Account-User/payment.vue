<template>
  <div class="checkout-wrapper">
    <div class="payment-card">
      <div class="card-visual">
        <div class="card-chip"></div>
        <div class="card-logo">VISA</div>
        <div class="card-number-display">
          {{ formattedCardNumber || '#### #### #### ####' }}
        </div>
        <div class="card-details-row">
          <div class="card-detail">
            <span class="label">Card Holder</span>
            <span class="value">You</span>
          </div>
          <div class="card-detail">
            <span class="label">Expires</span>
            <span class="value">{{ formattedExpiry || 'MM/YY' }}</span>
          </div>
        </div>
      </div>

      <div class="ticket-summary">
        <div class="summary-header">
          <h3>Trip Summary</h3>
          <span class="price-tag">$10.00</span>
        </div>
        <div class="route-line">
          <div class="city">Phnom Penh</div>
          <div class="arrow">➝</div>
          <div class="city">Siem Reap</div>
        </div>
        <div class="seat-badge">Seat: <strong>A1</strong></div>
      </div>

      <div class="form-body">
        <div class="input-group">
          <label>Card Number</label>
          <div class="input-wrapper">
            <span class="icon">💳</span>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              v-model="cardNumber"
              @input="formatCardNumber"
              maxlength="19"
            />
          </div>
        </div>

        <div class="row">
          <div class="input-group">
            <label>Expiry Date</label>
            <div class="input-wrapper">
              <span class="icon">📅</span>
              <input
                type="text"
                placeholder="MM/YY"
                v-model="expiry"
                @input="formatExpiry"
                maxlength="5"
              />
            </div>
          </div>

          <div class="input-group">
            <label>CVC</label>
            <div class="input-wrapper">
              <span class="icon">🔒</span>
              <input type="text" placeholder="123" v-model="cvc" maxlength="3" />
            </div>
          </div>
        </div>

        <button @click="payNow" :class="{ loading: isProcessing }" :disabled="isProcessing">
          <span v-if="!isProcessing">Pay Securely $10.00</span>
          <span v-else>Processing...</span>
        </button>

        <transition name="fade">
          <div
            v-if="message"
            class="status-message"
            :class="{ success: isSuccess, error: !isSuccess }"
          >
            {{ message }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')
const message = ref('')
const isProcessing = ref(false)
const isSuccess = ref(false)

// Computed properties for the Visual Card
const formattedCardNumber = computed(() => cardNumber.value)
const formattedExpiry = computed(() => expiry.value)

// 1. Auto-format Card Number (adds spaces)
function formatCardNumber(e: Event) {
  let val = (e.target as HTMLInputElement).value.replace(/\D/g, '') // Remove non-digits
  val = val.replace(/(.{4})/g, '$1 ').trim() // Add space every 4 chars
  cardNumber.value = val
}

// 2. Auto-format Expiry (adds slash)
function formatExpiry(e: Event) {
  let val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  if (val.length >= 2) {
    val = val.substring(0, 2) + '/' + val.substring(2)
  }
  expiry.value = val
}

function payNow() {
  message.value = ''

  if (!cardNumber.value || !expiry.value || !cvc.value) {
    isSuccess.value = false
    message.value = 'Please fill in all details.'
    return
  }

  // Simulate loading API call
  isProcessing.value = true

  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    message.value = 'Payment Successful! Ticket sent to email.'
  }, 1500)
}
</script>

<style scoped>
/* Google Font Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.checkout-wrapper {
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.payment-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

/* --- 1. The Visual Card --- */
.card-visual {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  margin: 25px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(118, 75, 162, 0.4);
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-chip {
  width: 40px;
  height: 30px;
  background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
  border-radius: 6px;
  position: relative;
}
.card-chip::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.card-logo {
  position: absolute;
  top: 25px;
  right: 25px;
  font-weight: bold;
  font-style: italic;
  font-size: 1.2rem;
  opacity: 0.8;
}

.card-number-display {
  font-size: 1.4rem;
  letter-spacing: 2px;
  font-family: 'Courier New', Courier, monospace;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.card-details-row {
  display: flex;
  justify-content: space-between;
}

.card-detail {
  display: flex;
  flex-direction: column;
}

.card-detail .label {
  font-size: 0.7rem;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 2px;
}

.card-detail .value {
  font-weight: 600;
  letter-spacing: 1px;
}

/* --- 2. Ticket Summary --- */
.ticket-summary {
  background-color: #f8f9fa;
  margin: 0 25px 20px;
  padding: 15px;
  border-radius: 12px;
  border: 1px dashed #ced4da;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.summary-header h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-tag {
  color: #764ba2;
  font-weight: 800;
  font-size: 1.1rem;
}

.route-line {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #343a40;
}

.arrow {
  color: #adb5bd;
}

.seat-badge {
  display: inline-block;
  margin-top: 8px;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #495057;
}

/* --- 3. Form Styling --- */
.form-body {
  padding: 0 25px 30px;
}

.row {
  display: flex;
  gap: 15px;
}

.row .input-group {
  flex: 1;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: 12px;
  font-size: 1.1rem;
  opacity: 0.5;
  z-index: 10;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Space for icon */
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #764ba2;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  margin-top: 10px;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button.loading {
  background: #adb5bd;
  cursor: not-allowed;
}

.status-message {
  margin-top: 15px;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
