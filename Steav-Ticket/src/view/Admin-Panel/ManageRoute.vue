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

      <button class="manage-route-page__button" @click="createRoute">Create Route</button>
    </div>

    <!-- Table Section -->
    <div class="manage-route-page__table">
      <h1 class="manage-route-page__title">Route List</h1>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="route in routes" :key = "route._id">
            <td>{{ route.startLocation }}</td>
            <td>{{ route.endLocation }}</td>
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
    startLocation : string;
    endLocation: string;
  }

  export default defineComponent({
    name:'ManageRoute',
    data(){
      return {
        from: '' as string, 
        to: '' as string,
        routes: [] as Route[]
      };
    },
    mounted(){
      this.fetchRoutes();
    },
    methods: {
      async fetchRoutes(): Promise<void> {
        try{
          const response = await axios.get<Route[]>('http://localhost:3000/routes');
          this.routes = response.data;
        }
        catch(error){
          console.error;
        }
      },
      async createRoute(): Promise<void> {
        try{
          await axios.post('http://localhost:3000/routes', {
            startLocation: this.from,
            endLocation:this.to
          })
        }catch(error){
          console.error('Failed to create route: ', error);
        }
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

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th {
  padding: 12px;
  border-bottom: 1px solid #333;
  text-align: center;
}

</style>
