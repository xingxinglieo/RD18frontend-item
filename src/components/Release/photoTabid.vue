<template>
  <div id="onlyphototabid">
    <el-select ref="select" v-model="value" placeholder="请选择标签" style="width:100%;margin:10px 0px;">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-input style="margin-bottom:10px" ref="input" v-model="name" placeholder="照片名字,15字内" maxlength="15"></el-input>
    <el-input
      type="textarea"
      rows=4
      v-model="note"
      maxlength="100"
      placeholder="备注,100字内"
    ></el-input>
  </div>
</template>

<script>
export default {
    props:{
        userid: Number,
    },
  data() {
    return {
      options: [],
      value: 2,
      name:"",
      note:"",

    };
  },
  created: function() {
    this.$axios({
      url: "/photoWall/tabs/" + this.userid,
      method: "get"
    })
      .then(response => {
        this.options = response.data.message;
      })
      .catch(response => {
        this.$message({
          message: "请求失败,请检查网络",
          type: "warning"
        });
      });
  }
};
</script>