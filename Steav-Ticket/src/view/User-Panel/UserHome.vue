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

            <div class="input-wrapper" @click.stop="openFrom = true">
              <span class="icon">📍</span>
              <input
                v-model="from"
                placeholder="Select Origin"
                readonly
              />
            </div>

            <div v-if="openFrom" class="dropdown">

              <p class="dropdown-title">From</p>
              <div
                v-for="city in fromOptions"
                :key="city"
                class="dropdown-item"
                @click="selectFrom(city)"
              >
                {{ city }}
              </div>
            </div>
          </div>

          <!-- TO -->
          <div class="input-group">
            <label>To</label>
            <div
              class="input-wrapper"
              :class="{ disabled: !from }"
              @click.stop="from && (openTo = true)"
            >
              <span class="icon">🏁</span>
              <input
                v-model="to"
                placeholder="Select Destination"
                readonly
                :disabled="!from"
              />
            </div>

            <div v-if="openTo" class="dropdown">
              <div
                v-for="city in toOptionsFiltered"
                :key="city"
                class="dropdown-item"
                @click="selectTo(city)"
              >
                {{ city }}
              </div>
            </div>
          </div>

          <!-- JOURNEY DATE -->
          <div class="input-group">
            <label>Journey Date</label>
            <div class="input-wrapper">
              <span class="icon">📅</span>
              <input type="date" v-model="journeyDate" :min="minJourneyDate" />
            </div>
          </div>

          <!-- RETURN DATE -->
          <div class="input-group">
            <label>Return Date (Optional)</label>
            <div class="input-wrapper">
              <span class="icon">🔙</span>
              <input type="date" v-model="returnDate" :min="minReturnDate" />
            </div>
          </div>

        </div>

        <button class="search-main-btn" @click="goToBooking">
          Search Bus
        </button>
      </div>
    </section>

  <section class="container popular-section">
  <h3>Popular</h3>

  <div class="destination-grid">

    <div class="dest-card">
      <img src="/src/assets/explore/siem_reab/angkor.png" class="dest-img" />
      <div class="dest-info">
        <h4>Angkor Wat</h4>
        <span> Siem Reap</span>
      </div>
    </div>

    <div class="dest-card">
      <img src="/src/assets/explore/royal-palace.png" class="dest-img" />
      <div class="dest-info">
        <h4>Royal Palace</h4>
        <span>Phnom Penh</span>
      </div>
    </div>

    <div class="dest-card">
      <img src="/src/assets/explore/national-museum.png" class="dest-img" />
      <div class="dest-info">
        <h4>National Museum</h4>
        <span>Siem Reap</span>
      </div>
    </div>

    <div class="dest-card">
      <img src="/src/assets/explore/kohRong.png" class="dest-img" />
      <div class="dest-info">
        <h4>Koh Rong</h4>
        <span> Sihanoukville</span>
      </div>
    </div>
    <div class="dest-card">
      <img src="/src/assets/explore/kohRong.png" class="dest-img" />
      <div class="dest-info">
        <h4>Koh Rong</h4>
        <span> Sihanoukville</span>
      </div>
    </div>

    <div class="dest-card">
      <img src="/src/assets/explore/kulen.png" class="dest-img" />
      <div class="dest-info">
        <h4>kulen</h4>
        <span> Siem Reap</span>
      </div>
    </div>

    <div class="dest-card">
      <img src="/src/assets/explore/walkstreet.png" class="dest-img" />
      <div class="dest-info">
        <h4>Walk street</h4>
        <span>Phnom Penh</span>
      </div>
    </div>



  </div>
</section>


    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import HeadBar from '@/component/HeadBar.vue'
import Footer from '@/component/Footer.vue'
import Angkor from '@/assets/explore/siem_reab/angkor.png'

const router = useRouter()

// form data
const from = ref('')
const to = ref('')
const journeyDate = ref('')
const returnDate = ref('')

// dropdown state
const openFrom = ref(false)
const openTo = ref(false)

// background image
const heroStyle = computed(() => ({
  backgroundImage: `url(${Angkor})`,
}))

// city lists
const fromOptions = [
  'Phnom Penh',
  'Siem Reap',
  'Battambang',
  'Sihanoukville',
]

const toOptions = [
  'Phnom Penh',
  'Siem Reap',
  'Battambang',
  'Sihanoukville',
]


// filtered To
const toOptionsFiltered = computed(() =>
  toOptions.filter((city) => city !== from.value)
)

// select handlers
const selectFrom = (city: string) => {
  from.value = city
  openFrom.value = false
}

const selectTo = (city: string) => {
  to.value = city
  openTo.value = false
}

// auto clear To
watch(from, (newFrom) => {
  if (to.value === newFrom) to.value = ''
})

// date helpers
const toISODate = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const minJourneyDate = computed(() => {
  const today = new Date()
  today.setDate(today.getDate() + 1)
  return toISODate(today)
})

const minReturnDate = computed(() =>
  journeyDate.value ? journeyDate.value : minJourneyDate.value
)

// close dropdown on outside click
const closeDropdowns = () => {
  openFrom.value = false
  openTo.value = false
}

onMounted(() => window.addEventListener('click', closeDropdowns))
onBeforeUnmount(() => window.removeEventListener('click', closeDropdowns))

// navigation
const goToBooking = () => {
  if (!from.value || !to.value || !journeyDate.value) {
    alert('Please fill From, To and Journey Date')
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

// dummy popular
// const popularDestinations = ref([
//   { title: 'Angkor Wat', location: 'Siem Reap', image: Angkor },
//   { title: 'Royal Palace', location: 'Phnom Penh', image: Angkor },
// ])
</script>

<style scoped>
.hero-section {
  position: relative;
  margin-bottom: 4rem;
}

.bus-image-placeholder {
  height: 450px;
  background-size: cover;
  background-position: center;
}

.search-container {
  position: relative;
  top: -75px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-form-card {
  background: white;
  padding: 30px;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1500px;
}

.input-group {
  flex: 1;
  position: relative;
}

.input-wrapper {
  height: 70px;
  background: #f4f5f7;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
}

.input-wrapper.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-wrapper input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: bold;
  outline: none;
}

.icon {
  margin-right: 10px;
  font-size: 1.4rem;
}

.dropdown {
  position: absolute;
  top: 105%;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  padding: 10px 0;
  z-index: 50;
}

.dropdown-title {
  font-size: 0.75rem;
  font-weight: bold;
  color: #999;
  padding: 8px 20px;
}

.dropdown-item {
  padding: 12px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #fdecef;
}

.search-main-btn {
  margin-top: -20px;
  padding: 1rem 6rem;
  border-radius: 30px;
  background: #e91e63;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.popular-section h3 {
  font-size: 18px;
  margin-bottom: 1rem;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* smaller cards */
  gap: 30px;
  margin: 10px;
}

.dest-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dest-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.dest-info {
  padding: 0.7rem;
}

.dest-info h4 {
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.dest-info span {
  font-size: 0.8rem;
}

</style>
