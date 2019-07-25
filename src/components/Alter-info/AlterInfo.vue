<template>
  <!-- 修改用户信息组件 -->
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
              <img id="imgContent" src="../../assets/un-login.png">
            </div>
            <form enctype="multipart/form-data" id="changeImg">
            <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" class="input-img" v-on:change="selectNewImg()">
            <label for="file" class="change-avater">更换头像</label>
            </form>
          </div>
        </div>
        <div class="prime-info">
          <div class="user-nickname info-point">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconnicheng-copy" />
            </svg>
            昵称
            <input type="text" placeholder="不能超过10个字" maxlength="10" />
          </div>
          <div class="user-gender info-point">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingbie" />
            </svg>
            性别
            <select>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div class="user-birth info-point">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchushengriqi" />
            </svg>
            生日
            <select id="year" v-on:change="getDays()"></select>年
            <select id="month" v-on:change="getDays()"></select>月
            <select id="day"></select>日
          </div>
          <div class="user-mailbox info-point">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconicon-test" />
            </svg>
            邮箱
            <input type="text" maxlength="20" readonly="readonly"/>
          </div>
          <el-button size="mini" type="primary" round class="change-mailbox" @click="alterMailbox()">更换邮箱/修改密码</el-button>
          <div class="user-address">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondidian" />
            </svg>
            地区
          </div>
          <div data-toggle="distpicker" class="picker">
              <select id="eprovinceName" data-province="北京市" name="provinceName"></select><br>
              <select id="ecityName" data-city="北京市市辖区" name="cityName"></select><br>
              <select id="edistrictName" data-district="东城区" name="districtName"></select>
           </div> 
        </div>
      </div>
      <div class="other-info">
        <div class="hobby">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingquaihao" />
            </svg>
             偏好
            <input type="text" maxlength="30"/>
        </div>
        <div class="seldom">
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icongexingqianming" />
            </svg>
             个性签名
            <input type="text" maxlength="30"/>
        </div>
      </div>
      <div class="save-my-info">
      <el-button type="primary">保&nbsp;存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
$(document).ready(function() {
  var date = new Date();
  var year = date.getFullYear();
  for(var i = year - 100; i <= year; i++) {
    $("#year").append("<option value=\""+ i +"\">"+ i +"</option>")
  };
  for(var j = 1; j <= 12; j++) {
    $("#month").append("<option value=\""+ j +"\">"+ j +"</option>")
  }
  getDays($("#year").val(),$('#month').val());
})
function getDaysInMonth(month,year) {
  var days;
  if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    days = 31;
  } else if(month == 4 || month == 6 || month == 9 || month == 11) {
    days = 30;
  } else if(year % 4 == 0 && year % 100 != 0) {
    days = 29;
  } else {
    days = 28;
  };
  return days;
};
function getDays() {
  var year = $("#year").val();
  var month = $('#month').val();
  var days = getDaysInMonth(month,year);
  $('#day').empty();
  for(var i = 1; i <= days; i++){
    $("#day").append("<option value=\""+ i +"\">"+ i +"</option>");
  }
}

 export default {
   data () {
     return {
       msg: '123'
     }
   },
   methods: {
   getDays() {
     var year = $("#year").val();
     var month = $('#month').val();
     var days = getDaysInMonth(month,year);
     $('#day').empty();
     for(var i = 1; i <= days; i++){
       $("#day").append("<option value=\""+ i +"\">"+ i +"</option>");
     }
    },
    selectNewImg() {
      var file = $("#changeImg").find("input")[0].files[0];
      if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)){
         alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
         return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = function(e) {
       $("#imgContent").attr("src",e.target.result);
       console.log(e.target.result);
      }
    },
    alterMailbox() {
      this.$router.push({
        path: "/alterMailboxOrPassword"
      })
    }
   },
   components: {
     
   },
   mounted() {
     
   }
 }
</script>

<style scoped lang="scss">

.info-box .icon {
  width: 2em;
  height: 1.2em;
}
.info-box {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border: 3px solid #e74b37;
  border-radius: 20px;
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
  border: 2px solid pink;
  border-radius: 5px;
}
.change-box {
  width: auto;
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
#imgContent {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 50%;
}
.input-img {
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 350px;
}
.change-avater {
  position: absolute;
  top: 350px;
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
  border: 2px solid #e74b37;
  border-radius: 5px;
  outline: 0;
  font-size: 1em;
}
.user-gender select {
  width: 250px;
  margin-left: 10px;
  padding: 2px;
  padding-bottom: 8px;
  outline: 0;
  border: 2px solid #e74b37;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}
.user-birth select {
  margin-left: 10px;
  outline: 0;
  border: 2px solid #e74b37;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}
.user-address {
  display: flex;
}
.picker select{
  width: 80%;
  margin: 10px;
  padding-bottom: 5px;
  outline: 0;
  border: 2px solid #e74b37;
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
  display: flex; 
  justify-content: center;
  margin-bottom: 30px;
}
.hobby .icon {
  width: 2em;
}
.change-mailbox {
  margin-left: 50%;
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
