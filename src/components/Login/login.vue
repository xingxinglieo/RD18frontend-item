<template>
  <div>
    <form>
      <el-popover placement="right" trigger="focus" :disabled="isEmail">
        <el-input placeholder="请输入邮箱" v-model="email" slot="reference"></el-input>
        <span>
          <i class="el-icon-warning-outline"></i> 邮箱格式不正确
        </span>
      </el-popover>
      <div class="blank"></div>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <div class="blank"></div>
        <div style="width:100%;user-select:none" slot="reference">
          <el-input placeholder="请输入验证码" v-model="verifyCode" style="width:calc(100% - 130px);"></el-input>
          <span id="verifyCodeTip" style="float:right;" @click="requestVerifyCode">看不清?</span>
          <img :src="img" style="height: 36px;float:right;margin-top:2px;" />
        </div>

      <div class="blank"></div>
      <el-popover placement="right" trigger="hover" :disabled="isVerify&&isEmail">
        <span>
          <i class="el-icon-warning-outline"></i> 请检查邮箱格式或输入验证码
        </span>
        <el-button
          type="primary"
          plain
          slot="reference"
          @click="sendLoginRequest"
          :disabled="throttle"
        >登录</el-button>
      </el-popover>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    publicKey: String
  },
  data() {
    return {
      email: "",
      password: "",
      verifyCode: "",
      img: "",
      throttle: false //节流 , 防止用户多次点击注册按钮
    };
  },
  created: function() {
    this.requestVerifyCode();
  },
  methods: {
    requestVerifyCode() {
      this.$axios({
        url: "/user/verifyCode",
        method: "get",
        responseType: "blob"
      })
        .then(response => {
          window.URL.revokeObjectURL(this.img);
          this.img = window.URL.createObjectURL(response.data);
        })
        .catch(response => {
        });
    },
    sendLoginRequest() {
      if (!this.isVerify || !this.isEmail) {
        this.$message({
          message: "请检查邮箱格式或输入验证码",
          type: "error",
          center: true,
          duration: 1500,
        });
        return;
      }
      this.throttle = true;
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicKey);
      let encryptData = encrypt.encrypt(this.password); //加密后的字符串
      let myFormData = new FormData();
      myFormData.append("userName", this.email);
      myFormData.append("password", encryptData);
      myFormData.append("verifyCode", this.verifyCode);
      this.$axios({
        url: "/user/login",
        method: "post",
        data: myFormData,
        timeout: 10000,

        config: {
          headers: { "Content-Type": "multipart/form-data" },
        }
      })
        .then(data => {
          this.throttle = false;
          if (data.result === "success") {
            this.$store.commit("changeLoginState");
            this.$store.commit("closeLoginContain");
            this.$message({
              message: "登录成功",
              type: "success",
              center: true
            });
          } else {
            this.$message({
              message: "登录失败 , 请检查验证码或者账户密码",
              type: "error",
              center: true,
              duration: 1500
            });
            this.password = "";
            this.verifyCode = "";
            this.requestVerifyCode();
          }
        })
        .catch(data => {
          this.throttle = false;
          console.log(3432);
          this.$message({
            message: "连接失败 , 请检查网络或者联系管理员",
            type: "error",
            center: true,
            duration: 1500
          });
          this.requestVerifyCode();
        });
    }
  },
  computed: {
    isEmail: function() {
      return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(
        this.email
      );
    },
    isVerify: function() {
      return this.verifyCode.length === 4;
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.blank {
  height: 20px;
}
.el-popover {
  min-width: 0;
}

.el-icon-check {
  color: #67c23a;
}

.el-icon-warning-outline {
  color: #f56c6c;
}

.el-button {
  width: 100%;
}

.el-input__suffix-inner {
  display: none;
}
#verifyCodeTip {
  font-size: 11px;
  color: grey;
  vertical-align: bottom;
  cursor: pointer;
  margin: 24px 0 0 5px;
}
</style>
