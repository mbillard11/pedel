<template>
  <div id="app">
    <el-container v-if="isLoggedIn">
      <Header></Header>
    </el-container>
    <el-container v-else>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <img alt="Vue logo" src="./assets/pedel_logo.png" />
          <h1>Welcome to Pedel</h1>
          <p>Pedel is a free public domain library</p>
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </el-col>
      </el-row>
    </el-container>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.userData.isLoggedIn;
    }
  }
};
</script>

<style lang="scss">
.el-row {
  width: 100%;
}
a {
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
#app {
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
