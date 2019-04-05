<template>
  <div class="login">
    <el-container>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form ref="form" v-model="formData" label-width="120px">
            <el-form-item label="Email">
              <el-input
                v-model="formData.email"
                placeholder="Please enter email"
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
              <el-alert
               v-if="message"
          title="Success"
          type="success"
          :description="message"
          show-icon>
        </el-alert>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: ""
      },
      message: ''
    };
  },
  methods: {
    onSubmit() {
      let data = JSON.parse(JSON.stringify(this.formData));
      this.$api
        .post("/login", data)
        .then(response => {
          let data = response.data;
          if(data.token){
            localStorage.setItem('token', data.token)
            this.message= 'User succesfully logged in. You will be redirected to profile page in 3 seconds.'
            setTimeout(() => {
              this.$router.push("/profile");
              this.$store.commit("loginState", true);
              this.message = '';
            }, 3000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
