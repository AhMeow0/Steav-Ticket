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
        <div class="stat-card stat-card--Earns">
          <h3>Total Earn</h3>
          <p>$0</p>
        </div>
      </div>

    <div class="filter">
      <select>
        <option>Daily</option>
        <option>weekly</option>
      </select>
    </div>

    <div class="chart-placeholder"></div>
  </main>
</template>

<style scoped>
.dashboard-main {
  flex-grow: 1;
  padding: 25px;
}

h1 {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 15px;
}

/* Stats Cards */
.stats-box {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  background: #111827;
  border-radius: 12px;
  text-align: center;

}

.stat-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 28px;
  font-weight: bold;
}

/* Chart Box */
.chart-placeholder {
  margin-top: 25px;
  height: 300px;
  background: #111827;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #ffffff;
}
</style>
