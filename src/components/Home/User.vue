<template>
  <!-- 用户相关信息组件 -->
  <div class="user" v-on:mouseenter="show = !show"
        v-on:mouseleave="show = !show">
    <div class="avatar"  v-show="!show">
      <div class="state1"
      >
        <!-- 未登录时展示的icon，登陆后展示用户的头像 -->
        <svg class="icon1" aria-hidden="true">
          <use xlink:href="#iconyonghu" />
        </svg>
      </div>
    </div>
    <div class="avatar" v-show="show">
      <div class="state1"
      >
        <!-- 未登录时展示的icon，登陆后展示用户的头像 -->
        <svg class="icon1" aria-hidden="true">
          <use xlink:href="#iconyonghu" />
        </svg>
      </div>
    </div>
    <!-- 用户信息 -->
    <transition name="info">
    <div
     class="show-info"
     v-show="show"
    >
      <!-- 判断用户是否登录，不同状态展示不同界面-->

      <!-- 未登录，展示去注册/登录按钮 -->
      <div class="to-login" v-show="!loginState">
        <button v-on:click="toLogin()">登录 / 注册 倾旅</button>
      </div>
      <!-- 已登录，展示用户信息 -->
      <div class="info-chunk"  v-show="!loginState">
        <div class="my-nickname">{{nickName}}</div>
        <div class="detail-info">
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingbie" />
            </svg>
            <p>
              性别:
              <span>{{gender}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxingquaihao" />
            </svg>
            <p>
              爱好:
              <span>{{preference}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchushengriqi" />
            </svg>
            <p>
              生日:
              <span>{{birth}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconicon-test" />
            </svg>
            <p>
              邮箱:
              <span>{{mailbox}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondidian" />
            </svg>
            <p>
              地区:
              <span>{{address}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icondianzan-copy" />
            </svg>
            <p>
              获赞:
              <span>{{like}}</span>
            </p>
          </div>
          <div class="each-info">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconshoucang" />
            </svg>
            <p>
              收藏:
              <span>{{star}}</span>
            </p>
          </div>
        </div>
          <button @click="getInfo()">我的个人主页</button>
          <button @click="toChangeInfo()">修改我的信息</button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "User",
  data() {
    return {
      loginState: false,
      change1: true,
      change2: false,
      change3: false,
      show: false,
      nickName: '',
      gender: '',
      preference: '',
      birth: '',
      mailbox: '',
      address: '',
      like: '',
      star: ''
    };
  },
  methods: {
    // 展示登录注册界面
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    getInfo() {
        this.$router.push({
        path: '/page'
      })
    },
    toChangeInfo() {
      this.$router.push({
        path: '/alterMyInfo'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style v-slot>
.user {
  position: absolute;
  top: 10px;
  left: 75%;
  width: 250px;
}

.avatar {
  position: absolute;
  top: 10px;
  z-index: 716;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes extend-avatar {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(2, 2) translateY(10px);
  }
}

.state1 {
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
  transition: transform .5s;
}

.state1:hover {
  transform: scale(2, 2) translateY(10px);
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
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.info-enter-active {
  animation: up-show .5s;
}

.info-leave-active {
  animation: up-show .5s reverse;
}

.show-info {
  position: absolute;
  top: 55px;
  display: block;
  width: 250px;
  height: auto;
  border-radius: 10px;
  background-color: #fff;
  z-index: 715;
}

.to-login {
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
  margin-top: 5px;
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
