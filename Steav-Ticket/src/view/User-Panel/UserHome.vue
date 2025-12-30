<template>
  <div class="user-home">
    <HeadBar />

    <section class="hero-section">
        <div class="bus-image-placeholder" style="background-image: url('/assets/img/bus-placeholder.jpg');">
           </div>

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

    <main class="container popular-section">
      <h3>Popular</h3>
      <div class="destination-grid">
        <div v-for="(item, index) in popularDestinations" :key="index" class="dest-card">
          <img :src="item.image" :alt="item.title" class="dest-img">
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
// Import component using the alias '@' based on your structure
import HeadBar from '@/component/HeadBar.vue';
import { ref } from 'vue';

// Temporary dummy data to make the UI look like the design
const popularDestinations = ref([
    { title: 'Angkor Wat', location: 'Siem Reap', image: 'https://via.placeholder.com/300x200' },
    { title: 'National Museum', location: 'Phnom Penh', image: 'https://via.placeholder.com/300x200' },
    { title: 'Royal Palace', location: 'Phnom Penh', image: 'https://via.placeholder.com/300x200' },
    { title: 'Koh Rong', location: 'Sihanoukville', image: 'https://via.placeholder.com/300x200' },
]);
</script>

<style scoped>
/* Hero Section Styles */
.hero-section {
    position: relative;
    text-align: center;
    margin-bottom: 4rem;
}

.bus-image-placeholder {
    height: 300px;
    background-color: #e0e0e0; /* Gray placeholder */
    background-size: cover;
    background-position: center;
}

/* Search Form Styles to match UI overlapping look */
.search-container {
    position: relative;
    top: -50px; /* Pulls it up over the image */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-form-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
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
    background-color: #E91E63; /* Pink color */
    color: white;
    border: none;
    padding: 1rem 3rem;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: -1.5rem; /* Overlap the form card slightly */
    z-index: 2;
}

/* Popular Section Grid Styles */
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
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
