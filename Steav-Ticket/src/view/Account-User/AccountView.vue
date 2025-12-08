<template>
  <div class="AccountPage">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'AccountPage',
  data() {
    return {
      items: [
        { label: 'ProfilePage', to: '/account/profile' },
        { label: 'MethodPay', to: '/account/methodpay' },
        { label: 'Language', to: '/account/language' },
        { label: 'Help', to: '/account/help' },
    ],
    }
  },
}
</script>

<style scoped>
</style>
