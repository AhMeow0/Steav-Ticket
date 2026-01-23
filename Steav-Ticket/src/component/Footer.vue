<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Brand + Newsletter -->
        <div class="footer-brand">
          <h2 class="brand-logo">Steav-Ticket</h2>
          <p class="brand-text">
            Simple, affordable, joyful bus journeys across Cambodia and beyond.
            Your next trip starts with us.
          </p>

          <div class="newsletter">
            <p class="newsletter-label">Get exclusive deals & route updates</p>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <input
                type="email"
                placeholder="Enter your email"
                required
                aria-label="Email for updates"
              />
              <button type="submit" class="subscribe-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="footer-grid">
          <div class="footer-column">
            <h3>Navigation</h3>
            <ul>
              <li><router-link to="/homepage">Home</router-link></li>
              <li><router-link to="/booking">Book Ticket</router-link></li>
              <li><router-link to="/explore">Explore Routes</router-link></li>
              <li><router-link to="/aboutus">About Us</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help & FAQ</a></li>
              <li><a href="#">Cancellation Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Get in Touch</h3>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📍</span>
                123 Khmer Street, Phnom Penh, Cambodia
              </li>
              <li>
                <span class="contact-icon">✉️</span>
                info@steavticket.com
              </li>
              <li>
                <span class="contact-icon">📞</span>
                +855 16 234 087
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Steav-Ticket. Built with ❤️ in Cambodia.
        </p>

        <div class="social-icons">
          <a href="#" aria-label="Facebook" class="social-link">f</a>
          <a href="#" aria-label="Instagram" class="social-link">◎</a>
          <a href="#" aria-label="X (Twitter)" class="social-link">X</a>
          <a href="#" aria-label="Telegram" class="social-link">✈️</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

function handleSubscribe() {
  // TODO: connect to real backend / email service later
  alert('Thank you! You’ll receive updates soon.')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 6rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(237, 72, 108, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  gap: 5rem;
  margin-bottom: 5rem;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

/* Brand */
.brand-logo {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1.25rem;
  background: linear-gradient(90deg, #ED486C, #ff6b8a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.brand-text {
  font-size: 1.1rem;
  line-height: 1.7;
  opacity: 0.85;
  max-width: 420px;
  margin: 0 0 2.8rem 0;
}

/* Newsletter */
.newsletter-label {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
  max-width: 460px;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem 1.4rem;
  border: none;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(237, 72, 108, 0.4);
  background: rgba(255, 255, 255, 0.12);
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.subscribe-btn {
  background: linear-gradient(90deg, #ED486C, #ff6b8a);
  color: white;
  border: none;
  padding: 0 2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.35s ease;
}

.subscribe-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(237, 72, 108, 0.45);
}

/* Grid Columns */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.8rem;
  }
}

.footer-column h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
  color: white;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 1rem;
}

.footer-column a,
.contact-list li {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 1.05rem;
  transition: all 0.28s ease;
  display: inline-block;
}

.footer-column a:hover,
.contact-list li:hover {
  color: #ED486C;
  transform: translateX(6px);
}

.contact-list .contact-icon {
  margin-right: 0.9rem;
  font-size: 1.2rem;
  opacity: 0.85;
}

/* Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.98rem;
  opacity: 0.8;
}

.copyright {
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 1.4rem;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 0.32s ease;
  backdrop-filter: blur(8px);
}

.social-link:hover {
  background: #ED486C;
  border-color: #ED486C;
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 28px rgba(237, 72, 108, 0.4);
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: 1.8rem;
    text-align: center;
  }
}
</style>
