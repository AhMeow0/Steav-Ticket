<template>
  <div class="manage-route-page">

    <!-- Form Section -->
    <div class="manage-route-page__form">
      <h1 class="manage-route-page__title">Manage Route & Schedules</h1>

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
          <select class="manage-route-page__select"></select>
        </div>

        <div class="manage-route-page__field">
          <label class="manage-route-page__label">Day</label>
          <input class="manage-route-page__input" />
        </div>

      </div>

      <button class="manage-route-page__button">Confirm</button>
    </div>

    <!-- Table Section -->
    <div class="manage-route-page__table">
      <h1 class="manage-route-page__title">Assigned Route & Schedules</h1>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Depart Time</th>
            <th>Day</th>
          </tr>
        </thead>
      </table>
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

/* Grid Layout */
.manage-route-page__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.manage-route-page__field {
  display: flex;
  flex-direction: column;
}

.manage-route-page__label {
  margin-bottom: 6px;
}

/* Inputs */
.manage-route-page__input,
.manage-route-page__select {
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
