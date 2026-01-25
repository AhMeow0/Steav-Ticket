<template>
  <div class="notif-wrapper">
    <div class="bell" @click="toggleDropdown">
      🔔
      <span v-if="unreadCount" class="badge">{{ unreadCount }}</span>
    </div>

    <div v-if="open" class="dropdown">
      <div class="notif-title">Notifications</div>

      <div v-if="notifications.length === 0" class="no-notif">
        No notifications
      </div>

      <div 
        v-for="n in notifications" 
        :key="n.id" 
        class="notif-item"
      >
        <div class="msg">{{ n.message }}</div>
        <div class="time">{{ format(n.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const open = ref(false)
const notifications = ref([])
const unreadCount = ref(0)

const userId = 1 // replace with actual logged-in user ID

const loadNotifications = async () => {
  const res = await fetch(`/notifications/${userId}`)
  notifications.value = await res.json()
  unreadCount.value = notifications.value.filter(n => !n.read).length
}

const markRead = async () => {
  unreadCount.value = 0
  await fetch(`/notifications/read`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  })
}

const toggleDropdown = () => {
  open.value = !open.value
  if (open.value) markRead()
}

onMounted(loadNotifications)

const format = (d) => new Date(d).toLocaleString()
</script>

<style>
/* same style as earlier */
</style>
