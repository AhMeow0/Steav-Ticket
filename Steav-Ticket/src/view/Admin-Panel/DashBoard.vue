<template>
  <main class="dashboard-main">
    <h1>Dashboard</h1>

    <p v-if="error" class="dashboard-error">{{ error }}</p>

    <!-- Top Stats -->
    <div class="stats-box">
      <div class="stat-card stat-card--trips">
        <h3>Total Trips</h3>
        <p>{{ loading ? '...' : stats.totalTrips }}</p>
      </div>

      <div class="stat-card stat-card--books">
        <h3>Total Book Seat</h3>
        <p>{{ loading ? '...' : stats.totalBookings }}</p>
      </div>

      <div class="stat-card stat-card--earns">
        <h3>Total Earn</h3>
        <p>{{ loading ? '...' : `$${stats.totalEarn}` }}</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="filter">
      <select v-model="period" @change="fetchStats">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="all">All</option>
      </select>
    </div>

    <!-- Chart -->
    <div class="charts-grid">
      <section class="chart-card">
        <div class="chart-title">Earnings Trend</div>

        <div v-if="loading" class="chart-placeholder">Loading...</div>
        <div v-else-if="series.length === 0" class="chart-placeholder">No data</div>
        <div v-else class="chart-wrap">
          <svg
            class="chart"
            :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
            role="img"
            aria-label="Earnings chart"
          >
            <polyline :points="earnPolyline" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>
          <div class="xlabels">
            <span v-for="(t, idx) in xLabels" :key="idx">{{ t }}</span>
          </div>
        </div>
      </section>

      <section class="chart-card">
        <div class="chart-title">Booking Status</div>

        <div v-if="loading" class="chart-placeholder">Loading...</div>
        <div v-else-if="statusBreakdown.length === 0" class="chart-placeholder">No data</div>
        <div v-else class="donut-wrap">
          <svg class="donut" :viewBox="`0 0 120 120`" role="img" aria-label="Booking status donut">
            <g transform="translate(60, 60) rotate(-90)">
              <circle :r="donutRadius" cx="0" cy="0" class="donut-track" />
              <circle
                v-for="seg in donutSegments"
                :key="seg.status"
                :r="donutRadius"
                cx="0"
                cy="0"
                class="donut-seg"
                :style="{
                  stroke: seg.color,
                  strokeDasharray: `${seg.len} ${donutCircumference - seg.len}`,
                  strokeDashoffset: `${-seg.offset}`,
                }"
              />
            </g>
            <text x="60" y="58" text-anchor="middle" class="donut-center-value">
              {{ donutTotal }}
            </text>
            <text x="60" y="74" text-anchor="middle" class="donut-center-label">bookings</text>
          </svg>

          <div class="donut-legend">
            <div v-for="row in statusBreakdown" :key="row.status" class="legend-row">
              <span class="legend-dot" :style="{ background: statusColor(row.status) }" />
              <span class="legend-text">{{ row.status }}</span>
              <span class="legend-count">{{ row.count }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiUrl } from '@/lib/api'

type DashboardStats = {
  period: 'daily' | 'weekly' | 'all'
  totalTrips: number
  totalBookings: number
  totalEarn: number
  series?: DashboardSeriesPoint[]
  statusBreakdown?: DashboardStatusPoint[]
}

type DashboardSeriesPoint = {
  key: string
  label: string
  bookings: number
  earn: number
}

type DashboardStatusPoint = {
  status: string
  count: number
}

const period = ref<DashboardStats['period']>('all')
const loading = ref(false)
const error = ref('')

const router = useRouter()

const series = ref<DashboardSeriesPoint[]>([])
const statusBreakdown = ref<DashboardStatusPoint[]>([])

const chartWidth = 720
const chartHeight = 220

const earnPolyline = ref('')
const xLabels = ref<string[]>([])

const donutRadius = 42
const donutCircumference = 2 * Math.PI * donutRadius
const donutTotal = ref(0)

type DonutSeg = { status: string; color: string; len: number; offset: number }
const donutSegments = ref<DonutSeg[]>([])

const stats = ref<DashboardStats>({
  period: 'all',
  totalTrips: 0,
  totalBookings: 0,
  totalEarn: 0,
})

async function fetchStats() {
  const token = localStorage.getItem('access_token')
  if (!token) {
    error.value = 'You must be logged in as Admin.'
    void router.push({ name: 'LoginPage' })
    return
  }

  error.value = ''
  loading.value = true
  try {
    const url = apiUrl(`/admin/dashboard?period=${encodeURIComponent(period.value)}`)
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        error.value = 'Unauthorized: please log in again.'
        localStorage.removeItem('access_token')
        void router.push({ name: 'LoginPage' })
        return
      }
      if (response.status === 403) {
        error.value = 'Forbidden: your account is not admin.'
        void router.push({ name: 'UserHome' })
        return
      }

      error.value = 'Failed to load dashboard.'
      return
    }

    const data = (await response.json()) as DashboardStats
    stats.value = {
      period: data.period,
      totalTrips: Number(data.totalTrips ?? 0),
      totalBookings: Number(data.totalBookings ?? 0),
      totalEarn: Number(data.totalEarn ?? 0),
    }

    series.value = Array.isArray(data.series) ? data.series : []
    statusBreakdown.value = Array.isArray(data.statusBreakdown) ? data.statusBreakdown : []
    recomputeChart()
    recomputeDonut()
  } catch (err) {
    console.error(err)
    error.value = 'Network Error'
  } finally {
    loading.value = false
  }
}

function statusColor(status: string): string {
  // reuse existing admin colors already used in this project
  if (status === 'CONFIRMED') return '#10b981'
  if (status === 'CANCELLED') return '#ef4444'
  if (status === 'BOOKED') return '#3b82f6'
  return '#9ca3af'
}

function recomputeDonut() {
  const rows = statusBreakdown.value
  const total = rows.reduce((sum, r) => sum + Number(r.count || 0), 0)
  donutTotal.value = total

  if (total <= 0) {
    donutSegments.value = []
    return
  }

  let offset = 0
  donutSegments.value = rows
    .map((r) => {
      const count = Number(r.count || 0)
      const len = (count / total) * donutCircumference
      const seg = {
        status: r.status,
        color: statusColor(r.status),
        len,
        offset,
      }
      offset += len
      return seg
    })
    .filter((s) => s.len > 0)
}

function recomputeChart() {
  const src = series.value
  if (src.length === 0) {
    earnPolyline.value = ''
    xLabels.value = []
    return
  }

  const values = src.map((p) => Number(p.earn || 0))
  const max = Math.max(...values, 0)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)

  const paddingX = 12
  const paddingY = 14
  const w = chartWidth - paddingX * 2
  const h = chartHeight - paddingY * 2
  const step = src.length === 1 ? 0 : w / (src.length - 1)

  const pts: string[] = []
  for (let i = 0; i < src.length; i += 1) {
    const x = paddingX + step * i
    const v = values[i] ?? 0
    const y = paddingY + (1 - (v - min) / range) * h
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }
  earnPolyline.value = pts.join(' ')

  const want = 6
  if (src.length <= want) {
    xLabels.value = src.map((p) => p.label)
    return
  }

  const stride = Math.max(1, Math.floor((src.length - 1) / (want - 1)))
  xLabels.value = src.map((p, idx) => (idx % stride === 0 || idx === src.length - 1 ? p.label : ''))
}

onMounted(() => {
  void fetchStats()
})
</script>

<style scoped>
.dashboard-main {
  flex-grow: 1;
  padding: 25px;
  color: white;
}

h1 {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 20px;
}

.dashboard-error {
  margin: -6px 0 18px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fecaca;
  font-size: 14px;
}

.stats-box {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  background: #111827;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #424242;
}

.stat-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #e5e7eb;
}

.stat-card p {
  font-size: 28px;
  font-weight: bold;
}

.filter {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.filter select {
  width: 150px;
  height: 42px;
  background: #111827;
  color: white;
  border: 1px solid #424242;
  border-radius: 8px;
  padding: 0 10px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-card {
  padding: 16px;
  background: #111827;
  border-radius: 12px;
  border: 1px solid #424242;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #e5e7eb;
  margin-bottom: 12px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #9ca3af;
}

.chart-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart {
  width: 100%;
  height: 220px;
  color: #e5e7eb;
}

.xlabels {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-size: 12px;
  color: #9ca3af;
}

.xlabels span {
  text-align: center;
}

.donut-wrap {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  align-items: center;
}

.donut {
  width: 120px;
  height: 120px;
  color: #e5e7eb;
}

.donut-track {
  fill: none;
  stroke: #374151;
  stroke-width: 12;
}

.donut-seg {
  fill: none;
  stroke-width: 12;
  stroke-linecap: butt;
}

.donut-center-value {
  font-size: 18px;
  font-weight: bold;
  fill: #e5e7eb;
}

.donut-center-label {
  font-size: 12px;
  fill: #9ca3af;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-row {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 10px;
  align-items: center;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.legend-text {
  color: #e5e7eb;
  font-size: 13px;
}

.legend-count {
  color: #9ca3af;
  font-size: 13px;
}

@media (max-width: 980px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
