<template>
  <div class="register">
    <el-container>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form ref="form" v-model="formData" label-width="120px">
            <el-form-item label="Username">
              <el-input
                v-model="formData.username"
                placeholder="Please enter desired username"
              ></el-input>
            </el-form-item>
            <el-form-item label="email">
              <el-input
                v-model="formData.email"
                placeholder="Please enter valid email"
              ></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input
                type="password"
                v-model="formData.password"
                placeholder="Please enter password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">Register</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
    <h1 v-if="regSuccess">{{ regSuccess.message }}</h1>
    <!-- <form id="registration" @submit.prevent>
      <h1>Register</h1>
      <label for="username">Username: </label>
      <el-input
        placeholder="Please enter username"
        v-model="formData.username"
      ></el-input>
      <label for="email">Email: </label>
      <el-input
        placeholder="Please enter a valid email"
        v-model="formData.email"
      ></el-input>
      <label for="password">Password: </label>
      <el-input
        type="password"
        placeholder="Please enter desired password"
        v-model="formData.password"
      ></el-input>
      <button @click.prevent="register()">Submit</button>
      <h1 v-if="regSuccess">{{ regSuccess.message }}</h1>
    </form> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: ""
      },
      regSuccess: {}
    };
  },
  methods: {
    register() {
      let data = JSON.parse(JSON.stringify(this.formData));
      console.log(data);
      this.$api
        .post("/register", data)
        .then(response => {
          let data = response.data;
          this.message= 'User succesfully registered. You will be redirected to the login page in 3 seconds.'
            setTimeout(() => {
              this.$router.push("/login");
              this.message = '';
            }, 3000);
          // console.log(data)
          // this.regSuccess = data;
          // if (data.success) {
          //   this.$router.push("/login");
          // }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
