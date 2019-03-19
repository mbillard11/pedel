<template>
  <div class="register">
   <form id="registration"  @submit.prevent>
        <h1>Register</h1>
        <!-- Update email and password -->
        <label for="username">Username: </label>
        <el-input placeholder="Please enter username" v-model="formData.username"></el-input>
        <label for="email">Email: </label>
        <el-input placeholder="Please enter a valid email" v-model="formData.email"></el-input>
        <label for="password">Password: </label>
        <el-input placeholder="Please enter desired password" v-model="formData.password"></el-input>
        <button @click.prevent="register()" >Submit</button>
        <h1 v-if="regSuccess && regSuccess.success"> {{ regSuccess.message }}</h1>
      
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
            regSuccess: {}
        }
    },
    methods: {
        register(){
            let data = JSON.parse(JSON.stringify(this.formData))
            console.log(data)
            this.$axios.post('http://localhost:3000/register', data).then(response =>{
                let data = response.data 
                this.regSuccess = data
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
