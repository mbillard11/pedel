<template>
  <div class="login">
    <el-container>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form ref="form" v-model="formData" label-width="120px">
            <el-form-item label="Username">
              <el-input
                v-model="formData.username"
                placeholder="Please enter username"
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
              <el-button type="primary" @click="onSubmit">Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
    <h1 v-if="loginSuccess">{{ loginSuccess.message }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      loginSuccess: {}
    };
  },
  methods: {
    onSubmit() {
      let data = JSON.parse(JSON.stringify(this.formData));
      console.log(data);
      // The responce is a success and message objects. We print message above.
      // We will use the success response to perform a redirect when True
      this.$axios
        .post("http://localhost:3000/login", data)
        .then(response => {
          let data = response.data;
          this.loginSuccess = data;
          // get admin status from response?
          this.$store.commit("loginState", true);
          if (data.success) {
            this.$router.push("/profile");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
