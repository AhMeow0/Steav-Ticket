<script setup lang="ts">
</script>

<template>
  <div id="app-root">
    <router-view />
  </div>
</template>

<style>
/* --- GLOBAL LAYOUT FIX (THIS MAKES FOOTER STAY AT BOTTOM) --- */
html, body, #app-root {
  height: 100%;
  margin: 0;
}

#app-root {
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: #f9f9f9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #f54d65;
}

.links a {
  margin: 0 15px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
}

.links a.active {
  color: #f54d65;
}

.login-pill {
  background: #ffeef1;
  color: #f54d65;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>
