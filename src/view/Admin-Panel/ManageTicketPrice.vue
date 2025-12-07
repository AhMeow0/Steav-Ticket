<template>
  <div class="manage-ticket-price-page">

    <!-- Form Section -->
    <div class="manage-ticket-price__form">
      <h1 class="manage-ticket-price__title">Manage Route & Schedules</h1>

      <div class="manage-ticket-price__grid">

        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">Routes</label>
          <select class="manage-ticket-price__select"></select>
        </div>

        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">Base Price</label>
          <input class="manage-ticket-price__input" />
        </div>

        <div class="manage-ticket-price__field">
          <label class="manage-ticket-price__label">Promotion (%)</label>
          <input class="manage-ticket-price__input" />
        </div>

      </div>

      <button class="manage-ticket-price__button">Confirm Price</button>
    </div>

    <!-- Table Section -->
    <div class="manage-ticket-price__table">
      <h1 class="manage-ticket-price__title">Assigned Ticket Price</h1>

      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Price</th>
            <th>Promotion</th>
          </tr>
        </thead>
      </table>
    </div>

  </div>
</template>

<style scoped>
.manage-ticket-price-page {
  color: white;
  padding: 30px;
  border-radius: 10px;
}

/* Card sections */
.manage-ticket-price__form,
.manage-ticket-price__table {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

/* Headings */
.manage-ticket-price__title {
  font-size: 26px;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Grid */
.manage-ticket-price__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Individual form fields */
.manage-ticket-price__field {
  display: flex;
  flex-direction: column;
}

.manage-ticket-price__label {
  margin-bottom: 6px;
}

/* Inputs */
.manage-ticket-price__input,
.manage-ticket-price__select {
  width: 100%;
  padding: 8px;
  background: #111827;
  border: 1px solid #424242;
  color: white;
  border-radius: 5px;
}

/* Button */
.manage-ticket-price__button {
  margin-top: 20px;
  background: #4caf50;
  padding: 10px 20px;
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
