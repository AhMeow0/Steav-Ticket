<template>
  <div class="manage-ticket-price-page">
    <div class="manage-ticket-price__form">
      <h1 class="manage-ticket-price__title">Manage Ticket Price</h1>

      <p v-if="error" class="manage-ticket-price__message manage-ticket-price__message--error">
        {{ error }}
      </p>
      <p
        v-else-if="success"
        class="manage-ticket-price__message manage-ticket-price__message--success"
      >
        {{ success }}
      </p>

      <div class="manage-ticket-price__grid">
        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">From</label>
          <select class="manage-ticket-price__select" v-model="formOrigin">
            <option disabled value="">Select City</option>
            <option>Phnom Penh</option>
            <option>Siem Reap</option>
            <option>Sihanoukville</option>
            <option>Kampot</option>
            <option>Battambang</option>
          </select>
        </div>

        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">To</label>
          <select class="manage-ticket-price__select" v-model="formDestination">
            <option disabled value="">Select City</option>
            <option>Phnom Penh</option>
            <option>Siem Reap</option>
            <option>Sihanoukville</option>
            <option>Kampot</option>
            <option>Battambang</option>
          </select>
        </div>

        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">Price ($)</label>
          <input
            class="manage-ticket-price__input"
            type="number"
            min="0"
            step="0.01"
            v-model.number="selectedPrice"
            placeholder="e.g. 12.50"
          />
        </div>
      </div>

      <button class="manage-ticket-price__button" @click="saveSelectedPrice" :disabled="loading">
        {{ loading ? 'Saving...' : 'Confirm Price' }}
      </button>
    </div>

    <div class="manage-ticket-price__table">
      <h1 class="manage-ticket-price__title">Assigned Ticket Price</h1>

      <table v-if="ticketPrices.length">
        <thead>
          <tr>
            <th style="text-align: left">Route</th>
            <th>Current Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in ticketPrices" :key="p._id">
            <td style="text-align: left">{{ p.origin }} ➔ {{ p.destination }}</td>
            <td>{{ formatPrice(Number(p.price || 0)) }}</td>
            <td>
              <span
                class="manage-ticket-price__status"
                :class="Number(p.price || 0) > 0 ? 'manage-ticket-price__status--assigned' : 'manage-ticket-price__status--unset'"
              >
                {{ Number(p.price || 0) > 0 ? 'Assigned' : 'Not set' }}
              </span>
            </td>
            <td>
              <button class="manage-ticket-price__small-btn" @click="startEditPrice(p)">Edit</button>
              <button
                class="manage-ticket-price__small-btn manage-ticket-price__small-btn--danger"
                @click="clearPrice(p)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else style="text-align: center; padding: 20px; color: #888">No ticket prices found.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/lib/api'

interface TicketPrice {
  _id: string
  origin: string
  destination: string
  price: number
}

const router = useRouter()

const ticketPrices = ref<TicketPrice[]>([])
const loading = ref(false)
const error = ref('')
const success = ref('')

const formOrigin = ref('')
const formDestination = ref('')
const selectedPrice = ref<number>(0)

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value ?? 0)
}

onMounted(async () => {
  await fetchTicketPrices()
})

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as unknown
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = (data as { message?: unknown }).message
      if (typeof message === 'string') return message
      if (Array.isArray(message)) return message.filter((m) => typeof m === 'string').join(', ')
    }
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`
}

async function fetchTicketPrices() {
  error.value = ''
  try {
    const res = await fetch(apiUrl('/ticket-prices'))
    if (!res.ok) {
      error.value = await readErrorMessage(res)
      return
    }
    ticketPrices.value = (await res.json()) as TicketPrice[]
  } catch (e) {
    console.error(e)
    error.value = 'Network Error'
  }
}

async function saveSelectedPrice() {
  if (!formOrigin.value || !formDestination.value) {
    error.value = 'Please select From and To.'
    return
  }
  if (formOrigin.value === formDestination.value) {
    error.value = 'From and To cannot be the same.'
    return
  }
  await savePairPrice(formOrigin.value, formDestination.value, selectedPrice.value)
}

async function savePairPrice(origin: string, destination: string, price: number) {
  const token = localStorage.getItem('access_token')
  if (!token) {
    error.value = 'You must be logged in as Admin.'
    void router.push({ name: 'LoginPage' })
    return
  }

  const priceToSave = Number(price)
  if (!Number.isFinite(priceToSave) || priceToSave < 0) {
    error.value = 'Invalid price.'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''
  try {
    // 1) Save the base price (works even if no routes exist yet)
    const res = await fetch(apiUrl('/ticket-prices'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ origin, destination, price: priceToSave }),
    })

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('access_token')
        void router.push({ name: 'LoginPage' })
        return
      }
      error.value = await readErrorMessage(res)
      return
    }

    // 2) Best-effort: sync any existing routes of this pair
    try {
      await fetch(apiUrl('/routes/bulk/price'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ origin, destination, price: priceToSave }),
      })
    } catch {
      // ignore (backend might not have this endpoint in some environments)
    }

    success.value = 'Ticket price updated.'
    await fetchTicketPrices()
  } catch (e) {
    console.error(e)
    error.value = 'Network Error'
  } finally {
    loading.value = false
  }
}

function startEditPrice(p: TicketPrice) {
  formOrigin.value = p.origin
  formDestination.value = p.destination
  selectedPrice.value = Number(p.price ?? 0)
  success.value = ''
  error.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function clearPrice(p: TicketPrice) {
  if (!confirm('Delete this ticket price?')) return

  const token = localStorage.getItem('access_token')
  if (!token) {
    error.value = 'You must be logged in as Admin.'
    void router.push({ name: 'LoginPage' })
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const res = await fetch(apiUrl(`/ticket-prices/${p._id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('access_token')
        void router.push({ name: 'LoginPage' })
        return
      }
      error.value = await readErrorMessage(res)
      return
    }

    // Best-effort: reset any existing routes of this pair to 0
    try {
      await fetch(apiUrl('/routes/bulk/price'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ origin: p.origin, destination: p.destination, price: 0 }),
      })
    } catch {
      // ignore
    }

    success.value = 'Ticket price deleted.'
    await fetchTicketPrices()
  } catch (e) {
    console.error(e)
    error.value = 'Network Error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.manage-ticket-price-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.manage-ticket-price__message {
  margin: 0 0 14px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.3;
}

.manage-ticket-price__message--error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fecaca;
}

.manage-ticket-price__message--success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #bbf7d0;
}


.manage-ticket-price__form,
.manage-ticket-price__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}


.manage-ticket-price__title {
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: bold;
}


.manage-ticket-price__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}


.manage-ticket-price__field {
  display: flex;
  flex-direction: column;
}

.manage-ticket-price__label {
  margin-bottom: 6px;
}

.manage-ticket-price__input,
.manage-ticket-price__select {
  width: 90%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}

/* Button */
.manage-ticket-price__button {
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

th {
  padding: 12px;
  border-bottom: 1px solid #333;
  text-align: center;
}

td {
  padding: 12px;
  border-bottom: 1px solid #333;
  text-align: center;
}

.manage-ticket-price__small-btn {
  background: #10b981;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 600;
}

.manage-ticket-price__small-btn--danger {
  background: rgba(239, 68, 68, 0.9);
  margin-left: 10px;
}

.manage-ticket-price__status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.manage-ticket-price__status--assigned {
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #bbf7d0;
}

.manage-ticket-price__status--unset {
  background: rgba(156, 163, 175, 0.12);
  border: 1px solid rgba(156, 163, 175, 0.25);
  color: #d1d5db;
}
</style>
