<template>
  <div class="booking-wrapper">
    <div class="header-section">
      <h2>Phnom Penh <span class="arrow">→</span> Siem Reap</h2>
      <div class="legend">
        <div class="legend-item">
          <div class="seat-icon available"></div>
          <span>Available</span>
        </div>
        <div class="legend-item">
          <div class="seat-icon selected"></div>
          <span>Selected</span>
        </div>
        <div class="legend-item">
          <div class="seat-icon booked"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>

    <div class="bus-container">
      <div class="bus-body">
        <div class="driver-section">
          <div class="wheel"></div>
          <span class="label">Driver</span>
        </div>

        <div class="seats-grid">
          <template v-for="(seat, index) in seats" :key="seat.id">
            <div
              class="seat-wrapper"
              :class="{ 'aisle-gap': index % 4 === 2 }"
              @click="toggleSeat(seat)"
            >
              <div
                class="seat-shape"
                :class="{
                  'is-selected': seat.selected,
                  'is-booked': seat.booked,
                }"
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"
                  />
                </svg>
                <span class="seat-name">{{ seat.name }}</span>
              </div>
            </div>

            <div v-if="index % 4 === 1" class="aisle-spacer"></div>
          </template>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <div class="total-info">
        <span class="label">Total Price</span>
        <span class="price">${{ totalPrice.toFixed(2) }}</span>
        <span class="seat-count" v-if="selectedSeats.length > 0">
          ({{ selectedSeats.length }} seats)
        </span>
      </div>

      <button
        @click="bookTickets"
        :disabled="selectedSeats.length === 0"
        :class="{ active: selectedSeats.length > 0 }"
      >
        {{ selectedSeats.length > 0 ? 'Book Now' : 'Select Seats' }}
      </button>
    </div>

    <transition name="pop">
      <div v-if="message" class="toast-message">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const price = 10
const seats = ref(
  Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `A${i + 1}`,
    booked: [2, 5, 6].includes(i), // Simulate some already booked seats
    selected: false,
  })),
)

const selectedSeats = computed(() => seats.value.filter((seat) => seat.selected))
const totalPrice = computed(() => selectedSeats.value.length * price)
const message = ref('')

function toggleSeat(seat: any) {
  if (seat.booked) return
  seat.selected = !seat.selected
}

function bookTickets() {
  selectedSeats.value.forEach((seat) => (seat.booked = true))
  message.value = `Success! You booked: ${selectedSeats.value.map((s) => s.name).join(', ')}`

  // Clear selection
  seats.value.forEach((seat) => (seat.selected = false))

  // Hide message after 3 seconds
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.booking-wrapper {
  font-family: 'Poppins', sans-serif;
  max-width: 450px;
  margin: 40px auto;
  background-color: #f4f6f9;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

/* --- HEADER --- */
.header-section {
  background: white;
  padding: 20px 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  z-index: 10;
}

h2 {
  font-size: 1.1rem;
  color: #2d3436;
  margin: 0 0 15px 0;
}

.arrow {
  color: #0984e3;
  padding: 0 5px;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #636e72;
}

.seat-icon {
  width: 14px;
  height: 14px;
  border-radius: 4px;
}

.seat-icon.available {
  background: #dfe6e9;
  border: 1px solid #b2bec3;
}
.seat-icon.selected {
  background: #0984e3;
}
.seat-icon.booked {
  background: #2d3436;
  opacity: 0.3;
}

/* --- BUS LAYOUT --- */
.bus-container {
  flex: 1;
  padding: 30px 20px 100px; /* Bottom padding for action bar */
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.bus-body {
  background: white;
  padding: 40px 25px;
  border-radius: 40px 40px 10px 10px; /* Rounded front */
  border: 2px solid #e2e6ea;
  position: relative;
  width: 100%;
  max-width: 320px;
}

/* Driver */
.driver-section {
  position: absolute;
  top: 20px;
  right: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
}

.wheel {
  width: 30px;
  height: 30px;
  border: 3px solid #2d3436;
  border-radius: 50%;
  position: relative;
  margin-bottom: 2px;
}
.wheel::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #2d3436;
}

.label {
  font-size: 0.6rem;
  text-transform: uppercase;
}

/* Grid */
.seats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 2 seats, spacer, 2 seats */
  gap: 12px 0; /* Vertical gap only */
  margin-top: 50px;
}

.aisle-spacer {
  grid-column: 3; /* The middle column is the aisle */
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  color: #b2bec3;
  writing-mode: vertical-rl;
}

.seat-wrapper {
  display: flex;
  justify-content: center;
}

.seat-shape {
  width: 42px;
  height: 48px;
  background-color: #fff;
  border: 2px solid #dfe6e9;
  border-radius: 8px 8px 4px 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  color: #b2bec3;
}

.seat-shape svg {
  margin-bottom: -5px;
  width: 20px;
  height: 20px;
}

.seat-name {
  font-size: 0.65rem;
  font-weight: 600;
  margin-top: 2px;
}

/* States */
.seat-shape:hover:not(.is-booked):not(.is-selected) {
  border-color: #0984e3;
  color: #0984e3;
  transform: translateY(-2px);
}

.seat-shape.is-selected {
  background-color: #0984e3;
  border-color: #0984e3;
  color: white;
  box-shadow: 0 4px 10px rgba(9, 132, 227, 0.4);
  transform: scale(1.05);
}

.seat-shape.is-booked {
  background-color: #f1f2f6;
  border-color: transparent;
  color: #dcdde1;
  cursor: not-allowed;
}

/* --- BOTTOM ACTION BAR --- */
.action-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 20px 30px;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-info {
  display: flex;
  flex-direction: column;
}

.total-info .label {
  font-size: 0.75rem;
  color: #636e72;
  margin-bottom: 2px;
}

.total-info .price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
}

.seat-count {
  font-size: 0.75rem;
  color: #0984e3;
}

button {
  background-color: #dfe6e9;
  color: #636e72;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: not-allowed;
  transition: all 0.3s;
}

button.active {
  background: linear-gradient(135deg, #0984e3 0%, #74b9ff 100%);
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(9, 132, 227, 0.3);
}

button.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(9, 132, 227, 0.4);
}

/* Toast Notification */
.toast-message {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #00b894;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  box-shadow: 0 5px 15px rgba(0, 184, 148, 0.4);
  white-space: nowrap;
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
