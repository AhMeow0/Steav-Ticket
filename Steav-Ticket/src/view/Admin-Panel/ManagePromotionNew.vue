<template>
  <div class="manage-promotion-page">

    <!-- Form Section -->
    <div class="form-box">
      <h1 class="section-title">Manage Promotion & News</h1>

      <div class="form-grid">
        <div class="input-group">
          <label>Title</label>
          <input />
        </div>

        <div class="input-group">
          <label>Type</label>
          <input />
        </div>

        <div class="input-group">
          <label>Active Until</label>
          <input />
        </div>

        <div class="input-group span-3">
          <label>Content</label>
          <input class="content-input" />
        </div>
      </div>

      <button class="save-btn">Publish</button>
    </div>

    <!-- Table Section -->
    <div class="table-box">
      <h1 class="section-title">Recent Announcements</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Active Until</th>
          </tr>
        </thead>
      </table>
    </div>

  </div>
</template>

<style scoped>

.manage-promotion-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

/* Box Containers */
.form-box,
.table-box {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Title */
.section-title {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 15px;
}

/* Grid Layout */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Input Group (added line under like Manage Bus) */
.input-group {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.span-3 {
  grid-column: span 3;
}

/* Inputs */
input,
select {
  width: 90%;
  padding: 18px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 14px;
}

.content-input {
  height: 80px;
  padding: 18px 14px;
  font-size: 12px;
}

/* Button */
.save-btn {
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
