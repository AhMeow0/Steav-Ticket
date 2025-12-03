<template>
  <div class="manage-buses-page">
    <!-- Form Section -->
    <div class="form-box">
      <h1>Manage Buses</h1>

      <div class="form-grid">
        <div>
          <label>Bus Plate</label>
          <input type="text" placeholder="AC - 123456" />
        </div>

        <div>
          <label>Bus Type</label>
          <select></select>
        </div>

        <div>
          <label>Capacity (Seats)</label>
          <input type="number" placeholder="0" />
        </div>
      </div>

      <button class="save-btn">Save Buses</button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1>Assigned Buses</h1>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Bus Plates</th>
            <th>Bus Type</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.manage-buses-page {
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
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
