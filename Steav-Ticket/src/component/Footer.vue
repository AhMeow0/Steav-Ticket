<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <!-- Brand + Description + Newsletter -->
        <div class="footer-brand">
          <h2 class="brand-logo">Steav-Ticket</h2>
          <p class="brand-desc">
            Affordable, safe, and joyful bus travel across Cambodia and beyond.
            Your next adventure begins here.
          </p>

          <!-- Newsletter -->
          <div class="newsletter">
            <p class="newsletter-title">Stay updated with exclusive deals & new routes</p>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" class="subscribe-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="footer-links">
          <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/homepage">Home</router-link></li>
              <li><router-link to="/booking">Book Ticket</router-link></li>
              <li><router-link to="/explore">Explore</router-link></li>
              <li><router-link to="/aboutus">About Us</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Cancellation & Refund</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Contact Us</h3>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📍</span>
                #123 Street 2004, Sangkat Boeng Keng Kang, Phnom Penh
              </li>
              <li>
                <span class="contact-icon">✉️</span>
                support@steavticket.com
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
          © {{ currentYear }} Steav-Ticket. All rights reserved. Made with ❤️ in Cambodia.
        </p>

        <div class="social-icons">
          <a href="#" aria-label="Facebook" class="social-link fb">f</a>
          <a href="#" aria-label="Instagram" class="social-link ig"></a>
          <a href="#" aria-label="Twitter/X" class="social-link x">X</a>
          <a href="#" aria-label="Telegram" class="social-link tg">✈️</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'SteavFooter' })

import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

function handleSubscribe() {
  // TODO: Connect to real backend (Mailchimp, Resend, etc.) later
  alert('Thank you! You will receive our latest deals soon.')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.footer {
  background: #0f172a; /* Dark navy - clean & premium */
  color: #cbd5e1;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 6rem 0 3rem;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Top Section */
.footer-top {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 6rem;
  margin-bottom: 5rem;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

/* Brand */
.brand-logo {
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 0 1.2rem;
  /* background: linear-gradient(90deg, #e2e8f0, #94a3b8); */
  background: linear-gradient(90deg, #ef3768, #ff6b8a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-desc {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 420px;
  margin: 0 0 2.5rem;
}

/* Newsletter */
.newsletter-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  gap: 0.8rem;
  max-width: 480px;
}

.newsletter-form input {
  flex: 1;
  padding: 1.1rem 1.5rem;
  border: none;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.newsletter-form input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.12);
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.subscribe-btn {
  background: #ef3768;
  color: white;
  border: none;
  padding: 0 2.2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.35s;
}

.subscribe-btn:hover {
  background: #ef3768;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.45);
}

/* Links Grid */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

@media (max-width: 640px) {
  .footer-links {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.footer-column h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 1.1rem;
}

.footer-column a,
.contact-list li {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 1.05rem;
  transition: color 0.3s ease;
}

.footer-column a:hover,
.contact-list li:hover {
  color: #e2e8f0;
}

.contact-list .contact-icon {
  margin-right: 1rem;
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Bottom Bar */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(203, 213, 225, 0.1);
  font-size: 0.95rem;
  opacity: 0.85;
}

.copyright {
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 1.2rem;
}

.social-link {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(203, 213, 225, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #334155;
  border-color: #334155;
  color: white;
  transform: translateY(-3px);
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
