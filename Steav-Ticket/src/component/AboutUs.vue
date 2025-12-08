<template>
  <div class="page-wrapper">
    <HeadBar />

    <div class="container content-area">
      <h2 class="page-title">About Us</h2>

      <div class="about-card">
        <div class="about-logo-section">
           <div class="logo-circle">
             <span class="logo-placeholder">Steav-Ticket</span>
           </div>
        </div>

        <div class="about-text-section">
          <p class="intro-text">
            Welcome to <strong>Steav-Ticket</strong>, where your journey begins with ease.
            We are dedicated to making bus travel simple, affordable, and enjoyable for everyone.
          </p>
          <p>
            Our seamless platform connects you to reliable routes and operators, 
            offering a wide selection of destinations at competitive prices. 
            With a user-friendly design and secure booking, Steav-Ticket takes the hassle out of your travel plans.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadBar from './HeadBar.vue';
</script>

<style scoped>
.page-wrapper { background-color: #fff; min-height: 100vh; }
.content-area { padding-top: 2rem; }
.page-title { color: #E91E63; margin-bottom: 2rem; }

.about-card {
  display: flex;
  align-items: center;
  background-color: #f8f9fa; /* Light grey background */
  border-radius: 20px;
  padding: 3rem;
  gap: 3rem;
}

.about-logo-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo-circle {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  /* If you have an image, remove background-color and use an <img> tag inside */
}

.logo-placeholder { font-weight: bold; color: #E91E63; font-size: 1.2rem; }

.about-text-section {
  flex: 2;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}
</style>