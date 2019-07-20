<template>
  <div class="user">
    <div class="avatar-chunk">
    <div
      id="user-avatar" class="user-avatar"
      v-on:click="login"
      v-on:mouseover="change = !change, extend()"
      v-on:mouseout="change = !change, shrink()"
    >
      <!-- 未登录时展示的icon，登陆后展示用户的头像 -->
      <svg class="icon1" aria-hidden="true">
        <use xlink:href="#iconyonghu" />
      </svg>
    </div>
    </div>
    <!-- 用户信息 -->
    <div
      v-bind:class="{ 'show-info': change, hide: !change}"
      v-on:mouseover="change = !change, extend()"
      v-on:mouseout="change = !change, shrink()"
    >
      <!-- 判断用户是否登录，不同状态展示不同界面-->

      <!-- 未登录，展示去注册/登录按钮 -->
      <div class="to-login">
        <button>登录 / 注册 倾旅</button>
      </div>
      <!-- 已登录，展示用户信息 -->
      <div class="info-chunk">
        <div class="my-nickname">MAKERYI</div>
        <div class="detail-info">
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconid" />
            </svg>
            <p>
              ID:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingbie" />
            </svg>
            <p>
              性别:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingquaihao" />
            </svg>
            <p>
              爱好:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchushengriqi" />
            </svg>
            <p>
              生日:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconicon-test" />
            </svg>
            <p>
              邮箱:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondidian" />
            </svg>
            <p>
              地区:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondianzan-copy" />
            </svg>
            <p>
              获赞:
              <span></span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconshoucang" />
            </svg>
            <p>
              收藏:
              <span></span>
            </p>
          </div>
        </div>
        <button>修改我的信息</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "User",
  data() {
    return {
      change: false
    };
  },

  methods: {
    // 展示登录注册界面
    login() {

    },
    extend() {
       $("#user-avatar").toggleClass("hover-avatar user-avatar1");
      // $("#user-avatar").removeClass("user-avatar1");
      
    },
    shrink() {
      // $("#user-avatar").addClass("user-avatar1");
      // $("#user-avatar").removeClass("hover-avatar");
       $("#user-avatar").toggleClass("hover-avatar user-avatar1");

    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  position: absolute;
  top: 10px;
  left: 75%;
  width: 250px;
}
.avatar-chunk {
  width: 60px;
  margin-right: auto;
  margin-left: auto;
}
@keyframes extend-avatar {
  0% {
    transform: scale(1,1) translateY(0);
  }
  100% {
    transform: scale(2,2) translateY(10px);
  }
}
#user-avatar {
  position: relative;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: auto;
  margin-left: auto;
  border: 1.5px solid rgb(236, 92, 92);
  border-radius: 50%;
  cursor: pointer;
}
@keyframes shrink-avatar {
  0% {
    transform: scale(2,2) translateY(0);
  }
  100% {
    transform: scale(1,1) translateY(10px);
  }
}
.user-avatar1 {
  -webkit-animation: shrink-avatar 0.4s;
     -moz-animation: shrink-avatar 0.4s;
       -o-animation: shrink-avatar 0.4s;
          animation: shrink-avatar 0.4s;

  -webkit-animation-fill-mode: forwards;
     -moz-animation-fill-mode: forwards;
       -o-animation-fill-mode: forwards;
          animation-fill-mode: forwards;

  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
       -o-animation-iteration-count: 1;
          animation-iteration-count: 1;
}
.hover-avatar {
  -webkit-animation: extend-avatar 0.4s;
     -moz-animation: extend-avatar 0.4s;
       -o-animation: extend-avatar 0.4s;
          animation: extend-avatar 0.4s;

  -webkit-animation-fill-mode: forwards;
     -moz-animation-fill-mode: forwards;
       -o-animation-fill-mode: forwards;
          animation-fill-mode: forwards;

  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
       -o-animation-iteration-count: 1;
          animation-iteration-count: 1;
}
.icon1 {
  width: 2em;
  height: 2em;
  margin-top: 2px;
  vertical-align: -0.15em;
  overflow: hidden;
}
@keyframes up-show {
  from {
    transform: translateY(47px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.show-info {
  display: block;
  
  width: 250px;
  height: auto;
  border-radius: 10px;
  background-color: #fff;

  -webkit-animation: up-show 0.4s;
     -moz-animation: up-show 0.4s;
       -o-animation: up-show 0.4s;
          animation: up-show 0.4s;

  -webkit-animation-fill-mode: backwards;
     -moz-animation-fill-mode: backwards;
       -o-animation-fill-mode: backwards;
          animation-fill-mode: backwards;

  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
       -o-animation-iteration-count: 1;
          animation-iteration-count: 1;
}
.hide {
  display: none;
}
.to-login {
  display: none;
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  padding: 60px 0 20px 0;
}
.info-chunk {
  width: 200px;
  margin-right: auto;
  margin-left: auto;
  padding: 60px 0 20px 0;
}
.my-nickname {
  text-align: center;
}
.to-login button,
.info-chunk button {
  width: 100%;
  padding: 10px;
  color: white;
  background-color: #e74b37;
  border: 0;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  -webkit-transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;
  -o-transition: background-color 0.5s;
  transition: background-color 0.5s;
}
.to-login button:hover,
.info-chunk button:hover {
  background-color: #c00f29;
}
.each-info {
  display: flex;
}
.each-info .icon {
  margin: 7px 2px;
}
.each-info p {
  margin: 5px 2px;
}
</style>
