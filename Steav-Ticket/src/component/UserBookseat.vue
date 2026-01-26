<template>
  <div class="booking-page">
    <HeadBar />

    <!-- mini header -->
    <div class="mini-header container">
      <button class="back-btn" @click="goBack">←</button>

      <div class="route-title">
        <span class="city">{{ fromLabel }}</span>
        <span class="arrow">→</span>
        <span class="city">{{ toLabel }}</span>
      </div>
    </div>

    <!-- Search Bar -->
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

        <button class="search-btn" @click="fetchTrips">🔍</button>
      </div>
    </div>

    <!-- Results -->
    <div class="container results">
      <div v-if="formattedTrips.length === 0" class="no-results">
        No trips found.
      </div>

      <div v-for="trip in formattedTrips" :key="trip.id" class="trip-card">
        <div class="trip-left">
          <img class="logo" src="https://via.placeholder.com/90x40?text=BUS" />
          <div class="company">
            <div class="name">{{ trip.company }}</div>
            <div class="type">Bus</div>
            <div class="seat">{{ trip.seats }} Seats</div>
          </div>
        </div>

        <div class="trip-mid">
          <div class="time-block">
            <div class="time">{{ trip.departTime }}</div>
            <div class="place">{{ fromLabel }}</div>
          </div>

          <div class="line-block">
            <div class="line"></div>
            <div class="duration">—</div>
            <div class="line"></div>
          </div>

          <div class="time-block right">
            <div class="time">—</div>
            <div class="place">{{ toLabel }}</div>
          </div>
        </div>

        <div class="trip-right">
          <div class="price">USD {{ trip.price }}</div>
          <button class="seat-btn" @click="viewSeats(trip)">View seats</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeadBar from "@/component/HeadBar.vue";

interface Schedule {
  _id: string;
  origin: string;
  destination: string;
  departureTime: string;
  price?: number;
  totalSeats?: number;
  bookedSeats?: number[];
  busId?: {
    companyName?: string;
    busPlate?: string;
    capacity?: number;
  };
}

const router = useRouter();
const route = useRoute();

// Query parameters from home page
const from = computed(() => (route.query.from as string) || "");
const to = computed(() => (route.query.to as string) || "");
const journeyDate = ref((route.query.journeyDate as string) || "");
const returnDate = ref((route.query.returnDate as string) || "");

// Labels
const fromLabel = computed(() => from.value || "—");
const toLabel = computed(() => to.value || "—");

const formatDate = (iso: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const journeyLabel = computed(() => formatDate(journeyDate.value));

// Raw schedules from backend
const trips = ref<Schedule[]>([]);

// Format API → UI-friendly trip card
const formattedTrips = computed(() =>
  trips.value.map((t) => {
    const depart = new Date(t.departureTime);

    return {
      id: t._id,
      company: t.busId?.companyName || "Unknown Company",
      busPlate: t.busId?.busPlate || "—",
      seats: t.totalSeats ?? t.busId?.capacity ?? 0,
      departTime: depart.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: t.price ?? 0,
      raw: t,
    };
  })
);

// Fetch from API
async function fetchTrips() {
  try {
    const res = await fetch("http://localhost:3000/api/routes")
    const data: Schedule[] = await res.json()

    const selectedDate = new Date(journeyDate.value).toDateString()

    trips.value = data.filter((s) => {
      const scheduleDate = new Date(s.departureTime).toDateString()
      return (
        s.origin === from.value &&
        s.destination === to.value &&
        scheduleDate === selectedDate   
      )
    })

  } catch (e) {
    console.error("Failed to fetch trips", e)
  }
}


onMounted(fetchTrips);

const goBack = () => router.back();

// View seats
const viewSeats = (trip: any) => {
  router.push({
    path: "/seat-select",
    query: {
      from: from.value,
      to: to.value,
      journeyDate: journeyDate.value,
      returnDate: returnDate.value,

      company: trip.company,
      busPlate: trip.busPlate,
      seats: trip.seats,
      price: String(trip.price),
      departTime: trip.departTime,
      scheduleId: trip.id,
    },
  });
};
</script>

<style scoped>
.booking-page {
  margin-top: 80px;
  min-height: 100vh;
  background: #f6f7fb;
  padding-bottom: 30px;
}

.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 25px;
}

/* mini header */
.mini-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 14px;
  padding-bottom: 10px;
  height: 100px;
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
  font-weight: bold;
  color: #111;
}

.route-title .arrow {
  color: #999;
}

/* search bar */
.search-bar {
  background: #fff;
  border-radius: 14px;
  display: flex;
  align-items: stretch;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100px;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  min-width: 0;
  flex: 1;
}

.icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f2f3f7;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.text .label {
  font-size: 12px;
  color: #777;
  line-height: 1.1;
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

.clear-btn {
  width: 44px;
  border: none;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.search-btn {
  width: 56px;
  border: none;
  cursor: pointer;
  background: #e91e63;
  color: #fff;
  font-size: 18px;
}

/* results */
.results {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trip-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  display: grid;
  grid-template-columns: 280px 1fr 160px;
  gap: 12px;
  align-items: center;
  height: 125px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}

.trip-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.logo {
  width: 92px;
  height: 42px;
  object-fit: contain;
}

.company .name {
  font-weight: 900;
  color: #111;
}

.company .type,
.company .seat {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.trip-mid {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  gap: 10px;
}

.time-block .time {
  font-weight: 900;
  color: #111;
  font-size: 14px;
}

.time-block .place {
  font-size: 12px;
  color: #777;
  margin-top: 2px;
}

.time-block.right {
  text-align: right;
}

.line-block {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.line {
  height: 2px;
  background: #ddd;
  flex: 1;
  border-radius: 999px;
}

.duration {
  font-weight: 900;
  color: #111;
  font-size: 13px;
  min-width: 28px;
  text-align: center;
}

.trip-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.price {
  font-weight: 900;
  color: #111;
  font-size: 16px;
}

.seat-btn {
  border: none;
  background: #e91e63;
  color: #fff;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 900;
  cursor: pointer;
}

/* responsive */
@media (max-width: 900px) {
  .trip-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .trip-right {
    align-items: flex-start;
  }
  .trip-mid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .time-block.right {
    text-align: left;
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
    border-radius: 0;
  }
  .clear-btn {
    width: 100%;
    height: 40px;
  }
}
</style>
