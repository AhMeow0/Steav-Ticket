<template>
  <div class="app">
    <header class="topbar">
      <div class="container">
        <div class="logo">Steav-Ticket</div>

        <nav class="nav">
          <a href="/">Home</a>
          <a href="/ticket">Ticket</a>
          <a href="/explore">Explore</a>
          <a href="/about">About Us</a>
        </nav>
        <div class="profile">Profile ▾</div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.topbar {
  background: #fff;
  color: #111;
  padding: 18px 0;
  box-shadow: 0 1px 0 rgba(242, 239, 239, 0.06);
}
.topbar .container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}
.logo {
  font-weight: 700;
  font-size: 20px;
  color: #0b1015;
}
.nav {
  display: flex;
  gap: 18px;
  color: #3b4750;
}
.nav a {
  cursor: pointer;
}
.profile {
  margin-left: auto;
  color: #0b0b0b;
}
</style>
