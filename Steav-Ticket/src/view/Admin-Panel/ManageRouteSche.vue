<template>
  <div class="manage-route-page">

    <!-- Form Section -->
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Route & Schedules</h1>

      <p v-if="error" class="manage-route-page__message manage-route-page__message--error">
        {{ error }}
      </p>
      <p
        v-else-if="success"
        class="manage-route-page__message manage-route-page__message--success"
      >
        {{ success }}
      </p>

      <div class="manage-route-page__grid">
        <div class="manage-route-page__field">
          <label class="manage-route-page__label">From</label>
          <select class="manage-route-page__select"></select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">To</label>
          <select class="manage-route-page__select"></select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Depart Time</label>
          <input
            type="datetime-local"
            v-model="departureTimeLocal"
            class="manage-route-page__input"
          />
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Bus</label>
          <select v-model="form.busId" class="manage-route-page__select" @change="onBusChange">
            <option disabled value="">Select Bus</option>
            <option v-for="b in buses" :key="b._id" :value="b._id">
              {{ b.busPlate }} — {{ b.companyName }}
            </option>
          </select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Company Name</label>
          <input
            type="text"
            :value="selectedBus?.companyName || ''"
            class="manage-route-page__input"
            placeholder="Auto from bus"
            disabled
          />
        </div>
      </div>

      <button @click="saveSchedule" class="manage-route-page__button">
        {{ loading ? 'Saving...' : editingId ? 'Save Changes' : 'Confirm Create' }}
      </button>
      <button
        v-if="editingId"
        @click="cancelEdit"
        class="manage-route-page__button manage-route-page__button--secondary"
        :disabled="loading"
      >
        Cancel
      </button>
    </div>

    <div class="manage-route-page__table">
      <h1 class="manage-route-page__title">Active Schedules</h1>

      <table v-if="schedules.length > 0">
        <thead>
          <tr>
            <th>Company</th>
            <th>Bus Plate</th>
            <th>Route</th>
            <th>Time</th>
            <th class="price-col">Seats</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
      <p v-else style="text-align: center; padding: 20px; color: #888">No schedules found.</p>
    </div>
  </div>
</template>

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

.manage-route-page__message {
  margin: 0 0 14px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.3;
}

.manage-route-page__message--error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fecaca;
}

.manage-route-page__message--success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #bbf7d0;
}
.manage-route-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.manage-route-page__field {
  display: flex;
  flex-direction: column;
}
.manage-route-page__label {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #aaa;
}

/* Inputs */
.manage-route-page__input,
.manage-route-page__select {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  background: #1f2937;
  border: 1px solid #374151;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}
.manage-route-page__button {
  margin-top: 20px;
  background: #10b981;
  padding: 12px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: 0.2s;
}
.manage-route-page__button:hover {
  background: #059669;
}

.manage-route-page__button--secondary {
  margin-left: 10px;
  background: #374151;
}

.manage-route-page__button--secondary:hover {
  background: #4b5563;
}

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th {
  padding: 12px;
  border-bottom: 1px solid #374151;
  text-align: left;
  color: #9ca3af;
}
td {
  padding: 12px;
  border-bottom: 1px solid #374151;
}
.price-col {
  text-align: right;
  white-space: nowrap;
}
.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

</style>
