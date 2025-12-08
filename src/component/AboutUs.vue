<template>
  <div class="page-wrapper">
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
// REMOVED IMPORT because App.vue handles the navbar
</script>

<style scoped>
.page-wrapper { 
  background-color: #fff; 
  /* Changed min-height to fit inside the existing App.vue layout better */
  height: 100%; 
  padding-bottom: 50px;
}
.content-area { padding-top: 2rem; max-width: 1000px; margin: 0 auto; }
.page-title { color: #E91E63; margin-bottom: 2rem; text-align: center; }

.about-card {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 3rem;
  gap: 3rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); /* Added subtle shadow for pop */
}

/* Mobile Responsive adjustment: Stack items on small screens */
@media (max-width: 768px) {
  .about-card { flex-direction: column; text-align: center; }
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
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 4px solid #FEF0F4; /* Adds a nice ring matching your theme */
}

.logo-placeholder { font-weight: 800; color: #E91E63; font-size: 1.5rem; }

.about-text-section {
  flex: 2;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}
</style>