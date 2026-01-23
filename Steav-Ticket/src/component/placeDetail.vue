<template>
  <HeadBar />
  <div class="detail-page" v-if="place">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <button class="back-btn" @click="goBack">← Back</button>
    </div>


    <div class="title-row"> <h1>{{ place.title }}</h1></div>

    <!-- Image -->
    <div class="image-wrapper">
    <img :src="place.image" :alt="place.title" />
    </div>

    <div class="content">
      <!-- LEFT -->
      <div class="left">
        <h2>About</h2>
        <p class="description">
          {{ place.description }}
        </p>

        <a class="edit">Improve this listing</a>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="action-card">
          <h3>Tours & experiences</h3>
          <p>Explore different ways to experience this place.</p>
        </div>
      </div>
    </div>
  </div>
<Footer />
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlaceStore } from '@/stores/placeDetail'
import HeadBar from '@/component/HeadBar.vue'
import Footer from '@/component/Footer.vue'
const route = useRoute()
const store = usePlaceStore()
const router = useRouter()
const place = computed(() => {
  const slug = route.params.slug as string

  return [
    ...store.siemReap,
    ...store.phnomPenh,
    ...store.preahSihanouk,
  ].find(p => p.slug === slug)
})
const goBack = () => {
  if (route.query.from === 'home') {
    router.push('/homepage')
  } else {
    router.push('/explore')
  }
}
</script>

<style scoped>
.detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: system-ui, sans-serif;
  color: #111;
}

.breadcrumb {
  font-size: 18px;
  margin-bottom: 10px;

}

.breadcrumb a {
  color: #e91e63;
  text-decoration: none;
  font-weight: bold;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-row h1 {
  font-size: 35px;
  font-weight: bold;
  margin: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  margin: 30px auto;
}

.image-wrapper img {
  width: 100%;
  max-width: 1200px;
  height: 500px;
  object-fit: cover;
  border-radius: 16px;
}
.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.left h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.badge {
  display: inline-block;
  background: #e6f5ef;
  color: #e91e63;
  padding: 6px 12px;
  border-radius: 10px;
  font-weight: 700;
  margin-bottom: 12px;
}

.description {
  line-height: 1.7;
  color: #333;
  font-weight: 200;
}

.edit {
  display: inline-block;
  margin-top: 10px;
  color: #e91e63;
  font-weight: 600;
  cursor: pointer;
}

.action-card {
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.action-card h3 {
  margin-top: 0;
}
.back-btn {
  background: none;
  border: none;
  color: #e91e63;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 6px 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-btn:hover {
  color: #c2185b;
  transform: translateX(-3px);
}

@media (max-width: 900px) {
  .image-grid,
  .content {
    grid-template-columns: 1fr;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
