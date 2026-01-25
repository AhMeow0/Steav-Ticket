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
              <span class="value seats">{{ seatNumbers || "—" }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Payment -->
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
          <p class="payment-note">Enter your card details below</p>

          <!-- Fake Payment Form -->
          <div class="payment-form">
            <div class="field">
              <label>Cardholder Name</label>
              <input v-model="cardName" placeholder="John Doe" />
            </div>

            <div class="field">
              <label>Card Number</label>
              <input
                v-model="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
              />
            </div>

            <div class="card-row">
              <div class="field small">
                <label>Expiry</label>
                <input
                  v-model="cardExpiry"
                  placeholder="MM/YY"
                  maxlength="5"
                />
              </div>

              <div class="field small">
                <label>CVV</label>
                <input
                  v-model="cardCvc"
                  placeholder="123"
                  maxlength="4"
                  type="password"
                />
              </div>
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
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiUrl } from "@/lib/api";
import Footer from "@/component/Footer.vue";

defineOptions({ name: "CheckoutPage" });

const route = useRoute();
const router = useRouter();

/* TRIP DATA */
const fromLabel = computed(() => route.query.from || "—");
const toLabel = computed(() => route.query.to || "—");
const companyLabel = computed(() => route.query.company || "—");
const price = computed(() => Number(route.query.price || 0));
const seatCount = computed(() => Number(route.query.seatCount || 0));
const seatNumbers = computed(() => route.query.seats || "");
const tripId = computed(() => route.query.tripId);

/* DATES */
const formatDate = (iso: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const journeyLabel = computed(() =>
  formatDate(route.query.journeyDate as string)
);
const returnLabel = computed(() =>
  route.query.returnDate ? formatDate(route.query.returnDate as string) : "—"
);

/* USER INPUTS */
const name = ref("");
const phone = ref("");
const email = ref("");

/* CARD */
const cardName = ref("");
const cardNumber = ref("");
const cardExpiry = ref("");
const cardCvc = ref("");

/* TOTAL */
const total = computed(() => price.value * seatCount.value);

/* BOOKING + PAYMENT */
const confirmBooking = async () => {
  if (!name.value || !phone.value || !email.value) {
    alert("Please fill all passenger details");
    return;
  }

  if (!cardName.value || !cardNumber.value || !cardExpiry.value || !cardCvc.value) {
    alert("Please fill all card details");
    return;
  }

  /* AUTH TOKEN */
/* AUTH TOKEN (fully compatible) */
const token =
  localStorage.getItem("access_token") ||
  localStorage.getItem("token") ||
  JSON.parse(localStorage.getItem("user") || "{}").token;

if (!token) {
  alert("Please login first");
  router.push("/login");
  return;
}


  /* SEATS ARRAY */
  const seatsArray = seatNumbers.value
    ? (seatNumbers.value as string)
        .split(",")
        .map((s: string) => s.trim())
    : [];

  /* 1️⃣ HOLD SEATS */
  const holdRes = await fetch(apiUrl("/bookings/hold"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tripId: tripId.value,
      seatNos: seatsArray,
      totalPrice: total.value,
    }),
  });

const booking = await holdRes.json();
console.log("HOLD RESPONSE:", booking);
console.log("STATUS:", holdRes.status);
console.log("BODY SENT:", {
  tripId: tripId.value,
  seatNos: seatsArray,
  totalPrice: total.value
});


  /* 2️⃣ PAYMENT MOCK */
  const payRes = await fetch(apiUrl("/payments/mock"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookingId: booking._id }),
  });

  const payment = await payRes.json();

  if (!payment.success) {
    alert("Payment failed! Try again.");
    return;
  }

  alert("Payment successful! Booking confirmed.");
  router.push("/");
};
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

.form .field {
  margin-bottom: 10px;
}

.field input {
  width: 96%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

/* PAYMENT FORM */
.payment-form {
  background: #f7f7fb;
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 20px;
}

.payment-form .field {
  margin-bottom: 12px;
}

.payment-form input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
}

.card-row {
  display: flex;
  gap: 10px;
}

.card-row .field.small input {
  width: 100%;
}

/* TOTAL BOX */
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
</style>
