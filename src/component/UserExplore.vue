<template>
  <div class="page-wrapper">
    <div class="container content-area">
      <h2 class="category-title highlight">Popular</h2>

      <div class="dest-grid">
        <div class="card" v-for="(place, i) in popularPlaces" :key="i">
          <div class="card-img-wrapper">
            <img :src="place.img" alt="Destination" />
            <button class="favorite-btn">♡</button>
          </div>
          <div class="card-body">
            <h4>{{ place.title }}</h4>
            <p>📍 {{ place.location }}</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>
      <h2 class="category-title">Cambodia - Siem Reap</h2>

      <div class="dest-grid">
        <div class="card" v-for="(place, i) in siemReapPlaces" :key="i">
          <div class="card-img-wrapper">
            <img :src="place.img" alt="Destination" />
            <button class="favorite-btn">♡</button>
          </div>
          <div class="card-body">
            <h4>{{ place.title }}</h4>
            <p>📍 {{ place.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mock Data - Replace URLs with your local assets or real images
const popularPlaces = ref([
  { title: 'Angkor Wat', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
  { title: 'Pub Street', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
  { title: 'Museum of Angkor', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
])

const siemReapPlaces = ref([
  { title: 'National Museum', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
  { title: 'Wat Preah', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
  { title: 'Walk Street', location: 'Siem Reap', img: 'https://via.placeholder.com/300x200' },
])
</script>

<style scoped>
.page-wrapper {
  background-color: #fcfcfc;
  min-height: 100vh;
}
.content-area {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.category-title {
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.5rem;
}
.highlight {
  color: #e91e63;
} /* Pink color for "Popular" */
.divider {
  margin: 3rem 0;
  border-top: 1px solid #eee;
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}

.card-img-wrapper {
  position: relative;
  height: 180px;
}
.card-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.card-body {
  padding: 1rem;
}
.card-body h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.card-body p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
