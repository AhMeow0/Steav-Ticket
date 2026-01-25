<template>
  <div class="manage-route-page">

    <!-- Form Section -->
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Route & Schedules</h1>

      <p v-if="error" class="manage-route-page__message manage-route-page__message--error">
        {{ error }}
      </p>
      <p
        v-else-if="success"
        class="manage-route-page__message manage-route-page__message--success"
      >
        {{ success }}
      </p>

      <div class="manage-route-page__grid">
        <div class="manage-route-page__field">
          <label class="manage-route-page__label">From</label>
          <select v-model="form.origin" class="manage-route-page__select">
            <option disabled value="">Select City</option>
            <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">To</label>
          <select v-model="form.destination" class="manage-route-page__select">
            <option disabled value="">Select City</option>
            <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
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
          <label class="manage-route-page__label">Bus</label>
          <select v-model="form.busId" class="manage-route-page__select" @change="onBusChange">
            <option disabled value="">Select Bus</option>
            <option v-for="b in buses" :key="b._id" :value="b._id">
              {{ b.busPlate }} — {{ b.companyName }}
            </option>
          </select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Company Name</label>
          <input
            type="text"
            :value="selectedBus?.companyName || ''"
            class="manage-route-page__input"
            placeholder="Auto from bus"
            disabled
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
            <th>Bus Plate</th>
            <th>Route</th>
            <th>Time</th>
            <th class="price-col">Seats</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in schedules" :key="item._id">
            <td>{{ item.company || item.busId?.companyName || 'Bus' }}</td>
            <td>{{ item.busId?.busPlate || item.routeNumber || '—' }}</td>
            <td>{{ item.origin }} ➔ {{ item.destination }}</td>
            <td>{{ formatDepartTime(item.departureTime) }}</td>
            <td class="price-col">{{ remainingSeats(item) }} / {{ item.totalSeats ?? 0 }}</td>
            <td>
              <div class="action-group">
                <button class="action-btn action-btn--edit" @click="startEdit(item)">
                  Edit
                </button>
                <button class="action-btn action-btn--delete" @click="deleteSchedule(item._id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else style="text-align: center; padding: 20px; color: #888">No schedules found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiUrl } from '@/lib/api'

type Bus = {
  _id: string
  companyName?: string
  busPlate?: string
  capacity?: number
}

type RouteSchedule = {
  _id: string
  origin: string
  destination: string
  departureTime: string
  price: number
  company?: string
  routeNumber?: string
  totalSeats?: number
  bookedSeats?: number[]
  busId?: Bus
}

const cities = ['Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Kampot', 'Battambang']

const loading = ref(false)
const error = ref<string>('')
const success = ref<string>('')

const buses = ref<Bus[]>([])
const schedules = ref<RouteSchedule[]>([])

const editingId = ref<string | null>(null)

const form = ref({
  origin: '',
  destination: '',
  departureTime: '',
  busId: '',
})

const selectedBus = computed(() => buses.value.find((b) => b._id === form.value.busId) ?? null)

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function toDateTimeLocalValue(value: string): string {
  if (!value) return ''

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    return value.slice(0, 16)
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

function bookedSeatsCount(item: RouteSchedule): number {
  return Array.isArray(item.bookedSeats) ? item.bookedSeats.length : 0
}

function remainingSeats(item: RouteSchedule): number {
  const total = Number(item.totalSeats ?? 0)
  return Math.max(0, total - bookedSeatsCount(item))
}

function clearMessages() {
  error.value = ''
  success.value = ''
}

function onBusChange() {
  // price/routeNumber/totalSeats are managed in other admin tasks
  // so selecting a bus here is only for linking route <-> bus and auto company name.
}

async function fetchBuses() {
  try {
    const res = await fetch(apiUrl('/buses'))
    if (res.ok) {
      buses.value = (await res.json()) as Bus[]
    }
  } catch (e) {
    console.error('Error fetching buses', e)
  }
}

async function fetchSchedules() {
  try {
    const res = await fetch(apiUrl('/routes'))
    if (res.ok) {
      schedules.value = (await res.json()) as RouteSchedule[]
    }
  } catch (e) {
    console.error('Error fetching routes', e)
  }
}

function resetForm() {
  editingId.value = null
  form.value = {
    origin: '',
    destination: '',
    departureTime: '',
    busId: '',
  }
}

function cancelEdit() {
  resetForm()
  clearMessages()
}

function startEdit(item: RouteSchedule) {
  clearMessages()
  editingId.value = item._id
  form.value = {
    origin: item.origin,
    destination: item.destination,
    departureTime: item.departureTime,
    busId: item.busId?._id ?? '',
  }
}

async function saveSchedule() {
  clearMessages()

  if (!form.value.origin || !form.value.destination || !form.value.departureTime) {
    error.value = 'Please fill From, To, and Depart Time.'
    return
  }

  loading.value = true
  try {
    const token = localStorage.getItem('access_token')
    const isEditing = Boolean(editingId.value)
    const url = isEditing ? apiUrl(`/routes/${editingId.value}`) : apiUrl('/routes')

    const payload: Record<string, unknown> = {
      origin: form.value.origin,
      destination: form.value.destination,
      departureTime: form.value.departureTime,
    }

    if (form.value.busId) payload.busId = form.value.busId
    const response = await fetch(url, {
      method: isEditing ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let message = 'Request failed'
      try {
        const data = await response.json()
        if (typeof data?.message === 'string') message = data.message
        else if (Array.isArray(data?.message)) message = data.message.join(', ')
      } catch {
        // ignore
      }
      error.value = message
      return
    }

    success.value = isEditing ? 'Schedule updated successfully!' : 'Schedule created successfully!'
    await fetchSchedules()
    resetForm()
  } catch (e) {
    console.error(e)
    error.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}

async function deleteSchedule(id: string) {
  clearMessages()
  if (!confirm('Are you sure?')) return

  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch(apiUrl(`/routes/${id}`), {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) {
      error.value = 'Delete failed'
      return
    }
    success.value = 'Deleted.'
    await fetchSchedules()
  } catch (e) {
    console.error(e)
    error.value = 'Network error while deleting.'
  }
}

onMounted(async () => {
  await Promise.all([fetchBuses(), fetchSchedules()])
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

.manage-route-page__message {
  margin: 0 0 14px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.3;
}

.manage-route-page__message--error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fecaca;
}

.manage-route-page__message--success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #bbf7d0;
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

.action-group {
  display: inline-flex;
  gap: 10px;
}

.action-btn {
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}

.action-btn:active {
  transform: translateY(1px);
}

.action-btn--edit {
  background: rgba(59, 130, 246, 0.14);
  border-color: rgba(59, 130, 246, 0.35);
  color: #bfdbfe;
}

.action-btn--edit:hover {
  background: rgba(59, 130, 246, 0.22);
}

.action-btn--delete {
  background: rgba(239, 68, 68, 0.14);
  border-color: rgba(239, 68, 68, 0.35);
  color: #fecaca;
}

.action-btn--delete:hover {
  background: rgba(239, 68, 68, 0.22);
}

</style>
