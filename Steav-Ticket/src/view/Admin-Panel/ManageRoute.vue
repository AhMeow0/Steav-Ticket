<template>
  <div class="manage-route-page">

    <!-- Form Section -->
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Routes</h1>

      <div class="manage-route-page__grid">

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">From</label>
          <input class="manage-route-page__input" type="text" placeholder="Enter from" v-model="from">
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">To</label>
          <input class="manage-route-page__input" type="text" placeholder="Enter to" v-model="to">
        </div>
      </div>

      <button class="manage-route-page__button" @click="createRoute">{{ editId ? 'Update Route': 'Create Route' }}</button>
    </div>

    <!-- Table Section -->
    <div class="manage-route-page__table">
      <h1 class="manage-route-page__title">Route List</h1>

      <table class = "route-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="route in routes" :key = "route._id">
            <td>{{ route.origin }}</td>
            <td>{{ route.destination }}</td>
            <td class = "action">
              <button class="btn edit" @click="updateRoute(route)">edit</button>
              <button class="btn delete" @click="deleteRoute(route._id)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';

  interface Route{
    _id: string;
    origin : string;
    destination: string;
  }

  export default defineComponent({
    name:'ManageRoute',
    data(){
      return {
        from: '' as string, 
        to: '' as string,
        routes: [] as Route[],
        editId: null as string | null
      };
    },
    mounted(){
      this.fetchRoutes();
    },
    methods: {
      async fetchRoutes(): Promise<void> {
        try{
          const response = await axios.get<Route[]>('http://localhost:3000/api/routes');
          this.routes = response.data;
        }
        catch(error){
          console.error;
        }
      },
      async createRoute(): Promise<void> {
        try{
          if(this.editId){
            await axios.put(`http://localhost:3000/api/routes/${this.editId}`,{
              origin: this.from,
              destination: this.to
            });
            this.resetForm();
            this.fetchRoutes();
          }
          else{
            await axios.post('http://localhost:3000/api/routes', {
              origin: this.from,
              destination:this.to
            });
            this.resetForm();
            this.fetchRoutes();
          }
        }catch(error){
          console.error('Failed to create route: ', error);
        }
      },
      async updateRoute(route: Route){
        this.from = route.origin;
        this.to = route.destination;
        this.editId = route._id;
      },
      async deleteRoute(id: string): Promise<void>{
        if(!confirm('delete this route? ')){
          return
        }
        try{
          await axios.delete(`http://localhost:3000/api/routes/${id}`);
          this.fetchRoutes();
        }catch(error){
          console.error('Fail to delete route: ', error);
        }
      },
      resetForm(){
        this.from = ''
        this.to = ''
        this.editId = null
      }

    },
  });
</script>

<style scoped>
.manage-route-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.manage-route-page__form,
.manage-route-page__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.manage-route-page__title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Grid Layout */
.manage-route-page__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
}

.manage-route-page__field {
  display: flex;
  flex-direction: column;
}

.manage-route-page__label {
  margin-bottom: 6px;
}

/* Inputs */
.manage-route-page__input{
  width: 100%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}

.manage-route-page__button {
  margin-top: 20px;
  background: #4caf50;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

/* Route Table */
.route-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 12px; /* space between rows */
}

.route-table thead th {
  text-align: left;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
}

.route-table tbody tr {
  border-radius: 8px;
}

.route-table td {
  padding: 16px 20px;
  font-size: 15px;
  color: #f9fafb;
}

.route-table td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.route-table td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.btn {
  padding: 9px 18px;
  border-radius: 6px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.btn.edit {
  background: blue;
  color: white;
}

.btn.delete {
  background: red;
  color: white;
}

</style>
