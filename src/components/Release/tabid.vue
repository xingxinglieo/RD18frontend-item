<template>
  <el-select ref="select" v-model="value" placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
        value: 2
      }
    },
    created:function() {
      this.$axios({
        url:'/travel/tabs',
        method: 'get',
      }).then(response=>{
        this.options = response.data.message
      }).catch(response=>{
        this.$message({
                  message: "请求失败,请检查网络",
                  type: "warning"
                });
      })
    }
  }
</script>