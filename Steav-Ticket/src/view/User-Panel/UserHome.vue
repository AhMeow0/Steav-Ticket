<template>
  <div class="user-home">
    <HeadBar />

    <!-- HERO SECTION (unchanged) -->
    <section class="hero-section">
      <div class="hero-bg" :style="heroStyle"></div>

      <div class="search-container">
        <div class="search-card">
          <div class="form-row">
            <!-- FROM -->
            <div class="input-group">
              <label>From</label>
              <div
                class="input-wrapper"
                :class="{ active: openFrom }"
                @click.stop="openFrom = true"
              >
                <span class="icon from-icon">📍</span>
                <input
                  v-model="from"
                  placeholder="Select Origin"
                  readonly
                />
              </div>

              <div v-if="openFrom" class="dropdown">
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
                :class="{ disabled: !from, active: openTo }"
                @click.stop="from && (openTo = true)"
              >
                <span class="icon to-icon">🏁</span>
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
                <span class="icon date-icon">📅</span>
                <input
                  type="date"
                  v-model="journeyDate"
                  :min="minJourneyDate"
                />
              </div>
            </div>

            <!-- RETURN DATE -->
            <div class="input-group">
              <label>Return Date (Optional)</label>
              <div class="input-wrapper">
                <span class="icon return-icon">↩</span>
                <input
                  type="date"
                  v-model="returnDate"
                  :min="minReturnDate"
                />
              </div>
            </div>
          </div>

          <button class="search-btn" @click="goToBooking">
            Search Bus
          </button>
        </div>
      </div>
    </section>

    <!-- FIXED PROMOTION SECTION – horizontal carousel like screenshot -->
    <section class="promotion-section">
      <div class="container">
        <h3>Promotion</h3>
        <p class="section-subtitle">Promotions, deals, and special offers for you</p>

        <div class="promotion-carousel">
          <!-- Use your real promotion banners here -->
          <!-- I used promotion1.png as placeholder – add 4–5 different images -->
          <div class="promo-card">
            <img src="/src/assets/explore/promotion/promotion3.png" alt="15% Off" />
          </div>
          <div class="promo-card">
            <img src="/src/assets/explore/promotion/promotion1.png" alt="Wing Bank Offer" />
          </div>
          <div class="promo-card">
            <img src="/src/assets/explore/promotion/promotion3.png" alt="E-Arrival Card" />
          </div>
          <div class="promo-card">
            <img src="/src/assets/explore/promotion/promotion1.png" alt="Give $2, Get $2" />
          </div>
          <!-- Add more cards with different images when ready -->
        </div>
      </div>
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
import { useRouteStore } from '@/stores/route'


const router = useRouter()

const from = ref<string>('')
const to = ref<string>('')
const journeyDate = ref<string>('')
const returnDate = ref<string>('')

const openFrom = ref(false)
const openTo = ref(false)

const heroStyle = computed(() => ({
  backgroundImage: `url(${Angkor})`,
}))
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
const routeStore = useRouteStore()
const { origins, destinations, loading } = storeToRefs(routeStore)

onMounted(() => {
  routeStore.fetchRoutes()
  window.addEventListener('click', closeDropdowns)
})
const fromOptions = origins
const toOptions = destinations

const toOptionsFiltered = computed(() =>
  toOptions.value.filter(city => city !== from.value)
)

const selectFrom = (city: string) => {
  from.value = city
  openFrom.value = false
}

const selectTo = (city: string) => {
  to.value = city
  openTo.value = false
}

watch(from, (newVal) => {
  if (to.value === newVal) to.value = ''
})

const toISODate = (date: Date) => date.toISOString().split('T')[0]

const minJourneyDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return toISODate(tomorrow)
})

const minReturnDate = computed(() => journeyDate.value || minJourneyDate.value)

const closeDropdowns = () => {
  openFrom.value = false
  openTo.value = false
}

onMounted(() => window.addEventListener('click', closeDropdowns))
onBeforeUnmount(() => window.removeEventListener('click', closeDropdowns))

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
      returnDate: returnDate.value || undefined,
    },
  })
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero & Search – unchanged */
.hero-section {
  position: relative;
  height: 800px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.search-container {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1400px;
  padding: 0 1.5rem;
  pointer-events: none;
}

.search-card {
  background: white;
  border-radius: 40px;
  padding: 40px 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  pointer-events: all;
}

.form-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.input-group {
  flex: 1;
  min-width: 220px;
  position: relative;
}

.input-group label {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 10px;
  font-weight: 500;
}

.input-wrapper {
  height: 64px;
  background: #f5f6f8;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.input-wrapper.active {
  border-color: #f54e75;
  box-shadow: 0 0 0 3px rgba(245, 78, 117, 0.15);
}

.input-wrapper.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #333;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #aaa;
}

.input-wrapper input[readonly] {
  cursor: pointer;
}

.input-wrapper input[type="date"] {
  color-scheme: light;
}

.icon {
  font-size: 1.7rem;
  margin-right: 16px;
}

.from-icon { color: #f54e75; }
.to-icon { color: #555; }
.date-icon { color: #f54e75; }
.return-icon { color: #2196f3; }

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 10px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  padding: 16px 20px;
  cursor: pointer;
  font-size: 1.05rem;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #fff0f5;
  color: #f54e75;
}

.search-btn {
  display: block;
  width: 320px;
  max-width: 100%;
  margin: 0 auto;
  padding: 18px;
  background: #f54e75;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(245, 78, 117, 0.3);
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #ef3768;
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(245, 78, 117, 0.4);
}

/* Popular (unchanged) */
.popular-section {
  padding: 6rem 0;
  text-align: center;
}

.popular-section h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #111;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.dest-card {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.dest-card:hover {
  transform: translateY(-10px);
}

.dest-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dest-info {
  padding: 1.5rem;
  background: white;
}

.dest-info h4 {
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
}

.dest-info span {
  color: #777;
  font-size: 1rem;
}

/* FIXED PROMOTION SECTION – clean horizontal carousel */
.promotion-section {
  padding: 7rem 0; /* More vertical space */
  background: #f9fafa;
}

.promotion-section h3 {
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.8rem;
  color: #111;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 4rem;
}

.promotion-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2.5rem;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Hide scrollbar Firefox */
}

.promotion-carousel::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome/Safari */
}

.promo-card {
  flex: 0 0 520px; /* Wide banner style like screenshot */
  scroll-snap-align: start;
}

.promo-card img {
  width: 100%;
  height: 280px; /* Consistent tall banner height */
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.12);
  transition: transform 0.3s ease;
}

.promo-card:hover img {
  transform: scale(1.03);
}

/* Mobile – make cards take most of screen width */
@media (max-width: 768px) {
  .promo-card {
    flex: 0 0 85%;
  }
  .promotion-carousel {
    gap: 1.5rem;
  }
}
</style>
