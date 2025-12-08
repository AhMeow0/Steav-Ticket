<template>
  <header class="head-bar">
    <div class="container header-content">
      <div class="logo">
        <h2 class="logo-text">Steav-Ticket</h2>
      </div>

      <nav class="nav-links">
        <router-link to="/homepage">Home</router-link>
        <router-link to="/booking">Booking</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/aboutus">About Us</router-link>
      </nav>

      <div class="auth-action">
        <button class="login-btn">
          Login/Sign up <span class="icon">🎫</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Google Font Import (put this in index.html ideally, but works here for now) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.head-bar {
  background-color: white;
  padding: 1.2rem 0;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03); /* Subtle shadow for depth */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0;
  color: #222;
}

.nav-links {
  display: flex;
  gap: 3rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s;
}

/* Active State (Pink color for active page) */
.active-link {
  color: #F54E75 !important; 
}

.nav-links a:hover {
  color: #F54E75;
}

.login-btn {
  background-color: #FDE8EF; /* Light pink background */
  color: #F54E75; /* Darker pink text */
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}

.login-btn:hover {
  background-color: #fcd5e1;
}
</style>