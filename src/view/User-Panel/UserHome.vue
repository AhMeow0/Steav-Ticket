<script setup lang="ts">
import { ref } from 'vue'
// FIXED: Removed '.js' extension so TypeScript finds the file correctly
import { store, type Route } from '../../stores/ticketStore'

const searchCriteria = ref({ from: '', to: '', date: '', returnDate: '' })

// FIXED: Typed explicitly as Route[] to fix "Unexpected any" error
const foundRoutes = ref<Route[]>(store.routes)
const hasSearched = ref(false)

const executeSearch = () => {
  // We removed 'date' from the store function, so we only pass 'from' and 'to'
  foundRoutes.value = store.searchRoutes(searchCriteria.value.from, searchCriteria.value.to)
  hasSearched.value = true
}
</script>

<template>
  <div class="user-home">
    <div class="hero">
      <div class="hero-content">
        <div class="search-bar">
          <div class="input-group">
            <span class="icon">🚌</span>
            <div class="field">
              <label>From</label>
              <input v-model="searchCriteria.from" placeholder="Phnom Penh" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="input-group">
            <span class="icon">📍</span>
            <div class="field">
              <label>To</label>
              <input v-model="searchCriteria.to" placeholder="Siem Reap" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="input-group">
            <span class="icon">📅</span>
            <div class="field">
              <label>Date of Journey</label>
              <input type="date" v-model="searchCriteria.date" />
            </div>
          </div>
        </div>

        <button class="search-btn" @click="executeSearch">🔍 Search buses</button>
      </div>
    </div>

    <div v-if="hasSearched" class="results-container">
      <h2>Available Routes</h2>
      <div v-if="foundRoutes.length === 0" class="no-result">No buses found.</div>

      <div v-else class="route-list">
        <div v-for="route in foundRoutes" :key="route.id" class="ticket-card">
          <div class="ticket-left">
            <h3>{{ route.from }} ➝ {{ route.to }}</h3>
            <p>{{ route.date }} • {{ route.duration }} • {{ route.type }}</p>
          </div>
          <div class="ticket-right">
            <span class="price">${{ route.price }}</span>
            <button>Book</button>
          </div>
        </div>
      </div>
    </div>

    <div class="popular-section">
      <h2>Popular</h2>
      <div class="grid">
        <div v-for="dest in store.destinations" :key="dest.id" class="card">
          <img :src="dest.img" alt="Location" />
          <div class="card-info">
            <h3>{{ dest.name }}</h3>
            <span>❤️</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 400px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('https://upload.wikimedia.org/wikipedia/commons/6/63/Phnom_Penh_City_Bus_Line_01.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-bar {
  background: #f8d7da;
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 10px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  gap: 15px;
  margin-bottom: 20px;
}
.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.field {
  display: flex;
  flex-direction: column;
}
.field label {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}
.field input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 120px;
}
.divider {
  width: 1px;
  height: 30px;
  background: #aaa;
}

.search-btn {
  background: #f54d65;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.results-container,
.popular-section {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.ticket-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 5px solid #f54d65;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: #f54d65;
  display: block;
}
.ticket-right button {
  background: #333;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-info {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
</style>
