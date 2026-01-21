<template>
  <div class="manage-buses-page">
    <!-- Form Section -->
    <div class="manage-buses-page__form">
      <h1 class="manage-buses-page__title">Manage Buses</h1>

      <div class="manage-buses-page__grid">
        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Bus Plate</label>
          <input
            class="manage-buses-page__input"
            type="text"
            placeholder="AC - 123456"
            v-model="busPlate"
          />
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Bus Type</label>
          <select class="manage-buses-page__select" v-model="busType">
            <option value="">Select type</option>
            <option value="VIP">VIP</option>
            <option value="Bus">Standard</option>
            <option value="Sleeper">Sleeper</option>
          </select>
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Capacity (Seats)</label>
          <input
            class="manage-buses-page__input"
            type="number"
            placeholder="0"
            v-model.number="capacity"
          />
        </div>
      </div>

      <button class="manage-buses-page__button" @click="saveBus">Save Buses</button>
    </div>

    <!-- Table Section -->
    <div class="manage-buses-page__table">
      <h1 class="manage-buses-page__title">Assigned Buses</h1>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Bus Plate</th>
            <th>Bus Type</th>
            <th>Capacity</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(bus, index) in buses" :key="bus._id">
            <td>{{ index + 1 }}</td>
            <td>{{ bus.busPlate }}</td>
            <td>{{ bus.busType }}</td>
            <td>{{ bus.capacity }}</td>
            <td>
              <button class="delete-btn" @click="deleteBus(bus._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiUrl } from '@/lib/api'

type Bus = {
  _id: string
  busPlate: string
  busType: string
  capacity: number
}

const API_URL = apiUrl('/buses')

const busPlate = ref('')
const busType = ref('')
const capacity = ref(0)

const buses = ref<Bus[]>([])

const fetchBuses = async () => {
  const res = await fetch(API_URL)
  buses.value = (await res.json()) as Bus[]
}

const saveBus = async () => {
  if (!busPlate.value || !busType.value) {
    alert('Please fill all fields')
    return
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      busPlate: busPlate.value,
      busType: busType.value,
      capacity: capacity.value,
    }),
  })

  busPlate.value = ''
  busType.value = ''
  capacity.value = 0

  fetchBuses()
}
const deleteBus = async (id: string) => {
  if (!confirm('Are you sure you want to delete this bus?')) {
    return
  }

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  fetchBuses()
}

onMounted(fetchBuses)
</script>

<style scoped>
.manage-buses-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

/* Sections */
.manage-buses-page__form,
.manage-buses-page__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.manage-buses-page__title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
}

.manage-buses-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.manage-buses-page__field {
  display: flex;
  flex-direction: column;
}

.manage-buses-page__label {
  margin-bottom: 6px;
}

.manage-buses-page__input,
.manage-buses-page__select {
  width: 90%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}

.manage-buses-page__button {
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
.delete-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  opacity: 0.8;
}
</style>
