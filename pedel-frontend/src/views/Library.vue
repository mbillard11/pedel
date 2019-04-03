<template>
  <el-table
    :data="tableData"
    border
    style="width: 50%"
    class="table">
    <el-table-column
      prop="title"
      label="Title">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          title: 'The Picture of Dorian Gray'
        },{
          title: 'A Tale of Two Cities'
        }]
      }
    }
  }
</script>

<style>
.table {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px; 
}
</style>

