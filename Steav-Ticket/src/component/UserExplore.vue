<template>
  <div class="page">
    <!-- If you already show HeadBar/Footer in App.vue, remove these 2 lines -->
    <HeadBar />

    <main class="explore-page">
      <div class="container">
        <!-- Siem Reap -->
        <section class="section">
          <h2 class="section-title">Siem Reap</h2>

          <div class="grid">
            <router-link
              v-for="place in siemReap"
              :key="place.slug"
              class="card"
              :to="`/place/${place.slug}`"
            >
              <div class="image-wrapper">
                <img :src="place.image" :alt="place.title" />
                <span class="location">{{ place.location }}</span>
              </div>
              <p class="title">{{ place.title }}</p>
            </router-link>
          </div>
        </section>

        <!-- Phnom Penh -->
        <section class="section">
          <h2 class="section-title">Phnom Penh</h2>

          <div class="grid">
            <router-link
              v-for="place in phnomPenh"
              :key="place.slug"
              class="card"
              :to="`/place/${place.slug}`"
            >
              <div class="image-wrapper">
                <img :src="place.image" :alt="place.title" />
                <span class="location">{{ place.location }}</span>
              </div>
              <p class="title">{{ place.title }}</p>
            </router-link>
          </div>
        </section>

        <!-- kep -->

        <section class="section">
          <h2 class="section-title">Preah Sihanouk</h2>

          <div class="grid">
            <router-link
              v-for="place in preahSihanouk"
              :key="place.slug"
              class="card"
              :to="`/place/${place.slug}`"
            >
              <div class="image-wrapper">
                <img :src="place.image" :alt="place.title" />
                <span class="location">{{ place.location }}</span>
              </div>
              <p class="title">{{ place.title }}</p>
            </router-link>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import HeadBar from './HeadBar.vue'
import Footer from './Footer.vue'

//  local images
import angkorWat from '../assets/explore/siem_reab/angkor_wat.png'
import pubStreet from '../assets/explore/siem_reab/pub_street.png'
import museumAngkor from '../assets/explore/angkor-museum.png'
import nationalMuseum from '../assets/explore/national-museum.png'
import watPhnom from '../assets/explore/Wat-Phnom.png'
import royalPalace from '../assets/explore/royal-palace.png'

// import museumAngkor from '@/assets/explore/siemreap/museum-angkor.jpg'

type Place = {
  title: string
  slug: string
  location: string
  image: string
}

const siemReap: Place[] = [
  { title: 'Angkor Wat', slug: 'angkor-wat', location: 'Siem Reap', image: angkorWat },
  { title: 'Pub Street', slug: 'pub-street', location: 'Siem Reap', image: pubStreet },
  { title: 'Museum of Angkor', slug: 'museum-angkor', location: 'Siem Reap', image: museumAngkor },
]

const phnomPenh: Place[] = [
  {
    title: 'National Museum',
    slug: 'national-museum',
    location: 'Phnom Penh',
    image: nationalMuseum,
  },
  { title: 'Wat Phnom', slug: 'wat-phnom', location: 'Phnom Penh', image: watPhnom },
  { title: 'Royal Palace', slug: 'royal-palace', location: 'Phnom Penh', image: royalPalace },
]
const preahSihanouk: Place[] = [
  {
    title: 'Koh Rong',
    slug: 'koh-rong',
    location: 'Preah Sihanouk',
    image: '/src/assets/explore/kohRong.png',
  },
  {
    title: 'Otres Beach',
    slug: 'otres-beach',
    location: 'Preah Sihanouk',
    image: '/src/assets/explore/otres.png',
  },
]

</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.explore-page {
  padding: 28px 0 40px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  margin-bottom: 34px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  margin: 10px 0 14px;
  color: #111;
}

/* 3 columns like your screenshot */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.card {
  text-decoration: none;
  color: inherit;
  background: #fff;
  border-radius: 10px;
  min-height: 250px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.image-wrapper {
  position: relative;
  height: 200px;
  background: #eee;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* location label bottom of image */
.location {
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.title {
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

/* responsive */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .image-wrapper {
    height: 160px;
  }
}
</style>
