<template>
  <div
    style="position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: rgba(0,0,0,0.75);
    "
  >
    <!-- 遮盖层 -->
    <div id="uploadContent">
      <i class="el-icon-close" @click=""></i>
      <photo ref="upLoadPhoto"></photo>
      <el-popover placement="top" trigger="focus" :disabled="title.length<=40">
        <el-input
          type="text"
          id="title"
          maxlength="50"
          placeholder="输入标题"
          slot="reference"
          @change="storeContent"
          v-model="title"
        ></el-input>
        <span>
          <i class="el-icon-s-opportunity"></i> 标题最多50字 !
          <span style="font-size:10px;color:grey">/{{title.length}}字</span>
        </span>
      </el-popover>
      <div id="emojiWrapper">
        <emoji bindInputTextrea="#uploadContent .el-textarea__inner"></emoji>
        <div style="
      float:right;
      font-size:10px;
      color:grey;
      ">
          <i class="el-icon-paperclip" v-if="hasStore" @click="storeContent"></i>
          <i class="el-icon-loading" v-else></i>
          {{storeTip}}
        </div>
        <el-button
          style="float:right;margin:6px"
          size="mini"
          round
          :loading="inSending"
          @click="sendAll"
        >发表</el-button>
      </div>
      <div>
        <el-input
          type="textarea"
          maxlength="3000"
          v-model="content"
          :autosize="{minRows:8,maxRows:14}"
          @change="storeContent"
          @focus="storeContent"
          placeholder="记录你的旅行印记/3000字"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import emoji from "./emojitragger";
import photo from "./uploadphoto";
export default {
  components: {
    emoji: emoji,
    photo: photo
  },
  data() {
    return {
      content: "",
      title: "",
      storeTip: "文字已保存",
      hasStore: true,
      table: 0,
      inSending: false
    };
  },
  created: function() {
    if (localStorage.getItem("$_content_") != undefined) {
      this.content = localStorage.getItem("$_content_");
      this.title = localStorage.getItem("$_title_");
    }
    else{
      localStorage.setItem("$_title_", "");
      localStorage.setItem("$_content_", "");
    }
  },
  methods: {
    storeContent() {
      this.hasStore = false;
      this.storeTip = "正在保存至本地";
      localStorage.setItem("$_title_", this.title);
      localStorage.setItem("$_content_", this.content);
      setTimeout(() => {
        this.hasStore = true;
        this.storeTip = "文字已保存";
      }, 500);
    },
    sendAll() {
      if (this.title.length > 50 || this.content.length > 3000) {
        this.$message({
          message: "超出字数",
          type: "warning"
        });
        return;
      }
      let data = this.createFormData();
      this.$axios({
        method: "post",
        url: "/travel/post",
        data: data,
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        }
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    createFormData() {
      let raw = [];
      for (
        let index = 0;
        index < this.$refs.upLoadPhoto.fileurl.length;
        index++
      ) {
        raw[index] = this.$refs.upLoadPhoto.fileurl[index].raw;
      }
      let myformData = new FormData();
      myformData.append("title", this.title);
      myformData.append("photo", raw);
      myformData.append("content", this.content);
      myformData.append("id", -1);
      myformData.append("table", this.table);
      return myformData;
    }
  },
  computed: {
    denyExceedLimit() {
      return this.title.length <= 40;
    }
  }
};
</script>

<style lang="scss" >
$red: #e74b37;
#uploadContent {
  width: 500px;
  position: absolute;
  left: 50%;
  top:2%;
  transform: translateX(-50%);
  z-index: 1041;
  border: 1px solid $red;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-icon-close{
    float:right;
    margin-right:3px;
    &::before{
    content: "\E6DB";
    font-size: 20px;
    };
    &:hover{
      cursor: pointer;
    }
  }
  #title {
    box-sizing: border-box;
    width: 500px;
    padding: 5px 20px;
    border: none;
    outline: none;
    font-size: 24px;
    font-weight: bold;
    resize: none;
  }
  #emojiWrapper {
    box-sizing: border-box;
    padding: 0px 20px;
    height: 40px;
    line-height: 40px;
    background-color: #d9d9d9;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    .emoji {
      display: inline-block;
      width: 33.1px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .el-textarea__inner {
    box-sizing: border-box;
    padding: 5px 20px;
    line-height: 19px;
    resize:none;
    border: none;
  }
  .el-icon-paperclip {
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
