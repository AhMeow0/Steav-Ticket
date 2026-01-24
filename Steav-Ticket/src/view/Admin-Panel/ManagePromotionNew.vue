<template>
  <div class="manage-promotion-page">

    <!-- Form Section -->
    <div class="form-box">
      <h1 class="section-title">Manage Promotion</h1>

      <div class="form-grid">
        <div class="input-group">
          <label>Promotion Code</label>
          <input v-model="code" placeholder="PROMO20" />
        </div>

        <div class="input-group">
          <label>Discount Type</label>
          <select v-model="discountType">
            <option value="PERCENT">Percent</option>
            <option value="FIXED">Fixed</option>
          </select>
        </div>

        <div class="input-group">
          <label>Discount Value</label>
          <input type="number" v-model="discountValue" />
        </div>

        <div class="input-group">
          <label>Start Date</label>
          <input type="date" v-model="startDate" />
        </div>

        <div class="input-group">
          <label>End Date</label>
          <input type="date" v-model="endDate" />
        </div>
      </div>

      <button class="save-btn" @click="createPromotion">
        {{ editId ? 'Update Promotion' : 'Create Promotion' }}
      </button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1 class="section-title">Promotion List</h1>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>
          <tr v-for="item in promotions" :key="item._id">
            <td>{{ item.code }}</td>
            <td>{{ item.discountType }}</td>
            <td>
              {{ item.discountType === 'PERCENT'
                ? item.discountValue + '%'
                : item.discountValue }}
            </td>
            <td>{{ item.startDate.slice(0, 10) }}</td>
            <td>{{ item.endDate.slice(0, 10) }}</td>
            <td>
              <span :class="['status', item.status.toLowerCase()]">
                {{ item.status }}
              </span>
            </td>
            <td>
              <button class="edit-btn" @click="updatePromotion(item)">Edit</button>
              <button class="delete-btn" @click="deletePromotion(item._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script lang = 'ts'>
import axios from 'axios'
import { defineComponent } from 'vue';

interface Promotion {
  _id: string;
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}



export default defineComponent({

  name: 'ManagePromotion',
  data() {
    return {
      code: '',
      discountType: 'PERCENT',
      discountValue: 0,
      startDate: '',
      endDate: '',
      promotions: [] as Promotion[],
      editId: '' as string
    };
  },
  mounted(){
    this.fetchPromotion();
  },
  methods:{
    async fetchPromotion(): Promise<void>{
      try{
        const response = await axios.get<Promotion[]>('http://localhost:3000/api/promotions')
        this.promotions = response.data;
      }catch(error){
        console.error;
      }
    },
  async createPromotion(): Promise<void> {
   
    try {
      const payload = {
        code: this.code,
        discountType: this.discountType,
        discountValue: this.discountValue,
        startDate: this.startDate,
        endDate: this.endDate
      };
      if (this.editId) {
        await axios.put(
          `http://localhost:3000/api/promotions/${this.editId}`,
          payload
        );
      } else {
        await axios.post(
          'http://localhost:3000/api/promotions',
          payload
        );
      }

      this.resetForm();
      this.fetchPromotion();
    } catch (err) {
      console.error('Save failed', err);
    }
  },
    async updatePromotion(promo: Promotion): Promise<void> {
      this.editId = promo._id;
      this.code = promo.code;
      this.discountType = promo.discountType;
      this.discountValue = promo.discountValue;
      this.startDate = promo.startDate.slice(0, 10);
      this.endDate = promo.endDate.slice(0, 10);
    },
    async deletePromotion(id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/api/promotions/${id}`);
      this.fetchPromotion();
      } catch (err) {
      console.error('Failed to delete promotion', err);
      }
    },
    resetForm() {
      this.code = '';
      this.discountType = 'PERCENT';
      this.discountValue = 0;
      this.startDate = '';
      this.endDate = '';
      this.editId = '';
    }

  }
})
</script>
<style scoped>
.manage-promotion-page {
  color: white;
  padding: 30px;
}

.form-box,
.table-box {
  background: #111827;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 24px;
}

.section-title {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 20px;
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

input,
select {
  width: 450px;
  padding: 14px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  margin-top: 6px;
}

select {
  cursor: pointer;
}

.save-btn {
  margin-top: 24px;
  background: #4caf50;
  padding: 14px 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.save-btn:hover {
  background: #43a047;
}

.edit-btn {
  background: #1e88e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 8px;
}

.edit-btn:hover {
  background: #1976d2;
}

.delete-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #d32f2f;
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

.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status.active {
  background: #2e7d32;
}

.status.inactive {
  background: #616161;
}
</style>
