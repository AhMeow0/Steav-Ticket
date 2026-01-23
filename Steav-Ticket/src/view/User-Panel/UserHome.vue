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
    <section class = "container promotion-section"> 
      <img src="/src/assets/explore/promotion/promotion2.png" class="dest-img" /> 
    </section>
    <section class="container popular-section">
      <h3>Popular</h3>

      <div class="destination-grid">
        <div
          v-for="place in popularPlaces"
          :key="place.slug"
          class="dest-card"
          @click="router.push({path: `/place/${place.slug}`,query: { from: 'home' }})">
          <img :src="place.image" class="dest-img" />
          <div class="dest-info">
            <h4>{{ place.title }}</h4>
            <span>{{ place.location }}</span>
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
import { storeToRefs } from 'pinia'
import { usePlaceStore, type Place } from '@/stores/placeDetail'

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

const placeStore = usePlaceStore()
const { siemReap, phnomPenh, preahSihanouk } = storeToRefs(placeStore)
const popularPlaces = computed(() =>
  [
    siemReap.value.find(p => p.slug === 'angkor-wat'),
    phnomPenh.value.find(p => p.slug === 'royal-palace'),
    phnomPenh.value.find(p => p.slug === 'national-museum'),
    preahSihanouk.value.find(p => p.slug === 'koh-rong'),
    preahSihanouk.value.find(p => p.slug === 'serendipity-beach'),
    siemReap.value.find(p => p.slug === 'taplom'),
    siemReap.value.find(p => p.slug === 'angkor-thom'),
  ].filter((p): p is Place => Boolean(p))
)


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
  height:500px;
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
  font-size: 20px;
  padding-left: 50px;
  margin-bottom: 20px;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* smaller cards */
  gap: 30px;
  margin: 10px;
  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
}

.dest-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.12);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}


.dest-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform 0.35s ease;
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

.dest-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}


.promotion-section {
  margin: 3rem auto;
  text-align: center;
}

.promotion-section {
  margin-top: -80px; 
}

.promotion-section img {
  width: 100%;
  max-width: 1600px;
  height: 350px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.15);
}

.dropdown {
  animation: dropdownFade 0.25s ease forwards;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-1px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.search-main-btn {
  transition:
    transform 0.2s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.search-main-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 20px rgba(233, 30, 99, 0.45);
}

.search-main-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .promotion-section {
    margin: 2rem auto;
  }

  .promotion-section img {
    border-radius: 16px;
  }
}

</style>
