<template>
  <div class="checkout-page">
    <div class="container">
      <!-- Header -->
      <div class="top">
        <button class="back-btn" @click="router.back()">←</button>
        <div>
          <h2 class="title">Checkout</h2>
          <p class="sub">Review your trip & complete your booking</p>
        </div>
      </div>

      <div class="grid">
        <!-- LEFT: Trip summary -->
        <div class="card">
          <div class="card-title">Trip summary</div>

          <div class="route">
            <div class="route-city">
              <div class="label">From</div>
              <div class="value">{{ fromLabel }}</div>
            </div>
            <div class="route-arrow">→</div>
            <div class="route-city">
              <div class="label">To</div>
              <div class="value">{{ toLabel }}</div>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <div class="label">Date of Journey</div>
              <div class="value">{{ journeyLabel }}</div>
            </div>
            <div class="info-item">
              <div class="label">Date of Return</div>
              <div class="value">{{ returnLabel }}</div>
            </div>
            <div class="info-item">
              <div class="label">Company</div>
              <div class="value">{{ companyLabel }}</div>
            </div>
            <div class="info-item">
              <div class="label">Price / Seat</div>
              <div class="value">USD {{ price }}</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="seat-box">
            <div class="seat-row">
              <span class="label">Selected seats</span>
              <span class="value">{{ seatCount }}</span>
            </div>
            <div class="seat-row">
              <span class="label">Seat numbers</span>
              <span class="value seats">{{ seatNumbers || '—' }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="card">
          <div class="card-title">Passenger details</div>

          <div class="form">
            <div class="field">
              <label>Full name</label>
              <input v-model="name" />
            </div>
            <div class="field">
              <label>Phone</label>
              <input v-model="phone" />
            </div>
            <div class="field">
              <label>Email</label>
              <input v-model="email" />
            </div>
          </div>

          <div class="divider"></div>

          <div class="card-title">Payment method</div>
          <div class="payment-methods">
            <button
              class="pm"
              :class="{ active: paymentMethod === 'card' }"
              @click="toggleCard"
            >
              💳 Card
            </button>
          </div>

          <div v-show="paymentMethod === 'card'" class="card-form">
            <label class="form-label">Card details</label>

            <div class="form-input" id="card-number"></div>

            <div class="card-row">
              <div class="form-input small" id="card-expiry"></div>
              <div class="form-input small" id="card-cvc"></div>
            </div>
          </div>

          <div class="total-box">
            <div class="total-row">
              <span>Seats</span>
              <span>{{ seatCount }}</span>
            </div>
            <div class="total-row">
              <span>Price / seat</span>
              <span>USD {{ price }}</span>
            </div>
            <div class="total-row total">
              <span>Total</span>
              <span>USD {{ total }}</span>
            </div>

            <button class="pay-btn" @click="confirmBooking">
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiUrl } from '@/lib/api'
import Footer from '@/component/Footer.vue'
import { loadStripe } from '@stripe/stripe-js'

defineOptions({ name: 'CheckoutPage' })

const route = useRoute()
const router = useRouter()

/* TRIP DATA */
const fromLabel = computed(() => route.query.from as string || '—')
const toLabel = computed(() => route.query.to as string || '—')
const companyLabel = computed(() => route.query.company as string || '—')
const price = computed(() => Number(route.query.price || 0))
const seatCount = computed(() => Number(route.query.seatCount || 0))
const seatNumbers = computed(() => route.query.seats as string || '')

const journeyISO = computed(() => route.query.journeyDate as string || '')
const returnISO = computed(() => route.query.returnDate as string || '')

const formatDate = (iso: string) => {
  if (!iso) return '—'
  const d = new Date(iso)
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${d.getDate()} ${m[d.getMonth()]}, ${d.getFullYear()}`
}

const journeyLabel = computed(() => formatDate(journeyISO.value))
const returnLabel = computed(() => returnISO.value ? formatDate(returnISO.value) : '—')

/* FORM */
const name = ref('')
const phone = ref('')
const email = ref('')
const paymentMethod = ref<'cash' | 'card'>('cash')

const toggleCard = () => {
  paymentMethod.value = paymentMethod.value === 'card' ? 'cash' : 'card'
}

const total = computed(() => price.value * seatCount.value)

/* STRIPE */
let stripe: any
let cardNumber: any
let cardExpiry: any
let cardCvc: any

onMounted(async () => {
  stripe = await loadStripe("pk_test_51XXXXXXXXXXXX")// FIX THIS

  const elements = stripe.elements()
  const style = {
    base: { fontSize: '15px' },
    invalid: { color: '#e91e63' },
  }

  cardNumber = elements.create('cardNumber', { style })
  cardExpiry = elements.create('cardExpiry', { style })
  cardCvc = elements.create('cardCvc', { style })

  cardNumber.mount('#card-number')
  cardExpiry.mount('#card-expiry')
  cardCvc.mount('#card-cvc')
})

/* MAIN PAYMENT FUNCTION */
const confirmBooking = async () => {
  if (!name.value || !phone.value || !email.value) {
    alert("Please fill all passenger details")
    return
  }

  if (seatCount.value <= 0) {
    alert("No seat selected")
    return
  }

  const token = localStorage.getItem("access_token")
  if (!token) {
    alert("You must log in first")
    return
  }

  const seatsArray = seatNumbers.value
    ? seatNumbers.value.split(",").map(s => s.trim())
    : []

  /* 💳 CARD PAYMENT */
  if (paymentMethod.value === "card") {

    const res = await fetch(apiUrl("/payments/intent"), {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        scheduleId: route.query.scheduleId,   // ✔ FIXED
        seats: seatsArray
      })
    })



    const { clientSecret, bookingId } = await res.json()

    if (!clientSecret || !bookingId) {
      alert("Payment creation failed")
      return
    }

    // 2. Stripe card confirmation
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          name: name.value,
          email: email.value
        }
      }
    })

    if (error) {
      alert(error.message)
      return
    }

    // 3. mark booking paid
    await fetch(apiUrl("/payments/confirm"), {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ bookingId })
    })

    // 4. Save ticket to localStorage
    const stored = JSON.parse(localStorage.getItem("tickets") || "[]")

    stored.push({
      id: bookingId,
      from: fromLabel.value,
      to: toLabel.value,
      journeyDate: journeyISO.value,
      returnDate: returnISO.value,
      company: companyLabel.value,
      seats: seatNumbers.value,
      seatCount: seatCount.value,
      price: price.value,
      total: total.value,
      status: "ACTIVE",
      bookingDate: new Date().toISOString()
    })

    localStorage.setItem("tickets", JSON.stringify(stored))

    alert("Payment successful!")
    router.push("/ticket")
    return
  }
  router.push("/")
}
</script>


<style scoped>
.checkout-page {
  background: #f6f7fb;
  min-height: 100vh;
  margin-top: 50px;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.top {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  border: none;
  background: white;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-weight: bold;
  margin-bottom: 12px;
}

.route {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  background: #f7f7fb;
  border-radius: 14px;
  padding: 14px;
}

.route-arrow {
  text-align: center;
  font-weight: bold;
}

.info-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 14px 0;
}

.seat-box {
  background: #f7f7fb;
  padding: 12px;
  border-radius: 12px;
}

.seat-row {
  display: flex;
  justify-content: space-between;
}

.form .field {
  margin-bottom: 10px;
}

.field input {
  width: 96%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.pm {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  background: white;
}

.pm.active {
  border-color: #e91e63;
  color: #e91e63;
  background: #fff0f6;
}

.total-box {
  margin-top: 14px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.total-row.total {
  font-weight: bold;
}

.pay-btn {
  width: 100%;
  margin-top: 10px;
  border: none;
  background: #e91e63;
  color: white;
  padding: 12px;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
}

/* snackbar */
.snackbar {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
  z-index: 999;
}

.snack-card {
  background: white;
  border-radius: 18px;
  padding: 24px;
  width: 300px;
  text-align: center;
}

.snack-card button {
  margin-top: 16px;
  width: 100%;
  border: none;
  background: #e91e63;
  color: white;
  padding: 10px;
  border-radius: 999px;
  cursor: pointer;
}
.form-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
  margin-bottom: 8px;
}

.card-row {
  display: flex;
  gap: 10px;
}

.form-input.small {
  flex: 1;
}

/* responsive */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
