<template>
  <div class="navigation">
    <div class="search-bar">
      <svg
        version="1.1"
        id="slogan"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 400 50"
        style="enable-background:new 0 0 400 50;"
        xml:space="preserve"
      >
        <text transform="matrix(1 0 0 1 32.4013 38.2815)" class="st0 st1 st2">TravelTalking</text>
      </svg>
      <div class="search-chunk" @mouseenter="show = true" @mouseleave="show = false">
        <div class="search-chunk-on">
          <transition name="search">
            <input type="text" class="input-hide" v-show="show" v-model="keyword"/>
          </transition>
          <button class="search-btn" @click="searchUser()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconseach" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="side-bar">
      <!-- 侧边导航栏 -->
      <div class="side-chunk">
        <div
          v-bind:class="{option: this.$store.state.management.showIndex != 1, 'option-on': this.$store.state.management.showIndex == 1}"
          @click="changeIndex(1)"
        >
          <p>推荐关注</p>
        </div>
        <div
          v-bind:class="{option: this.$store.state.management.showIndex != 2, 'option-on': this.$store.state.management.showIndex == 2}"
          @click="changeIndex(2)"
        >
          <p>我的好友</p>
        </div>
        <div
          v-bind:class="{option: this.$store.state.management.showIndex != 3, 'option-on': this.$store.state.management.showIndex == 3}"
          @click="changeIndex(3)"
        >
          <p>我的粉丝</p>
        </div>
        <div
          v-bind:class="{option: this.$store.state.management.showIndex != 4, 'option-on': this.$store.state.management.showIndex == 4}"
          @click="changeIndex(4)"
        >
          <p>我的关注</p>
        </div>
        <div
          v-bind:class="{option: this.$store.state.management.showIndex != 5, 'option-on': this.$store.state.management.showIndex == 5}"
          @click="changeIndex(5)"
        >
          <p>黑名单</p>
        </div>
      </div>
      <!-- 展示界面 -->
      <div class="container">
        <router-view ref="state" :msg="keyword"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      keyword: ''
    };
  },
  components: {},
  methods: {
    changeIndex(index) {
      switch (index) {
        case 1:
          this.$store.state.management.showIndex = 1;
          this.$store.state.management.previewUrl = '/friend/persons';
          this.$router.push({
            path: "/interface/management/allUser",
            name: "allUser"
          });
          break;
        case 2:
          this.$store.state.management.showIndex = 2;
          this.$store.state.management.previewUrl = '/friend/myFriend';
          this.$router.push({
            path: "/interface/management/friends",
            name: "friends"
          });
          break;
        case 3:
          this.$store.state.management.showIndex = 3;
          this.$store.state.management.previewUrl = '/friend/fans';
          this.$router.push({
            path: "/interface/management/fans",
            name: "fans"
          });
          break;
        case 4:
          this.$store.state.management.showIndex = 4;
          this.$store.state.management.previewUrl = '/friend/attention';
          this.$router.push({
            path: "/interface/management/attention",
            name: "attention"
          });
          break;
        case 5:
          this.$store.state.management.showIndex = 5;
          this.$store.state.management.previewUrl = '/friend/blacklist';
          this.$router.push({
            path: "/interface/management/blacklist ",
            name: "blacklist"
          });
          break;
        default:
          break;
      };
      this.$refs.state.changeOption();
    },
    searchUser() {
      
      this.$refs.state.searchUser();
    }
  },
  mounted () {
    this.changeIndex(1);
    this.$store.state.navigation.location = 4
  }
};
</script>

<style scoped>
.navigation {
  width: 70%;
  margin: 0 auto;
  height: auto;
}

.search-bar {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
  border: 10px solid #f75a5a;
  border-bottom: 0;
}

.st0 {
  fill: #e74b37;
}

.st1 {
  font-family: "ZCOOLruirui";
}

.st2 {
  font-size: 64px;
}

#slogan {
  width: 400px;
  height: 50px;
}

.search-chunk {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  height: 40px;
}

.search-chunk-on {
  position: relative;
}

@keyframes input-hide-show {
  from {
    width: 30px;
  }
  to {
    width: 200px;
  }
}

.input-hide {
  position: absolute;
  right: 0;
  width: 200px;
  height: 30px;
  padding: 5px;
  padding-left: 20px;
  outline: 0;
  border: 0;
  border-radius: 20px;
  line-height: 20px;
  color: #fff;
  background-color: #e74b37;
}

.search-enter-active {
  animation: input-hide-show 0.3s;
}

.search-leave-active {
  animation: input-hide-show 0.3s reverse;
}

.search-btn {
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: #e74b37;
}

.side-bar {
  display: flex;
  width: 100%;
  height: auto;
  min-height: 800px;
}

.side-chunk {
  width: 10%;
  border: 10px solid #f75a5a;
  border-right: 0;
}

.container {
  width: 90%;
}

.option {
  height: 50px;
  margin: 30px 0;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  -webkit-transition: background-color 0.5s;
  -moz-transition: background-color 0.5s;
  -o-transition: background-color 0.5s;
  transition: background-color 0.5s;
}

.option:hover {
  color: #e6e1e1;
  background-color: #f3b7ad;
}

.option-on {
  height: 50px;
  margin: 30px 0;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  background-color: #e74b37;
}

.option p,
.option-on p {
  line-height: 50px;
}
</style>