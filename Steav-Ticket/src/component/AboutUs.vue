<template>
  <div class="page-wrapper">
    <HeadBar />

    <div class="container content-area">
      <h2 class="page-title">About Us</h2>

      <div class="about-card">
        <div class="about-logo-section">
          <div class="logo-circle">
            <div class="logo-circle">
              <img
                src="../../src/assets/img/profile_image.png"
                alt="Steav Ticket Logo"
                class="logo-image"
              />
            </div>
          </div>
        </div>

        <div class="about-text-section">
          <p class="intro-text">
            Welcome to <strong>Steav-Ticket</strong>, where your journey begins with ease. We are
            dedicated to making bus travel simple, affordable, and enjoyable for everyone.
          </p>
          <p>
            Our seamless platform connects you to reliable routes and operators, offering a wide
            selection of destinations at competitive prices. With a user-friendly design and secure
            booking, Steav-Ticket takes the hassle out of your travel plans.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue'
import HeadBar from './HeadBar.vue'
</script>

<style scoped>
.page-wrapper {
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
}

.content-area {
  padding-top: 2rem;
}
.page-title {
  color: #e91e63;
  margin-top: 100px;
  margin-left: 200px;
  margin-bottom: 2rem;
}


.about-card {
  display: flex;
  align-items: center;
  background-color: white;
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
  background-color: #fff; /* optional fallback */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /*  keep image inside circle */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* fills circle nicely */
}

.logo-placeholder {
  font-weight: bold;
  color: #e91e63;
  font-size: 1.2rem;
}

.about-text-section {
  flex: 2;
  font-size: 1.1rem;
  line-height: 1.6;
  color: black;
}
</style>
