<template>
  <div class="profile-page">
    <div class="sidebar">
      <div class="profile-header">
        <div class="avatar">
          <img src="../../assets/img/avatar.png" alt="User Avatar" />
        </div>
        <!-- <p class="profile-status">{{ isEditing ? 'Editing Profile' : 'View Mode' }}</p> -->
         <a href="#">{{ 'Edit' }}</a>
        <h2 class="welcome-text">Welcome,  Steav </h2>
      </div>

      <nav class="menu">
        <button class="menu-item ">
          <span class="icon">👤</span>
          <span>Personal Information</span>
        </button>
        <button class="menu-item active">
          <span class="icon">💳</span>
          <span>Payments</span>
        </button>
        <button class="menu-item">
          <span class="icon">Aa</span>
          <span>Language</span>
        </button>
        <button class="menu-item">
          <span class="icon">❓</span>
          <span>Help</span>
        </button>
        <button class="menu-item logout">
          <span class="icon">↩</span>
          <span>Log out</span>
        </button>
      </nav>
    </div>

    <div class="content ">
      <div class="content-header">
        <h1 class="page-title ">Payment Methods</h1>
        <p>This is the Method Pay page where users can manage their payment methods.</p>
      </div>
      <div class="MethodPay">
        
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.profile-page {
  display: flex;
  height: 99vh;
  background-color: #000;
}

.sidebar {
  width: 305px;
  background: linear-gradient(180deg, #ff6b9d 0%, #ff5e8f 100%);
  padding: 40px 20px;
  color: white;
  margin-left: -5px;
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  border: #f0eded 1px solid;
  border-radius: 10px;
  gap: 40px;
}

.profile-header {
  text-align: center;
  margin-bottom: 60px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-text {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  text-align: left;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-item .icon {
  font-size: 20px;
}

.content {
  flex: 1;
  background-color: white;
  padding: 60px 80px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #000;
}

.profile-form {
  max-width: 900px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}


</style>
