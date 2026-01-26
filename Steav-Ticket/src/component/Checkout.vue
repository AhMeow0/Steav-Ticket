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

            <button class="pay-btn" :disabled="isSubmitting" @click="confirmBooking">
              {{ isSubmitting ? "Processing…" : "Confirm & Pay" }}
            </button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
import { eventBus } from "@/eventBus";
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

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

/* TOTAL */
const total = computed(() => price.value * seatCount.value);

type LocalTicket = {
  id: string;
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
  company: string;
  seats: string;
  seatCount: number;
  price: number;
  total: number;
  status: 'ACTIVE' | 'COMPLETED';
  bookingDate: string;
};

function saveTicketToLocalStorage(ticket: LocalTicket) {
  const raw = JSON.parse(localStorage.getItem('tickets') || '[]') as unknown;
  const list: LocalTicket[] = Array.isArray(raw) ? (raw as LocalTicket[]) : [];
  const existingIndex = list.findIndex((t) => t && t.id === ticket.id);
  if (existingIndex >= 0) {
    list[existingIndex] = { ...list[existingIndex], ...ticket };
  } else {
    list.unshift(ticket);
  }
  localStorage.setItem('tickets', JSON.stringify(list));
}

function extractApiErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const message = record.message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) {
    const parts = message.filter((m): m is string => typeof m === "string");
    if (parts.length) return parts.join(", ");
  }
  const error = record.error;
  if (typeof error === "string") return error;
  return null;
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function normalizeCardNumber(v: string): string {
  return v.replace(/\s+/g, "");
}

function isValidExpiry(v: string): boolean {
  // MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)) return false;
  const parts = v.split("/");
  if (parts.length !== 2) return false;
  const mm = Number(parts[0]);
  const yy = Number(parts[1]);
  if (!Number.isFinite(mm) || !Number.isFinite(yy)) return false;
  const fullYear = 2000 + yy;
  const now = new Date();
  const endOfMonth = new Date(fullYear, mm, 0, 23, 59, 59, 999);
  return endOfMonth >= now;
}

/* BOOKING + PAYMENT */
const confirmBooking = async () => {
  if (isSubmitting.value) return;
  errorMessage.value = null;

  if (!tripId.value) {
    errorMessage.value = "Missing trip info. Please go back and select a trip again.";
    return;
  }

  if (!seatNumbers.value || seatCount.value <= 0) {
    errorMessage.value = "Please select at least one seat.";
    return;
  }

  if (!name.value || !phone.value || !email.value) {
    errorMessage.value = "Please fill all passenger details.";
    return;
  }
  if (!isValidEmail(email.value)) {
    errorMessage.value = "Please enter a valid email.";
    return;
  }

  const cleanCard = normalizeCardNumber(cardNumber.value);
  if (!cardName.value || !cleanCard || !cardExpiry.value || !cardCvc.value) {
    errorMessage.value = "Please fill all card details.";
    return;
  }
  if (!/^\d{12,19}$/.test(cleanCard)) {
    errorMessage.value = "Card number looks invalid.";
    return;
  }
  if (!isValidExpiry(cardExpiry.value)) {
    errorMessage.value = "Card expiry looks invalid.";
    return;
  }
  if (!/^\d{3,4}$/.test(cardCvc.value)) {
    errorMessage.value = "CVV looks invalid.";
    return;
  }

  if (total.value <= 0) {
    errorMessage.value = "Total price is invalid. Please re-check your trip price.";
    return;
  }

  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    JSON.parse(localStorage.getItem("user") || "{}").token;

  if (!token) {
    errorMessage.value = "Please login first.";
    router.push("/login");
    return;
  }

  const seatsArray = seatNumbers.value
    ? (seatNumbers.value as string)
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  if (seatsArray.length === 0) {
    errorMessage.value = "Please select at least one seat.";
    return;
  }

  isSubmitting.value = true;
  try {
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

    const booking = await holdRes.json().catch(() => ({}));
    if (!holdRes.ok) {
      errorMessage.value =
        extractApiErrorMessage(booking) ||
        `Booking failed (HTTP ${holdRes.status}).`;
      return;
    }

    if (!booking?._id) {
      errorMessage.value = "Booking failed: missing booking id from server.";
      return;
    }

    const payRes = await fetch(apiUrl("/payments/mock"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId: booking._id }),
    });

    const payment = await payRes.json().catch(() => ({}));
    if (!payRes.ok) {
      errorMessage.value =
        extractApiErrorMessage(payment) ||
        `Payment failed (HTTP ${payRes.status}).`;
      return;
    }

    if (!payment?.success) {
      errorMessage.value = payment?.message || "Payment failed. Please try again.";
      return;
    }

    const formattedSeats = String(seatNumbers.value || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(', ');

    // Save to Ticket page (localStorage) - matches TicketBooking.vue fields
    saveTicketToLocalStorage({
      id: String(booking._id),
      from: String(fromLabel.value || ''),
      to: String(toLabel.value || ''),
      journeyDate: String(route.query.journeyDate || ''),
      returnDate: route.query.returnDate ? String(route.query.returnDate) : undefined,
      company: String(companyLabel.value || ''),
      seats: formattedSeats,
      seatCount: Number(seatCount.value || 0),
      price: Number(price.value || 0),
      total: Number(total.value || 0),
      status: 'ACTIVE',
      bookingDate: new Date().toISOString(),
    });

    if (payment?.success) {

      eventBus.refreshNotifications = true;  // <--- triggers header reload
      
      router.push("/booking");
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>


<style scoped>
.checkout-page {
  background: #f6f7fb;
  min-height: 100vh;
  margin-top: 50px;
}

.error {
  margin-top: 10px;
  color: #b42318;
  font-size: 13px;
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
  width: 95%;
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
  width: 90%;
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
