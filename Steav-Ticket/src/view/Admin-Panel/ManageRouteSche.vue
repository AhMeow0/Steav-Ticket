<template>
  <div class="Manage-RouteSche-page">
    <!-- Form Section -->
    <div class="form-box">
      <h1>Manage Route & Schedules</h1>

      <div class="form-grid">
        <!-- Route -->
        <div>
          <label>From</label>
          <select></select>
        </div>
        <div>
          <label>To</label>
          <select></select>
        </div>
        <div>
          <label>Depart Time</label>
          <select></select>
        </div>
        <div>
          <label>Day</label>
          <input />
        </div>
      </div>

      <button class="save-btn">Confirm</button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1>Assigned Route & Schedules</h1>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Depart time</th>
            <th>Day</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style scoped>
.manage-RouteSche-page {
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

input,
select {
  width: 100%;
  padding: 8px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 5px;
}

.save-btn {
  margin-top: 20px;
  background: #4caf50;
  padding: 10px 20px;
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
  border-bottom: 1px solid #111827;
  text-align: left;
}
</style>
