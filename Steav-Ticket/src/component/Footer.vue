<template>
  <footer class="footer">
    <div class="container footer-top">
      <!-- About -->
      <div class="footer-col">
        <h3>About Us</h3>
        <p>
          Welcome to Steav-Ticket, where your journey begins with ease. We're dedicated to making
          bus travel simple, affordable, and enjoyable for everyone.
        </p>
      </div>

      <!-- Links -->
      <div class="footer-col">
        <h3>Quick Links</h3>
        <ul class="links">
          <li><router-link to="/homepage">Home</router-link></li>
          <li><router-link to="/booking">Ticket</router-link></li>
          <li><router-link to="/explore">Explore</router-link></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col">
        <h3>Contact Us</h3>
        <ul class="contact">
          <li>** 123 Khmer Street, Phnom Penh, Cambodia</li>
          <li>** Email: info@steavticket.com</li>
          <li>** Phone: +855 16 234 0877</li>
        </ul>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom container">
      <p>@2023 T-Rester. All rights reserved.</p>

      <div class="social">
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="Instagram">◎</a>
        <a href="#" aria-label="X">X</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.footer {
  background-color: #f24b6a;
  color: white;
  font-family: 'Poppins', sans-serif;
  padding-top: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* TOP */
.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 60px;
}

.footer-col {
  flex: 1;
}

.footer h3 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 18px;
}

.footer p {
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.85;
  max-width: 360px;
}

.links,
.contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links li,
.contact li {
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.links a {
  text-decoration: none;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.links a:hover {
  opacity: 1;
}

/* BOTTOM */
.footer-bottom {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 2px solid rgba(255, 255, 255, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 13px;
  opacity: 0.75;
  margin: 0;
}

/* SOCIAL */
.social {
  display: flex;
  gap: 16px;
}

.social a {
  width: 36px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  display: grid;
  place-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  transition: background 0.3s;
}

.social a:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .footer-top {
    flex-direction: column;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
