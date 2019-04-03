<template>
  <div class="dashboard">
    <h1>This is the dashboard</h1>
    <p>Welcome back, {{ userData.username }}</p>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  }
};
</script>
