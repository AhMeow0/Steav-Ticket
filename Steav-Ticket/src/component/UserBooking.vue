<template>
  <div class="page-wrapper">
    <HeadBar />

    <div class="container content-area">
      <h2 class="section-title">My Current Tickets</h2>

      <div v-if="loading" class="loading">Loading tickets...</div>

      <div v-if="!loading && currentTickets.length === 0" class="no-tickets">
        <p>You haven't booked any tickets yet.</p>
        <router-link to="/explore" class="book-btn">Book Now</router-link>
      </div>

      <div class="ticket-card" v-for="(ticket, index) in currentTickets" :key="'active-'+index">
        <div class="ticket-info">
          <div class="route-header">
            <span class="city-code">PP</span>
            <span class="arrow">➔</span>
            <span class="city-code">{{ ticket.toCode }}</span>
          </div>

          <div class="ticket-details-grid">
            <div class="detail-item">
              <span class="label">Passenger:</span>
              <span class="value">{{ ticket.passengerName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Seat:</span>
              <span class="value">{{ ticket.seat }}</span>
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
              <span class="label">Status:</span>
              <span class="value status-active">{{ ticket.status }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Price:</span>
              <span class="value">${{ ticket.price }}</span>
            </div>
          </div>
        </div>

        <div class="ticket-qr">
          <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.id}`" alt="QR Code" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import HeadBar from './HeadBar.vue';
import { ref, onMounted } from 'vue';

const currentTickets = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    alert("Please login to view your tickets");
    loading.value = false;
    return;
  }

  try {
    // 1. Fetch from Backend
    // Ensure this matches your Backend URL (check if you used 'api' prefix in main.ts)
    const response = await fetch('http://localhost:3000/api/tickets/my-tickets', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();

      // 2. Map Backend Data to Frontend UI
      // Backend returns: { _id, destination, departureTime, price, seatNumber, ... }
      currentTickets.value = data.map((t: any) => ({
        id: t._id,
        toCode: t.destination ? t.destination.substring(0, 2).toUpperCase() : 'NA', // "Siem Reap" -> "SI"
        bookingDate: 'N/A', // You can add createdAt in backend schema later
        passengerName: t.passengerName,
        departDate: t.departureTime, // Assuming you saved full date string
        departTime: t.departureTime,
        seat: t.seatNumber,
        price: t.price,
        status: t.status || 'BOOKED'
      }));
    } else {
      console.error('Failed to fetch tickets');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-wrapper { background-color: #f9f9f9; min-height: 100vh; }
.content-area { padding-top: 2rem; }
.section-title { font-weight: bold; margin-bottom: 1rem; color: #333; }

.loading, .no-tickets { text-align: center; padding: 2rem; color: #666; }
.book-btn { color: #E91E63; font-weight: bold; text-decoration: none; }

.ticket-card {
  background: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border-left: 5px solid #E91E63;
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
.status-active { color: #E91E63; font-weight: bold; }

.ticket-qr {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;
  border-left: 1px dashed #ddd;
}
.ticket-qr img { width: 100px; height: 100px; }
</style>
