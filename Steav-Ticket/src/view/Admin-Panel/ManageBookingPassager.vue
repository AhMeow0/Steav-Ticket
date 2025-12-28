<template>
  <div class="manage-booking-passenger-page">
    <!-- Form Section -->
    <div class="form-box">
      <h1>Manage Route & Schedules</h1>

      <div class="form-grid">
        <div class="form-field">
          <label>Routes</label>
          <select></select>
        </div>

        <div class="form-field">
          <label>Date of Journey</label>
          <input type="date" />
        </div>

        <div class="form-field">
          <label>Time</label>
          <select></select>
        </div>
      </div>

      <button class="save-btn">Apply Filter</button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1>Assigned Booking & Passenger</h1>

      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Username</th>
            <th>Seats</th>
            <th>Date of Journey</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
  .manage-booking-passenger-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.form-box,
.table-box {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

h1 {
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: bold;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-size: 14px;
  color: #e5e7eb;
}

input,
select {
  width: 85%;
  height: 60px;
  padding: 0 18px;
  background: #111827;
  color: white;
  border-radius: 8px;
  border: 1px solid #424242;
  outline: none;
  font-size: 14px;
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

/* TABLE */
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

</style>