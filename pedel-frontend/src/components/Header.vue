<template>
  <header>
    <el-row type="flex" align="middle">
      <el-col :span="6">
        <img alt="Vue logo" src="../assets/pedel_logo.png" />
      </el-col>
      <el-col :span="24" :push="24">
        <div id="nav">
          <router-link to="/library">Library</router-link> |
          <router-link to="/profile">Profile</router-link> |
          <a href="#" @click="logout">Logout</a>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log(this.$store.state.userData);
      this.$store.commit("reset");
      localStorage.removeItem('vuex')
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
