<template>
  <div class="manange-promotion-new-page">
    <!-- Form Section -->
    <div class="form-box">
      <h1>Manage Promotion & News</h1>

      <div class="form-grid">
        <div>
          <label>Title</label>
          <input />
        </div>
        <div>
          <label>Type</label>
          <input />
        </div>

        <div>
          <label>Active Unit</label>
          <input />
        </div>
        <div>
          <label>Content</label>
          <input class="content-input" />
        </div>
      </div>

      <button class="save-btn">Publish</button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1>Recents Announments</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Active Unit</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style scoped>
.manange-promotion-new-page {
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
.content-input {
  padding: 18px 14px;
  height: 80px;
  font-size: 12px;
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
