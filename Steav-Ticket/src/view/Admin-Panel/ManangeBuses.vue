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
          />
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Bus Type</label>
          <select class="manage-buses-page__select"></select>
        </div>

        <div class="manage-buses-page__field">
          <label class="manage-buses-page__label">Capacity (Seats)</label>
          <input
            class="manage-buses-page__input"
            type="number"
            placeholder="0"
          />
        </div>

      </div>

      <button class="manage-buses-page__button">Save Buses</button>
    </div>

    <!-- Table Section -->
    <div class="manage-buses-page__table">
      <h1 class="manage-buses-page__title">Assigned Buses</h1>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Bus Plates</th>
            <th>Bus Type</th>
            <th>Capacity</th>
          </tr>
        </thead>
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
</style>
