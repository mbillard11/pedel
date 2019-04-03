<template>
  <el-container>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Username</span>
        <el-button style="float: right; padding: 3px 0" type="text">Edit</el-button>
      </div>
      <div v-for="x in data" :key="x"  class="text item">
        {{x.field + x.value }}
      </div>
    </el-card>
  </el-container>
</template>

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
</style>
