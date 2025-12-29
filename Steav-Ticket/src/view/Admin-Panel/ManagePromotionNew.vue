<template>
  <div class="manage-promotion-page">

    <!-- Form Section -->
    <div class="form-box">
      <h1 class="section-title">Manage Promotion & News</h1>

      <div class="form-grid">
        <div class="input-group">
          <label>Title</label>
          <input v-model="title" />
        </div>

        <div class="input-group">
          <label>Type</label>
          <input v-model="type" placeholder="Promotion / News" />
        </div>

        <div class="input-group">
          <label>Promotion %</label>
          <input
            type="number"
            v-model="promotionPercentage"
            min="0"
            max="100"
            placeholder="e.g. 20"
          />
        </div>

        <div class="input-group">
          <label>Active Until</label>
          <input type="date" v-model="active" />
        </div>

        <div class="input-group span-3">
          <label>Content</label>
          <input class="content-input" v-model="content" />
        </div>
      </div>

      <button class="save-btn" @click="publish">
        Publish
      </button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1 class="section-title">Recent Announcements</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Promotion %</th>
            <th>Active Until</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in promotions" :key="item._id">
            <td>{{ item.title }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.promotionPercentage }}%</td>
            <td>{{ formatDate(item.active) }}</td>
            <td>
              <button class="delete-btn" @click="deletePromotion(item._id)">
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="promotions.length === 0">
            <td colspan="5">No announcements yet</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost:3000/promotions'


const title = ref('')
const type = ref('')
const active = ref('')
const content = ref('')
const promotionPercentage = ref(0)

const promotions = ref([])


const fetchPromotions = async () => {
  const res = await fetch(API_URL)
  promotions.value = await res.json()
}


const publish = async () => {
  if (!title.value || !type.value || !content.value) {
    alert('Please fill all fields')
    return
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      type: type.value,
      active: active.value,
      content: content.value,
      promotionPercentage: Number(promotionPercentage.value),
    }),
  })

  /* reset form */
  title.value = ''
  type.value = ''
  active.value = ''
  content.value = ''
  promotionPercentage.value = 0

  fetchPromotions()
}

const deletePromotion = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  fetchPromotions()
}


const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}

onMounted(fetchPromotions)
</script>

<style scoped>
.manage-promotion-page {
  color: white;
  padding: 30px;
}

.form-box,
.table-box {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}


.section-title {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 15px;
}


.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}


.input-group {
  display: flex;
  flex-direction: column;
}

.span-3 {
  grid-column: span 3;
}

input {
  width: 90%;
  padding: 16px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  margin-top: 5px;
}

.content-input {
  height: 80px;
}


.save-btn {
  margin-top: 20px;
  background: #4caf50;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

.delete-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #333;
  text-align: center;
}
</style>
