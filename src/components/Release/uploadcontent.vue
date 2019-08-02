<template>
  <!-- 遮盖层 -->
  <div id="uploadContent">
    <i class="el-icon-close"></i>
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
      <el-button style="float:right;margin:6px" size="mini" round @click="sendAll">发表</el-button>
    </div>
    <div>
      <el-input
        type="textarea"
        maxlength="3000"
        v-model="content"
        rows="4.5"
        @change="storeContent"
        @focus="storeContent"
        placeholder="记录你的旅行印记/3000字"
      ></el-input>
    </div>
  </div>
</template>
<script>
import emoji from "./emojitragger";
import photo from "./uploadphoto";
import tabid from "./tabid";
export default {
  components: {
    emoji: emoji,
    photo: photo,
    tabid: tabid
  },
  data() {
    return {
      content: "",
      title: "",
      storeTip: "文字已保存",
      hasStore: true,
      table: "0",
      placeholder: "输入已有标签或创建标签"
    };
  },
  created: function() {
    if (localStorage.getItem("$_content_") != undefined) {
      this.content = localStorage.getItem("$_content_");
      this.title = localStorage.getItem("$_title_");
    } else {
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
      //
      this.$msgbox({
        title: "提示",
        message: this.$createElement("tabid", {
          props: {
            placeholder: this.placeholder
          }
        }),
        showCancelButton: true,
        confirmButtonText: "发表",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "发表中...";
            //
            let data = this.createFormData();
            this.$axios({
              method: "post",
              url: "/travel/post",
              data: data,
              timeout: 50000,
              config: {
                headers: { "Content-Type": "multipart/form-data" }
              }
            })
              .then(response => {
                instance.confirmButtonLoading = false;
                if (response.status === 200) {
                  this.$message({
                    message: "发表成功",
                    type: "success"
                  });
                  this.content = "";
                  this.title = "";
                  localStorage.setItem("$_title_", "");
                  localStorage.setItem("$_content_", "");
                  done();
                } else {
                  instance.confirmButtonText = "发表";
                  this.$message({
                    message: "未知错误",
                    type: "warning"
                  });
                }
              })
              .catch(response => {
                instance.confirmButtonText = "发表";
                instance.confirmButtonLoading = false;
                this.$message({
                  message: "发表失败,请检查网络",
                  type: "warning"
                });
              });
            // console.log()
          } else {
            done();
          }
        }
      }).catch(() => {}); //必须要添加catch 否则报错
      //
    },
    createFormData() {
      let myformData = new FormData();
      for (
        let index = 0;
        index < this.$refs.upLoadPhoto.fileurl.length;
        index++
      ) {
        myformData.append("photo", this.$refs.upLoadPhoto.fileurl[index].raw);
      }
      myformData.append("title", this.title);
      myformData.append("content", this.content);
      myformData.append("id", 0);
      myformData.append(
        "tabId",
        document.querySelector('input[placeholder="' + this.placeholder + '"]')
          .value
      );
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
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1041;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-icon-close {
    position: absolute;
    right: 3px;
    top: 3px;
    z-index: 10;
    &::before {
      content: "\E6DB";
      font-size: 20px;
    }
    &:hover {
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
    resize: none;
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
