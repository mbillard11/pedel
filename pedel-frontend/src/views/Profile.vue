<template>
  <el-container>
    <el-card v-if="userData.type === 'admin'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Admin Tools</span>
      </div>
      <el-button @click="delUser">Delete User</el-button>
      <el-button @click="addBook">Add Book</el-button>
      <el-form v-if="isDeletingUser">
        <el-form-item label="Enter Username">
           <el-input></el-input>
        </el-form-item>
        <el-form-item>
           <el-button @click="deleteUser">Delete</el-button>
        </el-form-item>  
      </el-form>
      <el-form v-if="isAddingBook">
        <el-form-item label="Enter Book Title">
           <el-input></el-input>
        </el-form-item>
        <el-form-item label="Enter Book Author">
           <el-input></el-input>
        </el-form-item>
        <el-form-item label="Enter Book HTML">
           <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button @click="addBookButton">Add</el-button>
        </el-form-item>  
      </el-form>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{userData.username}}'s Profile</span>
        <el-button v-if="isDisabled" style="float: right; padding: 3px 0" type="text" @click="editFields">Edit</el-button>
      </div>
      <el-form>
        <el-form-item label="Username">
           <el-input v-model="updateForm.username" :disabled="isDisabled"></el-input>
        </el-form-item>
         <el-form-item label="Favourite Book">
           <el-input v-model="updateForm.favourite_book" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="Favourite Genre">
           <el-input v-model="updateForm.favourite_genre" :disabled="isDisabled"></el-input>
        </el-form-item>
         <el-form-item label="Number of Books Read">
           <el-input v-model="updateForm.num_books_read" :disabled="isDisabled"></el-input>
        </el-form-item>
         <el-form-item label="Read Time">
           <el-input v-model="updateForm.read_time" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button @click="setUserData" v-if="!isDisabled">Update User</el-button>
        </el-form-item>                      
      </el-form>
            </el-card>
  </el-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    isDisabled: true,
    isDeletingUser: false,
    isAddingBook: false,
    userData: {},
    updateForm: {
      username: "",
      favourite_book: "",
      favourite_genre: "",
      num_books_read: "",
      read_time: ""
    }
  }),
  methods: {
    editFields(){
      this.isDisabled = false;
    },
    delUser(){
      this.isDeletingUser = true;
      this.isAddingBook = false;
    },
    addBook(){
      this.isAddingBook = true;
      this.isDeletingUser = false;
    },
    getUserData() {
      this.$api
        .get("/userData")
        .then(response => {
          let data = response.data;
          console.log(data);
          this.userData = data
          this.updateForm = this.userData;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setUserData() {
      this.$api
        .put("/userData", this.updateForm)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.updateForm = data.data
          this.isDisabled = true
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getUserData()
  }
};
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}

.edit-item{
  display: none;
}
</style>
