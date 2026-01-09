<template>
  <div class="manage-schedule-page">

    <!-- Form Section -->
    <div class="form-box">
      <h1>Manage Schedules</h1>

      <div class="form-grid">
        <div class="form-field">
          <label>Route</label>
          <select></select>
        </div>

        <div class="form-field">
          <label>Bus</label>
          <select></select>
        </div>

        <div class="form-field">
          <label>Date</label>
          <input type="date" />
        </div>

        <div class="form-field">
          <label>Time</label>
          <select></select>
        </div>

        <div class="form-field">
          <label>Price</label>
          <input type="number" placeholder="Enter price" />
        </div>
      </div>

      <button class="save-btn">Create Schedule</button>
    </div>

    <!-- Schedule List Section -->
    <div class="table-box">
      <h1>Schedule List</h1>

      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Bus</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        </tbody>
      </table>
    </div>

  </div>
</template>


<style scoped>
.manage-schedule-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

/* FORM + TABLE BOX */
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

/* GRID */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-size: 14px;
}

/* INPUTS */
input,
select {
  width: 100%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  font-size: 14px;
}

/* BUTTON */
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
  border-bottom: 1px solid #333;
  text-align: center;
}

/* ACTION BUTTONS */
.edit-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  margin-right: 6px;
  cursor: pointer;
}

.cancel-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

</style>
