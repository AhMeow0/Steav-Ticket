<template>
  <div class="user-home">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div
        class="bus-image-placeholder"
        style="background-image: url('/assets/img/bus-placeholder.jpg')"
      ></div>

      <div class="search-container container">
        <div class="search-form-card">
          <div class="input-group">
            <label>From</label>
            <input type="text" placeholder="Starting Point" />
          </div>

          <div class="input-group">
            <label>To</label>
            <input type="text" placeholder="Destination" />
          </div>

          <div class="input-group">
            <label>Date of Journey</label>
            <input type="date" />
          </div>

          <div class="input-group">
            <label>Date of Return</label>
            <input type="date" />
          </div>
        </div>

        <button class="search-main-btn">Search Buses</button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const popularDestinations = ref([
  {
    title: 'Angkor Wat',
    location: 'Siem Reap',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzq2d-xRRZe-X_UF2V3rMRHTWL7FMcgCBExGrxohlfBzMAq8uw32HYWd7nARENRYxjlKm5dmM41GVh4f4uHZAbNzbtdME70cJsmibw08WkUYzoD7JcC4cuGdTyCrN9g4sN35nXubL3_OTcE=s1360-w1360-h1020-rw',
  },
  {
    title: 'National Museum',
    location: 'Phnom Penh',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxWW8s-0br2t4N1gFiA4Tolc0GsMxIkulqJHm-2QS7qIujPID9-W7KPeChe2KREenDvr_5Ta9EiQbf5o_C20DIbCfC14QEudGNPMqbbuN3Q8zFN3smEB5ISwpBHulKCPfVxpGgykg=s1360-w1360-h1020-rw',
  },
  {
    title: 'Royal Palace',
    location: 'Phnom Penh',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Le_Palais_Royal_%28Phnom_Penh%29_%286997773481%29.jpg',
  },
  {
    title: 'Koh Rong',
    location: 'Sihanoukville',
    image: 'https://avytravel.com/wp-content/uploads/2025/01/Blog-Post-1200-x-675-1170x675.png',
  },
  {
    title: 'Angkor Wat',
    location: 'Siem Reap',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzq2d-xRRZe-X_UF2V3rMRHTWL7FMcgCBExGrxohlfBzMAq8uw32HYWd7nARENRYxjlKm5dmM41GVh4f4uHZAbNzbtdME70cJsmibw08WkUYzoD7JcC4cuGdTyCrN9g4sN35nXubL3_OTcE=s1360-w1360-h1020-rw',
  },
  {
    title: 'National Museum',
    location: 'Phnom Penh',
    image:
      'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxWW8s-0br2t4N1gFiA4Tolc0GsMxIkulqJHm-2QS7qIujPID9-W7KPeChe2KREenDvr_5Ta9EiQbf5o_C20DIbCfC14QEudGNPMqbbuN3Q8zFN3smEB5ISwpBHulKCPfVxpGgykg=s1360-w1360-h1020-rw',
  },
  {
    title: 'Royal Palace',
    location: 'Phnom Penh',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Le_Palais_Royal_%28Phnom_Penh%29_%286997773481%29.jpg',
  },
  {
    title: 'Koh Rong',
    location: 'Sihanoukville',
    image: 'https://avytravel.com/wp-content/uploads/2025/01/Blog-Post-1200-x-675-1170x675.png',
  },
])
</script>

<style scoped>
.hero-section {
  position: relative;
  text-align: center;
  margin-bottom: 4rem;
}

.bus-image-placeholder {
  height: 300px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
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

.input-group input {
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
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

.dest-info h4 {
  margin: 0 0 0.5rem 0;
}

.dest-info span {
  color: #777;
  font-size: 0.9rem;
}
</style>
