<template>
  <main class="dashboard-main">
    <h1>Dashboard</h1>

    <!-- Top Stats -->
    <div class="stats-box">
      <div class="stat-card stat-card--trips">
        <h3>Total Trips</h3>
        <p>0</p>
      </div>

      <div class="stat-card stat-card--books">
        <h3>Total Book Seat</h3>
        <p>0</p>
      </div>

      <div class="stat-card stat-card--earns">
        <h3>Total Earn</h3>
        <p>$0</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="filter">
      <select>
        <option>Daily</option>
        <option>Weekly</option>
      </select>
    </div>

    <!-- Chart -->
    <div class="chart-placeholder">
      Chart Area
    </div>
  </main>
</template>

<style scoped>
  .dashboard-main {
  flex-grow: 1;
  padding: 25px;
  color: white;
}

h1 {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 20px;
}


.stats-box {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  background: #111827;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #424242;
}

.stat-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #e5e7eb;
}

.stat-card p {
  font-size: 28px;
  font-weight: bold;
}


.filter {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.filter select {
  width: 150px;
  height: 42px;
  background: #111827;
  color: white;
  border: 1px solid #424242;
  border-radius: 8px;
  padding: 0 10px;
}

.chart-placeholder {
  height: 300px;
  background: #111827;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #9ca3af;
}

</style>