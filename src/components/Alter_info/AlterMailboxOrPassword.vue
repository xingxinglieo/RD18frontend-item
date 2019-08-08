<template>
  <div class="container">
    <el-container>
      <el-header class="header">
        <router-link :to="{path: '/alterMyInfo'}">
        <el-button class="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconfanhui" />
          </svg>
        </el-button>
        </router-link>
        <div class="switcher">
          <el-button @click="alterMailbox = true, alterPassword = false, findPassword = false">更换邮箱</el-button>
          <el-button @click="alterMailbox = false, alterPassword = true, findPassword = false">修改密码</el-button>
          <el-button @click="alterMailbox = false, alterPassword = false, findPassword = true">找回密码</el-button>
        </div>
      </el-header>
      <el-main class="main">
        <!-- 更换邮箱 -->
        <el-main class="step">
          请输入你现在的邮箱
          <el-input
            v-model="currentMailbox"
            maxlength="20"
            clearable
            @blur="checkMailbox()"
            @focus="hideWarn()"
          ></el-input>
          <span v-show="check1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconjinggao" />
            </svg>
            {{mailboxMsg}}
          </span>
        </el-main>
        <el-main class="step">
          请输入你的密码
          <el-input
            v-model="password"
            maxlength="20"
            show-password
            clearable
            @focus="checkMailboxInput()"
            @blur="checkPassword()"
          ></el-input>
          <span v-show="check2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconjinggao" />
            </svg>
            {{passwordMsg}}
          </span>
        </el-main>
        <div v-show="alterMailbox">
          <el-main class="step">
            请输入你的新邮箱
            <el-input v-model="newMailbox" maxlength="20" clearable @change="checkNewMailbox()"></el-input>
            <span v-show="check3">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconjinggao" />
              </svg>
              {{newMailboxMsg}}
            </span>
          </el-main>
          <el-main class="step">
            请再次输入你的新邮箱
            <el-input
              v-model="certainMailbox"
              maxlength="20"
              clearable
              @change="checkCertainMailbox()"
              @blur="checkNewMailboxInput()"
            ></el-input>
            <span v-show="check4">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconjinggao" />
              </svg>
              {{certainMsg}}
            </span>
          </el-main>
        </div>
        <!-- 修改密码 -->
        <div v-show="alterPassword">
          <el-main class="step">
            请输入你的新密码
            <el-input
              show-password
              clearable
              v-model="newPassword"
              placeholder="由8-16个字母和数字组成，不能是纯数字或纯英文"
              minlength="8"
              maxlength="16"
              @blur="checkNewPassword()"
            ></el-input>
            <span v-show="check5">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconjinggao" />
              </svg>
              {{newPasswordMsg}}
            </span>
          </el-main>
          <el-main class="step">
            请再次输入你的新密码
            <el-input
              show-password
              clearable
              v-model="certainPassword"
              placeholder="由8-16个字母和数字组成，不能是纯数字或纯英文"
              minlength="8"
              maxlength="16"
              @focus="checkFirstInput()"
              @blur="checkSecondInput()"
            ></el-input>
            <span v-show="check6">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconjinggao" />
              </svg>
              {{certainPasswordMsg}}
            </span>
          </el-main>
        </div>
        <el-main class="step">
          请输入验证码
          <el-input v-model="code" maxlength="4" clearable @focus="checkTwiceMailbox()"></el-input>
          <div class="code">
            <div class="security-code"></div>
            <el-button>看不清？换一个</el-button>
          </div>
        </el-main>
      </el-main>
      <el-footer class="footer">
        <el-main class="step">
          <el-button class="submit-userRequest" @click="submitUserRequest()">确认修改</el-button>
        </el-main>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alterMailbox: true,
      alterPassword: false,
      findPassword: false,
      currentMailbox: "",
      password: "",
      newMailbox: "",
      certainMailbox: "",
      code: "",
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      check6: false,
      mailboxMsg: "",
      passwordMsg: "",
      newMailboxMsg: "",
      certainMsg: "",
      newPassword: "",
      certainPassword: "",
      newPasswordMsg: "",
      certainPasswordMsg: ""
    };
  },
  methods: {
    checkMailbox() {
      var reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (this.currentMailbox != "" && !reg.test(this.currentMailbox)) {
        this.mailboxMsg = "邮箱格式有误";
        this.check1 = true;
      } else {
        this.check1 = false;
      }
    },
    hideWarn() {
      this.check1 = false;
    },
    checkMailboxInput() {
      if (this.currentMailbox == "") {
        this.mailboxMsg = "请先输入邮箱";
        this.check1 = true;
      }
    },
    checkPassword() {
      var reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$");
      if (this.password != "" && !reg.test(this.password)) {
        this.check2 = true;
        this.passwordMsg = "密码格式有误";
      } else {
        this.check2 = false;
      }
    },
    checkNewMailbox() {
      var reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (this.newMailbox != "" && !reg.test(this.newMailbox)) {
        this.newMailboxMsg = "邮箱格式有误";
        this.check3 = true;
      } else {
        this.check3 = false;
      }
    },
    checkCertainMailbox() {
      var reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (this.newMailbox == "") {
        this.newMailboxMsg = "此次不能为空";
        this.check3 = true;
      } else if (this.certainMailbox != "" && !reg.test(this.certainMailbox)) {
        this.certainMsg = "邮箱格式有误";
        this.check4 = true;
      } else if (this.certainMailbox != this.newMailbox) {
        this.certainMsg = "两次输入不一样";
        this.check4 = true;
      } else {
        this.check4 = false;
      }
    },
    checkNewMailboxInput() {
      if (this.certainMailbox == "") {
        this.check4 = false;
      }
    },
    checkTwiceMailbox() {
      if (this.certainMailbox == "") {
        this.check4 = true;
        this.certainMsg = "此处不能为空";
      }
    },
    checkNewPassword() {
      var reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$");
      if (this.newPassword != "" && !reg.test(this.newPassword)) {
        this.check5 = true;
        this.newPasswordMsg = "密码格式有误";
      } else {
        this.check5 = false;
      }
    },
    checkFirstInput() {
      if (this.newPassword == "") {
        this.check5 = true;
        this.newPasswordMsg = "此处不能为空";
      }
    },
    checkSecondInput() {
      var reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$");
      if (this.certainPassword != "" && !reg.test(this.certainPassword)) {
        this.check6 = true;
        this.certainPasswordMsg = "密码格式有误";
      } else if (
        this.certainPassword != this.newPassword &&
        this.newPassword != ""
      ) {
        this.check6 = true;
        this.certainPasswordMsg = "两次输入不一样";
      } else {
        this.check6 = false;
      }
    },
    submitUserRequest() {
      if (this.alterMailbox == true) {
        // 修改邮箱
        if (
          this.currentMailbox == "" ||
          this.password == "" ||
          this.newMailbox == "" ||
          this.certainMailbox == "" ||
          this.code == "" ||
          this.check1 == true ||
          this.check2 == true ||
          this.check3 == true ||
          this.check4 == true
        ) {
          alert("请正确并且完整地填写相关信息！");
          return;
        } else {
          // 发起请求
        }
      } else {
        // 修改密码
        if (
          this.currentMailbox == "" ||
          this.password == "" ||
          this.newPassword == "" ||
          this.certainPassword == "" ||
          this.code == "" ||
          this.check1 == true ||
          this.check2 == true ||
          this.check5 == true ||
          this.check6 == true
        ) {
          alert("请正确并且完整地填写相关信息！");
          return;
        } else {
          // 发起请求
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@mixin fixCenter() {
  margin-right: auto;
  margin-left: auto;
}

.container {
  background-color: #e5e9f0;
}

.header {
  @include fixCenter();
  display: flex;
  justify-content: center;
  width: 60%;
  color: white;
  font-size: 2em;
  font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
  background-color: #fff;
}

.back {
  position: absolute;
  left: 22%;
  top: 1%;
}

.switcher {
  text-align: center;
}

.main {
  @include fixCenter();
  width: 60%;
  background-color: #fff;
}

.step {
  @include fixCenter();
  font-size: 1.2em;
  font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
  width: 50%;
}

.main span {
  color: red;
}

.code {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.security-code {
  flex: 1;
  width: 70px;
  height: 40px;
  margin-right: 5%;
  border: 1px solid black;
}

.submit-userRequest {
  width: 100%;
}

.footer {
  @include fixCenter();
  width: 60%;
  background-color: #fff;
  padding-bottom: 5%;
}
</style>
