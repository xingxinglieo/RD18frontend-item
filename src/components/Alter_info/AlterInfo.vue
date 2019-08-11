<template>
  <!-- 修改用户信息组件 -->
  <div class="main">
    <div class="main-part">
      <div class="info-box">
        <div class="top-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongerenzhongxin-copy" />
          </svg>
          个人中心
        </div>
        <div class="change-box">
          <div class="basic-info">
            <div class="avatar-box">
              <div class="avatar-chunk">
                <div class="avatar-show">
                  <img class="imgContent" src="../../assets/un-login.png" v-if="headPortrait == ''" />
                  <img :src="headPortrait" class="imgContent" />
                </div>
                <form enctype="multipart/form-data" id="changeImg">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    class="input-img"
                    v-on:change="selectNewImg()"
                  />
                  <label for="file" class="change-avater">更换头像</label>
                </form>
              </div>
            </div>
            <div class="prime-info">
              <div class="user-nickname info-point">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconnicheng" />
                </svg>
                昵称
                <input
                  type="text"
                  placeholder="不能超过10个字"
                  maxlength="10"
                  v-model="nickName"
                />
              </div>
              <div class="user-gender info-point">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconxingbie" />
                </svg>
                性别
                <input
                  type="text"
                  v-model="gender"
                  readonly="readonly"
                  @click.stop="showGenderSelect = !showGenderSelect, showBirthSelect = false, showAddressSelect = false"
                />
              </div>
              <div class="gender-select" v-show="showGenderSelect">
                <select v-model="gender">
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div class="user-birth info-point">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconchushengriqi" />
                </svg>
                生日
                <input
                  readonly="readonly"
                  autocomplete="off"
                  v-model="birth"
                  @click.stop="showBirthSelect = !showBirthSelect,showGenderSelect = false, showAddressSelect = false"
                />
              </div>
              <div class="select-birth" v-show="showBirthSelect">
                <select id="year" v-on:change="getDays()" v-model="year"></select>年
                <select id="month" v-on:change="getDays()" v-model="month"></select>月
                <select id="day" v-on:change="getDays()" v-model="day"></select>日
              </div>
              <div class="user-address">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icondidian" />
                </svg>
                地区
                <input
                  type="text"
                  readonly="readonly"
                  autocomplete="off"
                  v-model="address"
                  @click.stop="showAddressSelect = !showAddressSelect, showGenderSelect = false, showBirthSelect = false"
                />
              </div>
              <v-distpicker
                v-show="showAddressSelect"
                @province="onChangeProvince"
                @city="onChangeCity"
                @area="onChangeArea"
              ></v-distpicker>
              <div class="user-mailbox info-point">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#iconicon-test" />
                </svg>
                邮箱
                <input
                  type="text"
                  maxlength="20"
                  readonly="readonly"
                  v-model="mailbox"
                />
              </div>
              <el-button
                size="mini"
                type="primary"
                round
                class="change-mailbox"
                @click="changeInfo()"
              >更换邮箱/修改密码</el-button>
            </div>
          </div>
          <div class="seldom">
            个性签名
            <br />
            <textarea v-model="signature" class="signature" placeholder="写下你的个性签名吧"></textarea>
          </div>
          <div class="other-info">
            <p>偏好</p>
            <div class="preference">
              <div
                class="preference-point"
                v-for="(item, index) in preferenceList"
                :key="index"
                @mouseenter="showIndex = index"
                @mouseleave="showIndex = null"
              >
                {{ item.name }}
                <svg
                  class="icon"
                  aria-hidden="true"
                  v-show="index == showIndex"
                  @click="deletePreference(item.id)"
                >
                  <use xlink:href="#iconshanchu" />
                </svg>
              </div>
            </div>
            <!-- 增加偏好 -->
            <div class="add-preference">
              <svg class="icon" aria-hidden="true" v-show="!show" @mouseenter="show = true">
                <use xlink:href="#iconzengjia" />
              </svg>
              <svg
                class="icon"
                aria-hidden="true"
                v-show="show"
                @click="addPreference()"
                @mouseleave="show = false"
              >
                <use xlink:href="#iconzengjia-copy" />
              </svg>
            </div>
          </div>
          <div class="save-my-info">
            <el-button type="primary" @click="saveInfo()">保&nbsp;存</el-button>
          </div>
          <preference ref="preference" :msg="preferenceList" v-on:preference="changePreference"></preference>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import VDistpicker from "v-distpicker"; // 省市区联动
import Preference from "./Preference";

export default {
  data() {
    return {
      msg: "123",
      posts: [
        {
          msg: "asd",
          asdsad: "asd"
        }
      ],
      showGenderSelect: false,
      showBirthSelect: false,
      showAddressSelect: false,
      id: "",
      nickName: "",
      headPortrait: "",
      gender: "未设置",
      birth: "未设置",
      year: "",
      month: "",
      day: "",
      address: "未设置",
      province: "",
      city: "",
      area: "",
      mailbox: "",
      preference: "",
      signature: "",
      preferenceList: [],
      newId: [],
      oldId: [],
      showIndex: null,
      confirm: false,
      blob: "",
      newImg: "",
      show: false
    };
  },
  methods: {
    getReady() {
      var date = new Date();
      var year = date.getFullYear();
      for (var i = year - 100; i <= year; i++) {
        $("#year").append('<option value="' + i + '">' + i + "</option>");
      }
      for (var j = 1; j <= 12; j++) {
        $("#month").append('<option value="' + j + '">' + j + "</option>");
      }
      this.getDay($("#year").val(), $("#month").val());
    },
    getDaysInMonth(month, year) {
      var days;
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        days = 31;
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        days = 30;
      } else if (year % 4 == 0 && year % 100 != 0) {
        days = 29;
      } else {
        days = 28;
      }
      return days;
    },
    getDay() {
      var year = $("#year").val();
      var month = $("#month").val();
      var days = this.getDaysInMonth(month, year);
      $("#day").empty();
      for (var i = 1; i <= days; i++) {
        $("#day").append('<option value="' + i + '">' + i + "</option>");
      }
    },
    getDays() {
      var year = $("#year").val();
      var month = $("#month").val();
      var days = this.getDaysInMonth(month, year);
      $("#day").empty();
      for (var i = 1; i <= days; i++) {
        $("#day").append('<option value="' + i + '">' + i + "</option>");
      }
      if (this.month == "") {
        this.birth = this.year + "-" + this.month;
      } else {
        this.birth = this.year + "-" + this.month + "-" + this.day;
      }
    },
    selectNewImg() {
      var file = $("#changeImg").find("input")[0].files[0];
      var param = new FormData();
      param.append("headPortrait", file);
      console.log(file)
      this.newImg = param;
      if (file == undefined) {
        return;
      }
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
        alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.headPortrait = e.target.result;

        // this.scaleImage(e.target.result, 2, file.name, file.type);
      };
    },
    scaleImage(base, ratio, fileName, fileType) {
      var _img = new Image();
      var form = new FormData();
      _img.src = base;
      _img.onload = () => {
        let _canvas = document.createElement("canvas");
        let _width = _img.width / ratio;
        let _height = _img.height / ratio;
        _canvas.setAttribute("width", _width);
        _canvas.setAttribute("height", _height);
        _canvas.getContext("2d").drawImage(_img, 0, 0, _width, _height);
        var base = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(blob => {
          if (blob.size > 1024 * 1024) {
            this.scaleImage(base, ratio); // 再次压缩
          } else {
            this.blob = URL.createObjectURL(blob);
          }
        }, "image/jpeg");
      };
    },
    changeInfo() {
      this.$router.push({
        path: "/alterMailboxOrPassword"
      });
    },
    onChangeProvince(data) {
      this.province = data.value;
      this.address = this.province + this.city + this.area;
    },
    onChangeCity(data) {
      this.city = data.value;
      this.address = this.province + this.city + this.area;
    },
    onChangeArea(data) {
      this.area = data.value;
      this.address = this.province + this.city + this.area;
    },
    getUserInfo() {
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 5000
      });
      let params = {
        id: 1
      };
      instance.get(`/user/info/${params.id}`).then(res => {
        console.log(res.data.message);
        if (res.data.result == "success") {
          this.id = res.data.message.id;
          this.headPortrait = res.data.message.headPortrait;
          this.nickName = res.data.message.nickname;
          this.birth = res.data.message.birthday;
          this.address = res.data.message.address;
          this.signature = res.data.message.signature;
        }
        this.getPreference();
      }),
        err => {
          console.log(err);
        };
    },
    getPreference() {
      let params = {
        id: 1
      };
      this.$axios.get(`/user/preference/${params.id}`).then(preferenceRes => {
        if (preferenceRes.data.result == "success") {
          this.preferenceList = [];
          if (
            preferenceRes.data.message != "" &&
            preferenceRes.data.message != null &&
            preferenceRes.data.message != []
          ) {
            for (var i = 0; i < preferenceRes.data.message.length; i++) {
              this.preferenceList.push({
                id: preferenceRes.data.message[i].id,
                name: preferenceRes.data.message[i].name
              });
            }
          }
        }
      });
    },
    deletePreference(id, index) {
      let param = {
        preferenceId: id
      };
      this.$axios.delete(`/user/preference/${param.preferenceId}`).then(res => {
        console.log(res);
        if (res.data.result == "success" && index !== null) {
          this.preferenceList.splice(index, 1);
        }
      }),
        err => {
          console.log(err);
        };
    },
    addPreference() {
      this.$refs.preference.changeState();
      this.$refs.preference.getAllPreference();
    },
    changePreference: function(data, oldData) {
      this.preferenceList = [];
      this.oldId = oldData;
      this.preferenceList = data;
    },
    saveInfo() {
      if (this.oldId != []) {
        for (var i = 0; i < this.oldId.length; i++) {
          this.deletePreference(this.oldId[i], null);
        }
      }
      this.newId = [];
      for (var i = 0; i < this.preferenceList.length; i++) {
        this.newId.push(this.preferenceList[i].id);
      }
      var instance = this.$axios.create({
        timeout: 5000
      });
      var data = {
        nickname: this.nickName,
        address: this.address,
        birthday: this.birth,
        signature: this.signature
      };
      this.$axios
        .all([
          instance.post("/user/info", this.$Qs.stringify(data)),
          instance.post("/user/preference", {
            preferenceId: this.newId
          })
        ])
        .then(
          this.$axios.spread((infoRes, preferRes) => {
            console.log(infoRes);
            if (infoRes.data.result == "success") {
              this.getUserInfo();
            }
          })
        ),
        err => {
          console.log(err);
        };
      var instance1 = this.$axios.create({
        timeout: 5000
      });
      instance1.post("/user/info", this.newImg).then(res => {
        console.log(res);
      }), err => {
        console.log(err);
      };
    }
  },
  components: {
    VDistpicker,
    preference: Preference
  },
  mounted: function() {
    this.getUserInfo();
    this.getReady();
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  background-color: #e5e9f0;
  background-size: 100%;
  font-size: 0;
}

.main:before {
  width: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: rgb(240, 238, 238);
  filter: blur(1px);
}

.info-box .icon {
  width: 2em;
  height: 1.2em;
}

.info-box {
  width: 60%;
  height: 100%;
  margin: 0 auto;
  font-size: 13px;
  background-color: #fff;
}

.top-title {
  width: 100%;
  padding-top: 2%;
  font-size: 30px;
  color: #e74b37;
  text-align: center;
}

.basic-info {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 5% auto;
  padding-bottom: 3%;
}

.change-box {
  width: auto;
  position: relative;
}

.avatar-chunk {
  width: 120px;
  height: 120px;
  padding-top: 50%;
  border: 0;
  border-radius: 50%;
}

.avatar-show {
  position: relative;
  width: 120px;
  height: 120px;
  border: 0;
  border-radius: 50%;
}

.imgContent {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 50%;
}

.avatar-chunk .input-img {
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 200px;
  width: 100px;
  padding: 0 0 12px 0;
}

.change-avater {
  position: absolute;
  top: 200px;
  width: 80px;
  margin-left: 10px;
  padding: 10px;
  border: 0;
  outline: 0;
  cursor: pointer;
  text-align: center;
  color: rgb(238, 194, 194);
  background-color: #e74b37;
  border-radius: 10px;
  -webkit-transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;
  -o-transition: background-color 0.5s;
  transition: background-color 0.5s;
}

.change-avater:hover {
  color: white;
  background-color: #f02005;
}

.prime-info {
  width: 400px;
  margin-left: 10%;
  font-size: 1.3em;
}

.prime-info .icon {
  display: block;
  width: 1.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

option {
  cursor: pointer;
}

.info-point {
  display: flex;
  margin: 20px auto;
}

.change-box input {
  width: 240px;
  height: 20px;
  margin-left: 10px;
  padding: 3px;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #e5e9f0;
  font-size: 1em;
}

.gender-select select {
  width: 244px;
  margin-left: 70px;
  padding: 2px;
  padding-bottom: 8px;
  outline: 0;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.user-birth select {
  margin-left: 10px;
  outline: 0;
  border: 2px solid #e5e9f0;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

input:focus {
  border-style: solid;
  border-color: #e74b37;
  box-shadow: 0 0 3px #e74b37;
}

.user-birth input:focus {
  border-style: solid;
  border-color: #e74b37;
}

.select-birth select {
  width: 20%;
  padding: 8px;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  margin-left: 10px;
}

.user-address {
  display: flex;
  margin: 5% auto;
}

.user-mailbox input {
  border: 0;
}

#picker select {
  width: 80%;
  margin: 10px;
  padding-bottom: 5px;
  outline: 0;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.avatar-chunk input {
  width: 80px;
  padding: 20px;
  cursor: pointer;
}

.other-info {
  width: 60%;
  margin: 30px auto;
  text-align: center;
}

.preference {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 2% auto;
}

.preference-point {
  width: 90%;
  height: 30px;
  margin: 2% auto;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  color: #fff;
  line-height: 30px;
  background-color: #e74b37;
}

.preference-point:hover {
  background-color: #c2402f;
}

.add-preference .icon {
  width: 2em;
  height: 2em;
  cursor: pointer;
}

.seldom {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}

.change-mailbox {
  margin-left: 50%;
}

.signature {
  width: 80%;
  padding: 10px;
  margin: 10px auto;
  border-radius: 3px;
  outline: 0;
  resize: none;
}

.signature:focus {
  border-color: #e74b37;
}

.distpicker-address-wrapper {
  width: 130%;
  margin-left: 20px;
}

.save-my-info {
  width: 40%;
  text-align: center;
  padding: 5%;
  margin-left: auto;
  margin-right: auto;
}

.save-my-info button {
  width: 100%;
}
</style>
