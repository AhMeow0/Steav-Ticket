<template>
  <div class="manage-route-page">
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Route & Schedules</h1>

      <div class="manage-route-page__grid">
        <div class="manage-route-page__field">
          <label class="manage-route-page__label">From</label>
          <select v-model="form.origin" class="manage-route-page__select">
            <option disabled value="">Select City</option>
            <option>Phnom Penh</option>
            <option>Siem Reap</option>
            <option>Sihanoukville</option>
            <option>Kampot</option>
            <option>Battambang</option>
          </select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">To</label>
          <select v-model="form.destination" class="manage-route-page__select">
            <option disabled value="">Select City</option>
            <option>Phnom Penh</option>
            <option>Siem Reap</option>
            <option>Sihanoukville</option>
            <option>Kampot</option>
            <option>Battambang</option>
          </select>
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
          <tr v-for="item in schedules" :key="item._id">
            <td>{{ item.company || 'Bus' }}</td>
            <td>{{ item.origin }} ➔ {{ item.destination }}</td>
            <td>{{ formatDepartTime(item.departureTime) }}</td>
            <td class="price-col">{{ formatPrice(item.price) }}</td>
            <td class="price-col">
              {{ item.totalSeats - item.bookedSeats.length }} / {{ item.totalSeats }}
            </td>
            <td>
              <button class="edit-btn" @click="startEdit(item)">Edit</button>
              <button class="delete-btn" @click="deleteSchedule(item._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else style="text-align: center; padding: 20px; color: #888">No schedules found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { apiUrl } from '@/lib/api'

interface Schedule {
  _id: string
  origin: string
  destination: string
  departureTime: string
  price: number
  company?: string
  routeNumber?: string
  totalSeats: number
  bookedSeats: number[]
}

const loading = ref(false)
const schedules = ref<Schedule[]>([])
const editingId = ref<string | null>(null)

const form = ref({
  origin: '',
  destination: '',
  departureTime: '',
  price: 0,
  company: '',
  routeNumber: '',
  totalSeats: 40,
})

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function toDateTimeLocalValue(value: string): string {
  if (!value) return ''

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    return value.slice(0, 16)
  }

  if (/^\d{2}:\d{2}$/.test(value)) {
    const now = new Date()
    const parts = value.split(':')
    const hh = Number(parts[0] ?? 0)
    const mm = Number(parts[1] ?? 0)
    now.setHours(Number.isFinite(hh) ? hh : 0, Number.isFinite(mm) ? mm : 0, 0, 0)
    const yyyy = now.getFullYear()
    const MM = pad2(now.getMonth() + 1)
    const dd = pad2(now.getDate())
    const HH = pad2(now.getHours())
    const min = pad2(now.getMinutes())
    return `${yyyy}-${MM}-${dd}T${HH}:${min}`
  }

  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const yyyy = d.getFullYear()
  const MM = pad2(d.getMonth() + 1)
  const dd = pad2(d.getDate())
  const HH = pad2(d.getHours())
  const min = pad2(d.getMinutes())
  return `${yyyy}-${MM}-${dd}T${HH}:${min}`
}

function fromDateTimeLocalValue(value: string): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toISOString()
}

const departureTimeLocal = computed({
  get() {
    return toDateTimeLocalValue(form.value.departureTime)
  },
  set(value: string) {
    form.value.departureTime = fromDateTimeLocalValue(value)
  },
})

function formatDepartTime(value: string): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value ?? 0)
}

// 1. Fetch existing schedules on load
onMounted(async () => {
  await fetchSchedules()
})

async function fetchSchedules() {
  try {
    const res = await fetch(apiUrl('/routes'))
    if (res.ok) {
      schedules.value = (await res.json()) as Schedule[]
    }
  } catch (err) {
    console.error('Error fetching schedules', err)
  }
}

function cancelEdit() {
  editingId.value = null
  form.value = {
    origin: '',
    destination: '',
    departureTime: '',
    price: 0,
    company: '',
    routeNumber: '',
    totalSeats: 40,
  }
}

function startEdit(item: Schedule) {
  editingId.value = item._id
  form.value = {
    origin: item.origin,
    destination: item.destination,
    departureTime: item.departureTime,
    price: item.price,
    company: item.company ?? '',
    routeNumber: item.routeNumber ?? '',
    totalSeats: item.totalSeats ?? 40,
  }
}

// 2. Create or Update a Schedule
async function saveSchedule() {
  const token = localStorage.getItem('access_token')
  if (!token) return alert('You must be logged in as Admin!')

  if (
    !form.value.origin ||
    !form.value.destination ||
    !form.value.departureTime ||
    !form.value.price
  ) {
    return alert('Please fill in all fields')
  }

  loading.value = true
  try {
    const isEditing = Boolean(editingId.value)
    const url = isEditing ? apiUrl(`/routes/${editingId.value}`) : apiUrl('/routes')

    const payload: Record<string, unknown> = {
      origin: form.value.origin,
      destination: form.value.destination,
      departureTime: form.value.departureTime,
      price: Number(form.value.price),
      company: form.value.company,
      totalSeats: Number(form.value.totalSeats) || 40,
    }

    if (form.value.routeNumber && form.value.routeNumber.trim()) {
      payload.routeNumber = form.value.routeNumber.trim()
    }

    const response = await fetch(url, {
      method: isEditing ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Admin Token
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      alert(isEditing ? 'Schedule updated successfully!' : 'Schedule created successfully!')
      await fetchSchedules() // Refresh table
      cancelEdit()
    } else {
      let message = 'Unknown error'
      try {
        const err = await response.json()
        message = err?.message ?? message
      } catch {
        // ignore JSON parse errors
      }

      if (response.status === 401) {
        alert('Unauthorized: please log in again (token invalid/expired).')
        return
      }

      if (response.status === 403) {
        alert('Forbidden: your account is not admin.')
        return
      }

      alert('Failed: ' + message)
    }
  } catch (error) {
    console.error(error)
    alert('Network Error')
  } finally {
    loading.value = false
  }
}

// 3. Delete Schedule
async function deleteSchedule(id: string) {
  if (!confirm('Are you sure?')) return

  const token = localStorage.getItem('access_token')
  if (!token) {
    alert('You must be logged in as Admin!')
    return
  }
  await fetch(apiUrl(`/routes/${id}`), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  fetchSchedules()
}
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
.manage-route-page__input,
.manage-route-page__select {
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

.edit-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}
</style>
