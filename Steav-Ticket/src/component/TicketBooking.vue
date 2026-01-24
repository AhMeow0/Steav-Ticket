<template>
  <div class="page-wrapper">
    <HeadBar />

    <div class="container content-area">
      <h2 class="section-title">Ticket</h2>

      <div v-if="currentTickets.length === 0" class="empty">No active tickets yet.</div>

      <div class="ticket-card" v-for="(ticket, index) in currentTickets" :key="'active-' + index">
        <div class="ticket-info">
          <div class="route-header">
            <span class="city-code">{{ code(ticket.from) }}</span>
            <span class="arrow">➔</span>
            <span class="city-code">{{ code(ticket.to) }}</span>
          </div>

          <div class="ticket-details-grid">
            <div class="detail-item">
              <span class="label">Booking Date:</span>
              <span class="value">{{ formatDate(ticket.bookingDate) }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Bus:</span>
              <span class="value">{{ ticket.company }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Departure:</span>
              <span class="value">{{ formatDate(ticket.journeyDate) }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Return:</span>
              <span class="value">{{
                ticket.returnDate ? formatDate(ticket.returnDate) : '—'
              }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Seat:</span>
              <span class="value">{{ ticket.seats || '—' }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Total:</span>
              <span class="value">${{ ticket.total }}</span>
            </div>
          </div>
        </div>

        <div class="ticket-qr">
          <img :src="qrUrl(String(ticket.id))" alt="QR Code" />
        </div>
      </div>

      <h2 class="section-title">History</h2>

      <div v-if="historyTickets.length === 0" class="empty">No history tickets yet.</div>

      <div
        class="ticket-card history"
        v-for="(ticket, index) in historyTickets"
        :key="'hist-' + index"
      >
        <div class="ticket-info">
          <div class="route-header">
            <span class="city-code">{{ code(ticket.from) }}</span>
            <span class="arrow">➔</span>
            <span class="city-code">{{ code(ticket.to) }}</span>
          </div>

          <div class="ticket-details-grid">
            <div class="detail-item">
              <span class="label">Booking Date:</span>
              <span class="value">{{ formatDate(ticket.bookingDate) }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Bus:</span>
              <span class="value">{{ ticket.company }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Status:</span>
              <span class="value status-done">Completed</span>
            </div>

            <div class="detail-item">
              <span class="label">Total:</span>
              <span class="value">${{ ticket.total }}</span>
            </div>
          </div>
        </div>

        <div class="ticket-qr faded">
          <img :src="qrUrl(String(ticket.id))" alt="QR Code" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/component/Footer.vue'
import HeadBar from '@/component/HeadBar.vue'
import { computed, ref } from 'vue'

type Ticket = {
  id: number | string
  from: string
  to: string
  journeyDate: string
  returnDate?: string
  company: string
  seats: string
  seatCount: number
  price: number
  total: number
  status: 'ACTIVE' | 'COMPLETED'
  bookingDate: string // we will ensure it exists
}

const tickets = ref<Ticket[]>([])

const loadTickets = () => {
  const raw = JSON.parse(localStorage.getItem('tickets') || '[]') as Array<Partial<Ticket>>

  // ✅ ensure bookingDate exists even for old saved tickets
  tickets.value = raw.map((t) => ({
    ...(t as Ticket),
    bookingDate: t.bookingDate ?? new Date().toISOString(),
  }))
}

loadTickets()

const currentTickets = computed(() => tickets.value.filter((t) => t.status === 'ACTIVE'))
const historyTickets = computed(() => tickets.value.filter((t) => t.status === 'COMPLETED'))

const code = (city: string) => {
  const map: Record<string, string> = {
    'Phnom Penh': 'PP',
    'Siem Reab': 'SR',
    Battambang: 'BB',
    'Sihanuk villige': 'SHV',
    'Poi pet': 'PP',
  }
  return map[city] || city.slice(0, 2).toUpperCase()
}

const formatDate = (iso: string) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
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
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

const qrUrl = (data: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data)}`
</script>

<style scoped>
.page-wrapper {
  background-color: #f9f9f9;
  min-height: 100vh;
}

.content-area {
  background-color: #e0ddde;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.empty {
  background: #fff;
  padding: 14px 16px;
  border-radius: 12px;
  margin-bottom: 18px;
  color: #666;
}

.ticket-card {
  background: rgb(255, 255, 255);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 20px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #e91e63;
}

.ticket-info {
  flex: 1;
}

.route-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.city-code {
  font-size: 1.8rem;
}
.arrow {
  color: #888;
  font-size: 1.2rem;
}

.ticket-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.8rem;
  color: #888;
  font-weight: 600;
}
.value {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.ticket-qr {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;
  border-left: 1px dashed #ddd;
}

.ticket-qr img {
  width: 100px;
  height: 100px;
}

.history {
  opacity: 0.8;
  border-left: 5px solid #888;
}
.status-done {
  color: green;
}
.faded {
  opacity: 0.6;
}
</style>
