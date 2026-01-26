<template>
  <div class="manage-booking-passenger-page">
    <div class="form-box">
      <h1>Manage Booking & Passenger</h1>

      <div class="form-grid">
        <div class="form-field">
          <label>Routes</label>
          <select v-model="selectedDestination">
            <option value="">All</option>
            <option v-for="r in routeList" :key="r.key" :value="r.key">{{ r.label }}</option>
          </select>
        </div>
        
        <div class="form-field">
          <label>Time</label>
          <select v-model="selectedDepartureTime">
            <option value="">All</option>
            <option v-for="t in departureTimes" :key="t" :value="t">{{ formatTime(t) }}</option>
          </select>
        </div>
      </div>

      <button class="save-btn" :disabled="loading" @click="applyFilter">
        {{ loading ? 'Loading...' : 'Apply Filter' }}
      </button>
    </div>

    <div class="table-box">
      <h1>Assigned Booking & Passenger</h1>

      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Username</th>
            <th>Seats</th>
            <th>Date of Journey</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="b in bookings" :key="b._id">
            <td>{{ b.routeName }}</td>

            <td>{{ b.user?.name ?? b.user?.email ?? '-' }}</td>

            <td>
              {{ Array.isArray(b.seatNumbers) && b.seatNumbers.length ? b.seatNumbers.join(', ') :
                  Array.isArray(b.seatNos) && b.seatNos.length ? b.seatNos.join(', ') :
                  b.seatNumber || '-' }}
            </td>

            <td>{{ formatTime(b.departureTime) }}</td>

            <td>{{ b.status }}</td>

            <td>
              <button class="action-btn" @click="updateStatus(b._id, 'CONFIRMED')">Confirm</button>
              <button class="action-btn action-btn--secondary" @click="updateStatus(b._id, 'CANCELLED')">Cancel</button>
            </td>
          </tr>

          <tr v-if="!loading && bookings.length === 0">
            <td colspan="6">No bookings found</td>
          </tr>
        </tbody>
      </table>

      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiUrl } from '@/lib/api'

type RouteSchedule = {
  _id: string;
  origin: string;
  destination: string;
  departureTime: string;
};

type BookingRow = {
  _id: string;
  origin: string;
  destination: string;
  routeName: string;
  departureTime: string;
  seatNumbers?: string[];
  seatNos?: string[];
  seatNumber?: number;
  passengerName: string;
  status: string;
  price: number;
  bookingDate?: string;
  user: { _id: string; name?: string; email?: string };
};

const loading = ref(false);
const error = ref('');

const routes = ref<RouteSchedule[]>([]);
const bookings = ref<BookingRow[]>([]);

const selectedDestination = ref('');
const selectedDepartureTime = ref('');

const routeList = computed(() => {
  const set = new Map<string, { key: string; label: string }>();

  for (const r of routes.value) {
    const key = `${r.origin}__${r.destination}`;
    const label = `${r.origin} → ${r.destination}`;

    if (!set.has(key)) {
      set.set(key, { key, label });
    }
  }

  return Array.from(set.values());
});

const departureTimes = computed(() => {
  const set = new Set<string>();
  const [origin, destination] = selectedDestination.value.split('__') ?? [];

  const filtered = selectedDestination.value
    ? routes.value.filter(r => r.origin === origin && r.destination === destination)
    : routes.value;

  for (const r of filtered) {
    if (r.departureTime) set.add(r.departureTime);
  }

  return Array.from(set).sort();
});

function formatTime(isoOrString: string) {
  const d = new Date(isoOrString);
  if (isNaN(d.getTime())) return isoOrString;
  return d.toLocaleString();
}

async function fetchRoutes() {
  try {
    const response = await fetch(apiUrl('/routes'));
    if (!response.ok) throw new Error('Failed to load routes');
    routes.value = await response.json();
  } catch (err) {
    console.error(err);
  }
}

async function fetchBookings() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    error.value = 'You must be logged in as Admin!';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const qs = new URLSearchParams();

    if (selectedDestination.value) {
      const [origin, destination] = selectedDestination.value.split('__');
      qs.set('origin', origin || '');
      qs.set('destination', destination || '');
    }

    if (selectedDepartureTime.value) qs.set('departureTime', selectedDepartureTime.value || '');

    const url = apiUrl(`/admin/bookings${qs.toString() ? `?${qs.toString()}` : ''}`);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      error.value = 'Failed to load bookings';
      return;
    }

    bookings.value = await response.json();
  } catch (err) {
    console.error(err);
    error.value = 'Network Error';
  } finally {
    loading.value = false;
  }
}

async function updateStatus(id: string, status: 'CONFIRMED' | 'CANCELLED') {
  const token = localStorage.getItem('access_token');
  if (!token) {
    error.value = 'You must be logged in as Admin!';
    return;
  }

  error.value = '';
  try {
    const response = await fetch(apiUrl(`/admin/bookings/${id}/status`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        error.value = 'Unauthorized: please log in again.';
        return;
      }
      if (response.status === 403) {
        error.value = 'Forbidden: your account is not admin.';
        return;
      }
      error.value = 'Failed to update status';
      return;
    }

    // Re-fetch bookings to reflect status change
    await fetchBookings();
  } catch (err) {
    console.error(err);
    error.value = 'Network Error';
  }
}

function applyFilter() {
  fetchBookings();
}

onMounted(() => {
  fetchRoutes();
  fetchBookings();
});
</script>

<style scoped>
.manage-booking-passenger-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.form-box,
.table-box {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

h1 {
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: bold;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-size: 14px;
  color: #e5e7eb;
}

input,
select {
  width: 85%;
  height: 60px;
  padding: 0 18px;
  background: #111827;
  color: white;
  border-radius: 8px;
  border: 1px solid #424242;
  outline: none;
  font-size: 14px;
}

.save-btn {
  margin-top: 20px;
  background: #4caf50;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: center;
}

.action-btn {
  background: #4caf50;
  padding: 10px 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  margin-right: 8px;
}

.action-btn--secondary {
  background: #111827;
  border: 1px solid #424242;
}

.error {
  margin-top: 12px;
  color: #e5e7eb;
}
</style>
