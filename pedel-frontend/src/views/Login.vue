<template>
  <div class="login">
   <form id="logon"  @submit.prevent>
        <h1>Login</h1>
        <!-- Update email and password -->
        <label for="username">Username: </label>
        <el-input placeholder="Please enter username" v-model="formData.username"></el-input>
        <label for="password">Password: </label>
        <el-input placeholder="Please enter desired password" v-model="formData.password"></el-input>
        <button @click.prevent="login()" >Submit</button>
        <h1 v-if="loginSuccess"> {{ loginSuccess.message }}</h1>
      
    </form>
  </div>
</template>
<script>
export default {
    data(){
        return{
            formData:{
                username:'',
                email:'',
                password:''
            },
            loginSuccess: {}
        }
    },
    methods: {
        login(){
            let data = JSON.parse(JSON.stringify(this.formData))
            console.log(data)
            this.$axios.post('http://localhost:3000/login', data).then(response =>{
                let data = response.data 
                this.loginSuccess = data
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>