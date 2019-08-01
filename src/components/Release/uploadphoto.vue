<template>
  <transition name="el-fade-in">
    <div id="xing-wrapper" class="xing-upload" :style="{width : width + 'px',}">
      <!-- 
		下面包含props 用v-on 将父方法传给子组件
      -->
      <!-- 
		走马灯
      -->
      <el-carousel
        trigger="click"
        arrow="always"
        indicator-position="none"
        :autoplay="false"
        style="height: 300px;width: 300px;margin: 0px auto;"
      >
        <el-carousel-item v-for="item in fileurl" :key="item.url">
          <img :src="item.url" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
      <div id="upload">
        <el-popover trigger="hover" placement="top" width="150">
          <span v-if="fileurl.length === limit">
            <i class="el-icon-warning-outline"></i>
            最多上传 {{limit}} 张图片
          </span>
          <span v-else>
            <i class="el-icon-s-opportunity"></i>
            可以上传 {{limit}} 张图片
          </span>
          <el-upload
            ref="upload"
            style="display:inline-block"
            slot="reference"
            action
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="noAuto"
            :on-exceed="exceed"
            :multiple="true"
            :limit="limit"
            accept="image/*"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-popover>
      </div>
      <!-- 
		下面这个是用来展示放大图的 
      -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="倾旅" />
      </el-dialog>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      noAuto: false,
      fileurl: [],
      limit: 8
    };
  },
  props: {
    width: Number
  },
  //只有在挂载完全之后,才能获取this.$children[1].uploadFiles;
  mounted: function() {
    this.fileurl = this.$refs.upload.uploadFiles;
  },
  methods: {
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url; //把文件的blob url 传给data
      this.dialogVisible = true;
    },
    exceed(fileList) {
      this.$message({
        showClose: true,
        message: "最多上传 " + this.limit + " 张图片!",
        type: "warning",
        duration: 1500
      });
    }
  }
};
</script>

<style lang="scss" >
$red: #e74b37;
$scan: 38px;
#xing-wrapper {
  width: 500px;
}
.el-icon-warning-outline {
  color: #f56c6c;
}
.el-icon-s-opportunity {
  color: #e6a23c;
}
.xing-upload {
  li.el-upload-list__item.is-ready {
    width: $scan;
    height: $scan;
  }
  #upload {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }
  .el-upload-list__item-actions {
    font-size: 13px;
  }
  .el-upload--picture-card {
    height: $scan;
    width: $scan;
    line-height: $scan;
  }
  .el-upload--picture-card i {
    font-size: 17px;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions {
    letter-spacing: -5px;
    text-indent: -2px;
  }
}
</style>
