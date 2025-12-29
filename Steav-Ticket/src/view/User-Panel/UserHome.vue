<template>
  <div class="user-home">
    <HeadBar />

    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="bus-image-placeholder" :style="heroStyle"></div>

      <div class="search-container container">
        <div class="search-form-card">
          <!-- FROM -->
          <div class="input-group">
            <label>From</label>
            <select v-model="from">
              <option disabled value="">Select Starting Point</option>
              <option v-for="city in fromOptions" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>

          <!-- TO -->
          <div class="input-group">
            <label>To</label>
            <select v-model="to" :disabled="!from">
              <option disabled value="">
                {{ from ? 'Select Destination' : 'Select From first' }}
              </option>

              <option v-for="city in toOptionsFiltered" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>

          <!-- DATE JOURNEY -->
          <div class="input-group">
            <label>Date of Journey</label>
            <!-- ✅ must be after today -->
            <input type="date" v-model="journeyDate" :min="minJourneyDate" />
          </div>

          <!-- DATE RETURN -->
          <div class="input-group">
            <label>Date of Return</label>
            <!-- ✅ cannot be before journey date (and also after today) -->
            <input type="date" v-model="returnDate" :min="minReturnDate" />
          </div>
        </div>

        <button class="search-main-btn" @click="goToBooking">Search Bus</button>
      </div>
    </section>

    <!-- POPULAR SECTION -->
    <main class="container popular-section">
      <h3>Popular</h3>
      <div class="destination-grid">
        <div v-for="(item, index) in popularDestinations" :key="index" class="dest-card">
          <img :src="item.image" :alt="item.title" class="dest-img" />
          <div class="dest-info">
            <h4>{{ item.title }}</h4>
            <span>📍 {{ item.location }}</span>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HeadBar from '@/component/HeadBar.vue'
import Footer from '@/component/Footer.vue'
import Angkor from '@/assets/explore/siem_reab/angkor_wat.png'

const router = useRouter()

// form data
const from = ref('')
const to = ref('')
const journeyDate = ref('')
const returnDate = ref('')

// ✅ background image
const heroStyle = computed(() => ({
  backgroundImage: `url(${Angkor})`,
}))

// ✅ city lists
const fromOptions = ['Phnom Penh', 'Siem Reab', 'Battambang', 'Sihanuk villige', 'Poi pet']
const toOptions = ['Phnom Penh', 'Siem Reab', 'Battambang', 'Sihanuk villige']

// ✅ filtered To: remove same value as From
const toOptionsFiltered = computed(() => {
  return toOptions.filter((city) => city !== from.value)
})

// ✅ if user selects From = same as To, clear To automatically
watch(from, (newFrom) => {
  if (to.value === newFrom) to.value = ''
})

// ---------- ✅ DATE RULES ----------

// convert Date => yyyy-mm-dd (for input min)
const toISODate = (d: Date) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// ✅ today (local) + 1 day => tomorrow (so strictly after today)
const minJourneyDate = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  return toISODate(tomorrow)
})

// ✅ return date must be >= journeyDate (if journey selected) else >= tomorrow
const minReturnDate = computed(() => {
  if (journeyDate.value) return journeyDate.value
  return minJourneyDate.value
})

// ✅ if user picks invalid journey date, clear it
watch(journeyDate, (newVal) => {
  if (!newVal) return
  if (newVal < minJourneyDate.value) {
    alert('Date of Journey must be after today.')
    journeyDate.value = ''
  }

  // if returnDate exists but is before journeyDate, clear returnDate
  if (returnDate.value && returnDate.value < newVal) {
    returnDate.value = ''
  }
})

// ✅ validate return date too
watch(returnDate, (newVal) => {
  if (!newVal) return
  if (newVal < minReturnDate.value) {
    alert('Date of Return must be on/after Journey date.')
    returnDate.value = ''
  }
})

// navigation
const goToBooking = () => {
  if (!from.value || !to.value || !journeyDate.value) {
    alert('Please fill From, To and Date of Journey')
    return
  }

  router.push({
    path: '/bookseat',
    query: {
      from: from.value,
      to: to.value,
      journeyDate: journeyDate.value,
      returnDate: returnDate.value,
    },
  })
}

// dummy popular data
const popularDestinations = ref([
  { title: 'Angkor Wat', location: 'Siem Reap', image: Angkor },
  { title: 'National Museum', location: 'Phnom Penh', image: Angkor },
  { title: 'Royal Palace', location: 'Phnom Penh', image: 'https://via.placeholder.com/300x200' },
  { title: 'Koh Rong', location: 'Sihanoukville', image: 'https://via.placeholder.com/300x200' },
])
</script>

<style scoped>
.hero-section {
  position: relative;
  text-align: center;
  margin-bottom: 4rem;
}

.container {
  padding: 20px;
}

.bus-image-placeholder {
  height: 300px;
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0;
}

.search-container {
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-form-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 900px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 0.3rem;
}

.input-group input,
.input-group select {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
  background: white;
}

.input-group select:disabled {
  background: #f3f3f3;
  cursor: not-allowed;
}

.search-main-btn {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: -1.5rem;
  z-index: 2;
}

.popular-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.dest-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dest-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.dest-info {
  padding: 1rem;
}

.dest-info span {
  color: #777;
  font-size: 0.9rem;
}
</style>
