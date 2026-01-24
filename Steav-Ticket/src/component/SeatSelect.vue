<template>
  <div class="seat-page">
    <HeadBar />

    <!-- mini header (back + route) -->
    <div class="mini-header container">
      <button class="back-btn" @click="router.back()">←</button>
      <div class="route-title">
        <span class="city">{{ fromLabel }}</span>
        <span class="arrow">→</span>
        <span class="city">{{ toLabel }}</span>
      </div>
    </div>

    <!-- top search bar (display values from home selections) -->
    <div class="container">
      <div class="search-bar">
        <div class="search-item">
          <div class="icon">🚌</div>
          <div class="text">
            <div class="label">From</div>
            <div class="value">{{ fromLabel }}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="search-item">
          <div class="icon">🚌</div>
          <div class="text">
            <div class="label">To</div>
            <div class="value">{{ toLabel }}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="search-item">
          <div class="icon">📅</div>
          <div class="text">
            <div class="label">Date of Journey</div>
            <div class="value">{{ journeyLabel }}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="search-item">
          <div class="icon">📅</div>
          <div class="text">
            <div class="label">Date of Return</div>
            <div class="value">{{ returnLabel }}</div>
          </div>
        </div>

        <button class="search-btn" title="Search">🔍</button>
      </div>
    </div>

    <!-- main content -->
    <div class="container seat-wrap">
      <!-- Seat card -->
      <div class="seat-card">
        <div class="seat-legend">
          <div class="legend-item">
            <span class="seat-icon booked"></span>
            <span>Booked</span>
          </div>
          <div class="legend-item">
            <span class="seat-icon available"></span>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <span class="seat-icon selected"></span>
            <span>Your Seat</span>
          </div>
        </div>

        <div class="seat-grid">
          <!-- column labels A B  C D like screenshot -->
          <div class="col-labels">
            <span></span>
            <span>A</span>
            <span>B</span>
            <span></span>
            <span>C</span>
            <span>D</span>
          </div>

          <!-- seat rows -->
          <div v-for="row in rows" :key="row" class="seat-row">

            <span class="row-num">{{ row }}</span>

            <button
              class="seat-btn"
              :class="seatClass(`A${row}`)"
              :disabled="isBooked(`A${row}`)"
              @click="toggleSeat(`A${row}`)"
            >
              💺
            </button>

            <button
              class="seat-btn"
              :class="seatClass(`B${row}`)"
              :disabled="isBooked(`B${row}`)"
              @click="toggleSeat(`B${row}`)"
            >
              💺
            </button>

            <!-- aisle -->
            <span class="aisle"></span>

            <!-- right group C/D -->
            <button
              class="seat-btn"
              :class="seatClass(`C${row}`)"
              :disabled="isBooked(`C${row}`)"
              @click="toggleSeat(`C${row}`)"
            >
              💺
            </button>

            <button
              class="seat-btn"
              :class="seatClass(`D${row}`)"
              :disabled="isBooked(`D${row}`)"
              @click="toggleSeat(`D${row}`)"
            >
              💺
            </button>
          </div>
        </div>
      </div>

      <!-- Checkout box -->
      <div class="checkout-card">
        <div class="checkout-title">Checkout selected</div>

        <div class="checkout-row">
          <span class="k">Company</span>
          <span class="v">{{ companyLabel }}</span>
        </div>

        <div class="checkout-row">
          <span class="k">Price / seat</span>
          <span class="v">USD {{ price }}</span>
        </div>

        <div class="checkout-row">
          <span class="k">Selected seats</span>
          <span class="v">{{ selectedSeats.length }}</span>
        </div>

        <div class="checkout-row">
          <span class="k">Seat number</span>
          <span class="v seats">{{ selectedSeats.join(', ') || '—' }}</span>
        </div>

        <div class="divider2"></div>

        <div class="checkout-total">
          <span>Total</span>
          <span>USD {{ total }}</span>
        </div>

        <button class="checkout-btn" :disabled="selectedSeats.length === 0" @click="checkout">
          Checkout selected
        </button>

        <p class="hint" v-if="selectedSeats.length === 0">Select at least 1 seat.</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// From Home (via Booking page query)
const fromLabel = computed(() => (route.query.from as string) || '—')
const toLabel = computed(() => (route.query.to as string) || '—')
const journeyISO = computed(() => (route.query.journeyDate as string) || '')
const returnISO = computed(() => (route.query.returnDate as string) || '')

// Trip info from booking card
const companyLabel = computed(() => (route.query.company as string) || '—')
const price = computed(() => Number(route.query.price || 0))

const formatDate = (iso: string) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const day = d.getDate()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${day} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

const journeyLabel = computed(() => formatDate(journeyISO.value))
const returnLabel = computed(() => (returnISO.value ? formatDate(returnISO.value) : '—'))

// seat layout
const rows = [1, 2, 3, 4, 5, 6, 7]

// demo booked seats (red, cannot click)
const bookedSet = new Set<string>([])

const selectedSeats = ref<string[]>([])

const isBooked = (seat: string) => bookedSet.has(seat)
const isSelected = (seat: string) => selectedSeats.value.includes(seat)

const seatClass = (seat: string) => {
  if (isBooked(seat)) return 'booked'
  if (isSelected(seat)) return 'selected'
  return 'available'
}

const toggleSeat = (seat: string) => {
  if (isBooked(seat)) return
  if (isSelected(seat)) {
    selectedSeats.value = selectedSeats.value.filter((s) => s !== seat)
  } else {
    selectedSeats.value = [...selectedSeats.value, seat]
  }
}

const total = computed(() => price.value * selectedSeats.value.length)

const checkout = () => {
  router.push({
    path: '/checkout',
    query: {
      from: fromLabel.value,
      to: toLabel.value,
      journeyDate: journeyISO.value,
      returnDate: returnISO.value,

      company: companyLabel.value,
      price: String(price.value),

      seats: selectedSeats.value.join(','), // A1,B2,C3
      seatCount: String(selectedSeats.value.length),
      total: String(total.value),
    },
  })
}
</script>

<style scoped>
.seat-page {
  min-height: 100vh;
  background: #f6f7fb;
  margin-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* mini header */
.mini-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 14px;
  padding-bottom: 10px;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  font-size: 18px;
}

.route-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: #111;
}

.route-title .arrow {
  color: #999;
}

/* top bar */
.search-bar {
  background: #fff;
  border-radius: 14px;
  display: flex;
  align-items: stretch;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  flex: 1;
  min-width: 0;
}

.icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f2f3f7;
  display: grid;
  place-items: center;
}

.text .label {
  font-size: 12px;
  color: #777;
}

.text .value {
  font-size: 14px;
  font-weight: 800;
  color: #111;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.divider {
  width: 1px;
  background: #eee;
  margin: 10px 0;
}

.search-btn {
  width: 56px;
  border: none;
  cursor: pointer;
  background: #e91e63;
  color: #fff;
  font-size: 18px;
}

/* seat layout + checkout */
.seat-wrap {
  margin-top: 18px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 18px;
  align-items: start;
}

.seat-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  padding: 18px;
}

.seat-legend {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777;
  font-size: 13px;
}

.seat-icon {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  display: inline-block;
}
.seat-icon.booked {
  background: #ff4d6d;
}
.seat-icon.available {
  background: #e6e6e6;
}
.seat-icon.selected {
  background: #31c48d;
}

/* seat grid */
.seat-grid {
  border-radius: 14px;
  border: 1px solid #f0f0f0;
  padding: 14px;
  width: fit-content;
  margin: 0 auto;
}

.col-labels {
  display: grid;
  grid-template-columns: 28px 54px 54px 40px 54px 54px;
  align-items: center;
  color: #888;
  font-size: 12px;
  margin-bottom: 8px;
}

.seat-row {
  display: grid;
  grid-template-columns: 28px 54px 54px 40px 54px 54px;
  align-items: center;
  margin: 8px 0;
}

.row-num {
  color: #aaa;
  font-size: 12px;
  text-align: center;
}

.aisle {
  height: 1px;
}

.seat-btn {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: #fff;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.seat-btn.available {
  color: #c7c7c7;
  border-color: #ededed;
}

.seat-btn.selected {
  color: #31c48d;
  border-color: #31c48d;
  background: #effbf6;
}

.seat-btn.booked {
  color: #ff4d6d;
  border-color: #ff4d6d;
  background: #fff0f3;
  cursor: not-allowed;
  opacity: 0.95;
}

/* checkout */
.checkout-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  padding: 18px;
  position: sticky;
  top: 16px;
}

.checkout-title {
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 12px;
  color: #111;
}

.checkout-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  padding: 8px 0;
  color: #444;
}

.checkout-row .k {
  color: #777;
}
.checkout-row .v {
  font-weight: 800;
  color: #111;
  text-align: right;
}
.checkout-row .v.seats {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.divider2 {
  height: 1px;
  background: #eee;
  margin: 12px 0;
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  font-size: 15px;
  margin-bottom: 12px;
  color: #111;
}

.checkout-btn {
  width: 100%;
  border: none;
  background: #e91e63;
  color: #fff;
  padding: 12px 14px;
  border-radius: 999px;
  font-weight: 900;
  cursor: pointer;
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  margin-top: 10px;
  color: #888;
  font-size: 12px;
}

/* responsive */
@media (max-width: 980px) {
  .seat-wrap {
    grid-template-columns: 1fr;
  }
  .checkout-card {
    position: static;
  }
  .search-bar {
    flex-direction: column;
  }
  .divider {
    width: 100%;
    height: 1px;
    margin: 0;
  }
  .search-btn {
    width: 100%;
    height: 46px;
  }
}
</style>
