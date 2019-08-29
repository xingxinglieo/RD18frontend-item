<template>
  <div class="photo-main-box" id="xing_onlyphoto">
    <div class="photo-box">
      <div class="photos-box">
        <img id="pic" class="photos" :src="photoUrl" v-show="photoUrl" />
      </div>
    </div>
    <div style="display:flex;justify-content: center">
      <el-upload
        ref="onlyphoto"
        style="display:inline-block;"
        action
        list-type="picture-card"
        :auto-upload="false"
        :on-change="change"
        :on-remove="remove"
        :multiple="true"
        :limit="limit"
        accept="image/*"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div style="padding:10px ;display:flex;justify-content: center">
      <el-button type="primary" size="small" @click="sendAll" style="width:100%">发表</el-button>
    </div>
  </div>
</template>

<script>
import tabid from "./photoTabid";
export default {
  components: {
    tabid: tabid
  },
  name: "photo",
  data() {
    return {
      photoName: "",
      note: "",
      tabName: "",
      photoUrl: "",
      options: [],
      value: 2,
      limit: 1,
      show: false
    };
  },
  created() {
  },
  mounted() {
    //   this.url = this.$refs.onlyphoto.uploadFiles;
  },
  methods: {
    sendAll() {
      if (!this.photoUrl) {
        this.$message({
          type: "warning",
          message: "请上传一张照片"
        });
        return;
      }
      this.$msgbox({
        title: "提示",
        message: this.$createElement("tabid", {
          props: {
            userid: this.$store.state.userId
          }
        }),
        showCancelButton: true,
        confirmButtonText: "发表",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
          let data = this.createFormData(instance);
            if(!this.tabName){
              this.$message({
                    message: "请选择标签",
                    type: "warning"
                  });
                  return;
            }
            else if(!this.photoName){
              this.$message({
                    message: "请填写照片名字",
                    type: "warning"
                  });
                  return;
            }
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "发表中...";
            //
            this.$axios({
              method: "post",
              url: "/photoWall/upload",
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
          } else {
            done();
          }
        }
      }).catch(() => {});
    },
    createFormData(instance) {
      let myformData = new FormData();
      myformData.append("photo", this.$refs.onlyphoto.uploadFiles[0].raw);
      let Dom = document.querySelector("#onlyphototabid");
      instance.$children.forEach(element => {
        if (element.$el === Dom) {
          this.photoName = element.name;
          this.note = element.note;
          element.options.forEach(item => {
            if (item.id == element.value) {
              this.tabName = item.name;
            }
          });
        }
      });
      myformData.append("photoName", this.photoName);
      myformData.append("note", this.note);
      myformData.append("tabName", this.tabName);
      return myformData;
    },
    change(file, fileList) {
      this.photoUrl = file.url;
      if (fileList.length >= this.limit) {
        this.$refs.onlyphoto.$refs["upload-inner"].$el.style.display = "none";
      }
    },
    remove() {
      this.photoUrl = "";
      this.$refs.onlyphoto.$refs["upload-inner"].$el.style.display =
        "inline-block";
    }
  }
};
</script>

<style lang="scss">
$scan: 38px;
#xing_onlyphoto {
  width: 182px;
  margin: 0 16px;
  margin-bottom: 30px;
  border: 1px solid rgb(184, 180, 180);
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: rgb(251, 251, 250);
  .el-upload--picture-card {
    height: $scan;
    width: $scan;
    line-height: $scan;
    margin-bottom: 4.2px;
    i {
      font-size: 18px;
    }
  }
  .el-upload-list__item {
    margin-top: 0px;
  }
  li.el-upload-list__item.is-ready {
    width: $scan;
    height: $scan;
    margin-bottom: 0px;
    border: none;
  }
  .photo-box {
    position: relative;
    width: 182px;
    height: 120px;
  }

  .photos-box {
    position: relative;
    overflow: hidden;
    height: 120px;
  }

  .photos {
    height: 100%;
    width: 100%;
    display: block;
  }

  .publish-time {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    padding-left: 0;
  }
  .remarks {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 1;
    background-image: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    );
  }

  .remark-tab {
    position: absolute;
    color: #dfdfdf;
    font-size: 11px;
    height: 20px;
    width: 43%;
    right: 4px;
    top: 8px;
    text-align: right;
  }

  .remark-name {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #dfdfdf;
    padding: 8px 0 0 10px;
    font-size: 18px;
    line-height: 20px;
    height: 20px;
    width: 52%;
  }

  .remark {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #dfdfdf;
    padding: 0 10px;
    font-size: 14px;
    height: 20px;
    width: 95%;
  }

  .revise-main {
    position: absolute;
    top: 3px;
    right: 5px;
    z-index: 10;
  }

  .revise-down {
    cursor: pointer;
    position: relative;
    z-index: 50;
    display: block;
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 50;
    display: block;
    width: 20px;
    height: 20px;
  }

  .revise-box {
    position: absolute;
    top: 21px;
    right: 0;
    width: 130px;
    background: #fff;
    z-index: 49;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  }

  .revise-name,
  .revise-note,
  .revise-tab {
    cursor: pointer;
    color: #262626;
    display: block;
    height: 18px;
    line-height: 18px;
    padding: 8px 0 8px 12px;
  }

  .revise:hover {
    background: rgb(186, 210, 233);
  }
}
</style>