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
    ],
    }
  },
}
</script>

<style scoped></style>
