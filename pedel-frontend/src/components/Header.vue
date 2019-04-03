<template>
  <header>
    <!-- <el-container> -->
    <!-- <el-row type="flex" align="top"> -->
    <el-row type="flex" align="middle">
      <el-col :span="6">
        <img alt="Vue logo" src="../assets/pedel_logo.png" />
      </el-col>
      <el-col :span="24" :push="24">
        <div id="nav">
          <!-- <router-link to="/">Home</router-link> | -->
          <router-link to="/library">Library</router-link> |
          <router-link to="/profile">Profile</router-link> |
          <!-- <router-link to="/logout">Logout</router-link> -->
          <a href="#" @click="logout">Logout</a>
        </div>
      </el-col>
    </el-row>
    <!-- </el-container> -->
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log(this.$store.state.userData);
      this.$store.commit("reset");
      this.$router.push("/");
      // let data = this.$store.state.userData
      // console.log(data);
      // // The responce is a success and message objects. We print message above.
      // // We will use the success response to perform a redirect when True
      // this.$axios
      //   .post("http://localhost:3000/logout", data)
      //   .then(response => {
      //     let data = response.data;
      //     this.loginSuccess = data;
      //     this.$store.commit("toggleLoginState", false);
      //     if (data.success) {
      //       this.$router.push("/");
      //     }
      //   })
      // .catch(error => {
      //   console.log(error);
      // });
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
  // padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
