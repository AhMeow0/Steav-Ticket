<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Log In to Steav-Ticket</h1>
      <p class="subtitle">Quick & Simple way to Automate your payment</p>

      <form class="auth-form" method="get">
        <!-- Email -->
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" />

        <!-- Password -->
        <label>Password</label>
        <div class="password-box">
          <input type="password" placeholder="Enter your password" />
        </div>

        <!-- Options -->
        <div class="options">
          <label><input type="checkbox"/>Remember Me</label>
          <a href="#" class="forgot">Forgot Password?</a>
        </div>

        <!-- Login button -->
        <button class="auth-btn">Log In</button>

        <p class="or">OR USE</p>

        <div class="social-row">
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
          <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" />
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #ec2d57;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  width: 480px;
  background: white;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 26px;
  font-weight: 700;
}

.subtitle {
  font-size: 12px;
  margin-bottom: 25px;
  color: #555;
}

.auth-form {
  text-align: left;
}

label {
  font-size: 12px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ff7895;
  border-radius: 6px;
  margin-bottom: 15px;
}

.options {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 15px;
}

.forgot {
  color: #ff4672;
  text-decoration: none;
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background: #ff5476;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.auth-btn:hover {
  background: #ff335c;
}

.or {
  text-align: center;
  margin: 20px 0;
  color: #777;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.social-row img {
  width: 35px;
  cursor: pointer;
}
</style>
