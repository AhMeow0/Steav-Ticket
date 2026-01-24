<template>
  <div class="manage-route-page">
    <!-- Form Section -->
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Route & Schedules</h1>

      <div class="manage-route-page__grid">
        <div class="manage-route-page__field">
          <label class="manage-route-page__label">From</label>
          <input
            class="manage-route-page__input"
            type="text"
            placeholder="Enter from"
            v-model="from"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">To</label>
          <input class="manage-route-page__input" type="text" placeholder="Enter to" v-model="to" />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Depart Time</label>
          <input
            type="datetime-local"
            v-model="departureTimeLocal"
            class="manage-route-page__input"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Price ($)</label>
          <input
            type="number"
            v-model.number="form.price"
            min="1"
            step="0.01"
            class="manage-route-page__input"
            placeholder="e.g. 15"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Company Name</label>
          <input
            type="text"
            v-model="form.company"
            class="manage-route-page__input"
            placeholder="e.g. Virak Buntham"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Route Number (optional)</label>
          <input
            type="text"
            v-model="form.routeNumber"
            class="manage-route-page__input"
            placeholder="e.g. R-101"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Total Seats</label>
          <input
            type="number"
            v-model.number="form.totalSeats"
            min="1"
            step="1"
            class="manage-route-page__input"
            placeholder="e.g. 40"
          />
        </div>
      </div>

      <button @click="saveSchedule" class="manage-route-page__button">
        {{ loading ? 'Saving...' : editingId ? 'Save Changes' : 'Confirm Create' }}
      </button>
      <button
        v-if="editingId"
        @click="cancelEdit"
        class="manage-route-page__button manage-route-page__button--secondary"
        :disabled="loading"
      >
        Cancel
      </button>
    </div>

    <div class="manage-route-page__table">
      <h1 class="manage-route-page__title">Active Schedules</h1>

      <table v-if="schedules.length > 0">
        <thead>
          <tr>
            <th>Company</th>
            <th>Route</th>
            <th>Time</th>
            <th class="price-col">Price</th>
            <th class="price-col">Seats</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="route in routes" :key="route._id">
            <td>{{ route.startLocation }}</td>
            <td>{{ route.endLocation }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else style="text-align: center; padding: 20px; color: #888">No schedules found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface Route {
  _id: string
  startLocation: string
  endLocation: string
}

export default defineComponent({
  name: 'ManageRoute',
  data() {
    return {
      from: '' as string,
      to: '' as string,
      routes: [] as Route[],
    }
  },
  mounted() {
    this.fetchRoutes()
  },
  methods: {
    async fetchRoutes(): Promise<void> {
      try {
        const response = await axios.get<Route[]>('http://localhost:3000/routes')
        this.routes = response.data
      } catch (error) {
        console.error('Failed to fetch route: ', error)
      }
    },
    async createRoute(): Promise<void> {
      try {
        await axios.post('http://localhost:3000/routes', {
          startLocation: this.from,
          endLocation: this.to,
        })
      } catch (error) {
        console.error('Failed to create route: ', error)
      }
    },
  },
})
</script>

<style scoped>
.manage-route-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}
.manage-route-page__form,
.manage-route-page__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.manage-route-page__title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
}
.manage-route-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.manage-route-page__field {
  display: flex;
  flex-direction: column;
}
.manage-route-page__label {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #aaa;
}

/* Inputs */
.manage-route-page__input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  background: #1f2937;
  border: 1px solid #374151;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}
.manage-route-page__button {
  margin-top: 20px;
  background: #10b981;
  padding: 12px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: 0.2s;
}
.manage-route-page__button:hover {
  background: #059669;
}

.manage-route-page__button--secondary {
  margin-left: 10px;
  background: #374151;
}

.manage-route-page__button--secondary:hover {
  background: #4b5563;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th {
  padding: 12px;
  border-bottom: 1px solid #374151;
  text-align: left;
  color: #9ca3af;
}
td {
  padding: 12px;
  border-bottom: 1px solid #374151;
}
.price-col {
  text-align: right;
  white-space: nowrap;
}
.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
