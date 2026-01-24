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
          <label>Start Date & Time</label>
          <input type="datetime-local" v-model="startDateLocal" />
        </div>

        <div class="input-group">
          <label>End Date & Time</label>
          <input type="datetime-local" v-model="endDateLocal" :min="startDateLocal" />
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
            <td>{{ formatDateTime(item.startDate) }}</td>
            <td>{{ formatDateTime(item.endDate) }}</td>
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
  computed: {
    startDateLocal: {
      get(): string {
        return this.toDateTimeLocalValue(this.startDate)
      },
      set(value: string) {
        this.startDate = this.fromDateTimeLocalValue(value)
      },
    },
    endDateLocal: {
      get(): string {
        return this.toDateTimeLocalValue(this.endDate)
      },
      set(value: string) {
        this.endDate = this.fromDateTimeLocalValue(value)
      },
    },
  },
  watch: {
    startDate(newVal: string) {
      if (!newVal) return

      const start = new Date(newVal)
      if (Number.isNaN(start.getTime())) return

      if (!this.endDate) {
        const end = new Date(start)
        end.setHours(end.getHours() + 1)
        this.endDate = this.toOffsetDateTime(end)
        return
      }

      const end = new Date(this.endDate)
      if (Number.isNaN(end.getTime()) || end.getTime() <= start.getTime()) {
        const next = new Date(start)
        next.setHours(next.getHours() + 1)
        this.endDate = this.toOffsetDateTime(next)
      }
    },
  },
  methods:{
    pad2(n: number): string {
      return String(n).padStart(2, '0')
    },
    offsetString(offsetMinutes: number): string {
      const sign = offsetMinutes >= 0 ? '+' : '-'
      const abs = Math.abs(offsetMinutes)
      const hh = this.pad2(Math.floor(abs / 60))
      const mm = this.pad2(abs % 60)
      return `${sign}${hh}:${mm}`
    },
    toOffsetDateTime(d: Date): string {
      const yyyy = d.getFullYear()
      const MM = this.pad2(d.getMonth() + 1)
      const dd = this.pad2(d.getDate())
      const HH = this.pad2(d.getHours())
      const min = this.pad2(d.getMinutes())
      const ss = this.pad2(d.getSeconds())
      const offsetMinutes = -d.getTimezoneOffset()
      const offset = this.offsetString(offsetMinutes)
      return `${yyyy}-${MM}-${dd}T${HH}:${min}:${ss}${offset}`
    },
    toDateTimeLocalValue(value: string): string {
      if (!value) return ''

      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
        return value.slice(0, 16)
      }

      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return ''
      const yyyy = d.getFullYear()
      const MM = this.pad2(d.getMonth() + 1)
      const dd = this.pad2(d.getDate())
      const HH = this.pad2(d.getHours())
      const min = this.pad2(d.getMinutes())
      return `${yyyy}-${MM}-${dd}T${HH}:${min}`
    },
    fromDateTimeLocalValue(value: string): string {
      if (!value) return ''
      // `datetime-local` has no timezone. Store it with local timezone offset
      // so it won't shift and accidentally become "outdated".
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return value
      return this.toOffsetDateTime(d)
    },
    formatDateTime(value: string): string {
      if (!value) return ''
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return value
      return d.toLocaleString()
    },
    async fetchPromotion(): Promise<void>{
      try{
        const response = await axios.get<Promotion[]>('http://localhost:3000/api/promotions')
        this.promotions = response.data;
      }catch(error){
        console.error('Error fetching promotions', error)
      }
    },
  async createPromotion(): Promise<void> {
    if (!this.code || !this.startDate || !this.endDate) {
      alert('Please fill code, start date/time, and end date/time')
      return
    }

    const start = new Date(this.startDate)
    const end = new Date(this.endDate)
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      alert('Invalid date/time')
      return
    }
    if (end.getTime() <= start.getTime()) {
      alert('End date/time must be after start date/time')
      return
    }

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
      this.startDate = promo.startDate;
      this.endDate = promo.endDate;
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
