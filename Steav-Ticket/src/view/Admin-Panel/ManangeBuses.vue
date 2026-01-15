<template>
  <div class="manage-buses-page">

    <!-- Form Section -->
    <div class="manage-buses-page__form">
      <h1 class="manage-buses-page__title">Manage Buses</h1>

      <div class="manage-buses-page__grid">

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Bus Plate</label>
          <input
            class="manage-buses-page__input"
            type="text"
            placeholder="AC - 123456"
            v-model="busPlate"
          />
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Bus Type</label>
          <select
            class="manage-buses-page__select"
            v-model="busType"
          >
            <option disabled value="">Select type</option>
            <option value="VIP">VIP</option>
            <option value="Bus">Bus</option>
            <option value="Sleeper">Sleeper</option>
          </select>
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Capacity (Seats)</label>
          <input
            class="manage-buses-page__input"
            type="number"
            placeholder="0"
            v-model.number="capacity"
          />
        </div>

      </div>

      <button
        class="manage-buses-page__button"
        @click="createBus"
      >
        {{editId ? 'Update bus':'Save Bus'}}
      </button>
    </div>

    <!-- Table Section -->
    <div class="manage-buses-page__table">
      <h1 class="manage-buses-page__title">Assigned Buses</h1>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Bus Plate</th>
            <th>Bus Type</th>
            <th>Capacity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
            <tr v-for="(bus, index) in buses" :key="bus._id">
              <td>{{ index + 1 }}</td>
              <td>{{ bus.busPlate }}</td>
              <td>{{ bus.busType }}</td>
              <td>{{ bus.capacity }}</td>
              <td class = "action">
                <button class="edit-btn" @click="updateBus(bus)">edit</button>
                <button
                  class="delete-btn"
                  @click="deleteBus(bus._id)">Delete</button>
              </td>
              
            </tr>
          </tbody>
      </table>
    </div>

  </div>
</template>

<script lang = 'ts'>
import axios from 'axios';
import { defineComponent } from 'vue';

interface Bus{
  _id: string;
  busPlate: string;
  capacity: number;
  busType: string;
}

export default defineComponent({
  name: 'ManageBus',
  data(){
    return{
      busPlate: '' as string,
      capacity: 0,
      busType: '' as string,
      buses: [] as Bus[],
      editId: null as string | null
    }
  },
  mounted(){
    this.fetchBus();
  },
  methods: {
    async fetchBus(): Promise<void>{
      try{
        const response = await axios.get<Bus[]>('http://localhost:3000/api/buses');
        this.buses = response.data;
      }catch(error){
        console.error;
      }
    },
    async createBus(): Promise<void>{
      try{
        if(this.editId){
          await axios.put(`http://localhost:3000/api/buses/${this.editId}`,{
            busPlate: this.busPlate,
            busType: this.busType,
            capacity: this.capacity,
          });
          this.resetForm();
          this.fetchBus();
        }
        else{
          await axios.post('http://localhost:3000/api/buses',{
            busPlate: this.busPlate,
            busType: this.busType,
            capacity: this.capacity,
          });
          this.resetForm();
          this.fetchBus();
        }
      }catch(error){
        console.error('failed to create bus');
      }
    },
    async updateBus(bus: Bus){
      this.busPlate = bus.busPlate;
      this.busType = bus.busType;
      this.capacity = bus.capacity;
      this.editId = bus._id;
    },
    async deleteBus(id: string): Promise<void>{
      if(!confirm('delete this bus?')){return}
      try{
        await axios.delete(`http://localhost:3000/api/buses/${id}`)
        this.fetchBus();
      }catch(error){
        console.error('failed to delete bus');
      }
    },
    resetForm(){
      this.busPlate = '';
      this.capacity = 0;
      this.busType = '';
      this.editId = null;
    }
  }
})
</script>

<style scoped>
.manage-buses-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

/* Sections */
.manage-buses-page__form,
.manage-buses-page__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.manage-buses-page__title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
}

.manage-buses-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.manage-buses-page__field {
  display: flex;
  flex-direction: column;
}

.manage-buses-page__label {
  margin-bottom: 6px;
}

.manage-buses-page__input,
.manage-buses-page__select {
  width: 90%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}

.manage-buses-page__button {
  margin-top: 20px;
  background: #4caf50;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: center;
}

.delete-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 5px;
  cursor: pointer;
}
.edit-btn{
  background: blue;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 8px;
}

</style>
