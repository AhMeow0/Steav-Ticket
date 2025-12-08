<template>
  <div class="page-wrapper">
    <HeadBar />
    
    <div class="container content-area">
      <h2 class="section-title">Ticket</h2>
      
      <div class="ticket-card" v-for="(ticket, index) in currentTickets" :key="'active-'+index">
        <div class="ticket-info">
          <div class="route-header">
            <span class="city-code">{{ ticket.fromCode }}</span>
            <span class="arrow">➔</span>
            <span class="city-code">{{ ticket.toCode }}</span>
          </div>
          
          <div class="ticket-details-grid">
            <div class="detail-item">
              <span class="label">Booking Date:</span>
              <span class="value">{{ ticket.bookingDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Bus:</span>
              <span class="value">{{ ticket.busName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Departure:</span>
              <span class="value">{{ ticket.departDate }}</span>
            </div>
             <div class="detail-item">
              <span class="label">Time:</span>
              <span class="value">{{ ticket.departTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Seat:</span>
              <span class="value">{{ ticket.seat }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Price:</span>
              <span class="value">${{ ticket.price }}</span>
            </div>
          </div>
        </div>
        
        <div class="ticket-qr">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ExampleTicket" alt="QR Code" />
        </div>
      </div>

      <h2 class="section-title">History</h2>
      
      <div class="ticket-card history" v-for="(ticket, index) in historyTickets" :key="'hist-'+index">
        <div class="ticket-info">
          <div class="route-header">
             <span class="city-code">{{ ticket.fromCode }}</span>
            <span class="arrow">➔</span>
            <span class="city-code">{{ ticket.toCode }}</span>
          </div>
           <div class="ticket-details-grid">
            <div class="detail-item">
              <span class="label">Booking Date:</span>
              <span class="value">{{ ticket.bookingDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Bus:</span>
              <span class="value">{{ ticket.busName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Status:</span>
              <span class="value status-done">Completed</span>
            </div>
             <div class="detail-item">
              <span class="label">Price:</span>
              <span class="value">${{ ticket.price }}</span>
            </div>
          </div>
        </div>
        <div class="ticket-qr faded">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=HistoryTicket" alt="QR Code" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import HeadBar from './HeadBar.vue';
import { ref } from 'vue';

// Mock Data
const currentTickets = ref([
  { fromCode: 'PP', toCode: 'SR', bookingDate: '14 Nov 2023', busName: 'VET Express', departDate: '15 Nov 2023', departTime: '11:00 AM', seat: 'B2', price: '15.00' }
]);

const historyTickets = ref([
  { fromCode: 'PP', toCode: 'KP', bookingDate: '22 Oct 2023', busName: 'Larryta', departDate: '23 Oct 2023', departTime: '08:00 AM', seat: 'C1', price: '12.00' }
]);
</script>

<style scoped>
.page-wrapper { background-color: #f9f9f9; min-height: 100vh; }
.content-area { padding-top: 2rem; }

.section-title { font-weight: bold; margin-bottom: 1rem; color: #333; }

.ticket-card {
  background: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border-left: 5px solid #E91E63; /* Pink accent */
}

.ticket-info { flex: 1; }

.route-header { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;}
.city-code { font-size: 1.8rem; }
.arrow { color: #888; font-size: 1.2rem; }

.ticket-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.detail-item { display: flex; flex-direction: column; }
.label { font-size: 0.8rem; color: #888; font-weight: 600;}
.value { font-size: 1rem; font-weight: 500; color: #333; }

.ticket-qr {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;
  border-left: 1px dashed #ddd;
}

.ticket-qr img { width: 100px; height: 100px; }

/* History Style Variation */
.history { opacity: 0.8; border-left: 5px solid #888; }
.status-done { color: green; }
</style>