<template>
  <!-- 瀑布流 -->
  <div class="waterfall">
    <div class="col" ref="col1" v-for="(item, index) in dataList1" :key="index">
      <div
        @mouseover="hoverOn = !hoverOn"
        @mouseout="hoverOn = !hoverOn"
        v-bind:class="{item: !hoverOn, 'item-move': hoverOn}"
      >
        <div class="picture-chunk" @mouseover="start()" @mouseout="stop()">
          <!-- <transition-group name="image"> -->
            <img
              :src="photo.src"
              v-for="(photo,index) in item.photos"
              :key="index"
              v-show="index == showIndex"
            />
          <!-- </transition-group> -->
        </div>
        <div class="info">
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img item.headPortrait />
            </div>
            <span class="nick-name">{{item.nickName}}</span>
            <div class="prise">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icondianzan" />
              </svg>
              <span class="prise-number">{{item.starNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" ref="col2">
      <div class="item" v-for="(item, index) in dataList2" :key="index">
        <div
          @mouseover="hoverOn = !hoverOn"
          @mouseout="hoverOn = !hoverOn"
          v-bind:class="{item: !hoverOn, 'item-move': hoverOn}"
        >
          <div class="picture-chunk" @mouseover="start()" @mouseout="stop()">
            <!-- <transition-group name="image"> -->
              <img
                :src="photo.src"
                v-for="(photo,index) in item.photos"
                :key="index"
                v-show="index == showIndex"
              />
            <!-- </transition-group> -->
          </div>
          <div class="info">
            <div class="info-chunk">
              <div class="avatar-chunk">
                <img item.headPortrait />
              </div>
              <span class="nick-name">{{item.nickName}}</span>
              <div class="prise">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icondianzan" />
                </svg>
                <span class="prise-number">{{item.starNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" ref="col3">
      <div class="item" v-for="(item, index) in dataList3" :key="index">
        <div
          @mouseover="hoverOn = !hoverOn"
          @mouseout="hoverOn = !hoverOn"
          v-bind:class="{item: !hoverOn, 'item-move': hoverOn}"
        >
          <div class="picture-chunk" @mouseover="start()" @mouseout="stop()">
            <!-- <transition-group name="image"> -->
              <img
                :src="photo.src"
                v-for="(photo,index) in item.photos"
                :key="index"
                v-show="index == showIndex"
              />
            <!-- </transition-group> -->
          </div>
          <div class="info">
            <div class="info-chunk">
              <div class="avatar-chunk">
                <img item.headPortrait />
              </div>
              <span class="nick-name">{{item.nickName}}</span>
              <div class="prise">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icondianzan" />
                </svg>
                <span class="prise-number">{{item.starNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" ref="col4">
      <div class="item" v-for="(item, index) in dataList4" :key="index">
        <div
          @mouseover="hoverOn = !hoverOn"
          @mouseout="hoverOn = !hoverOn"
          v-bind:class="{item: !hoverOn, 'item-move': hoverOn}"
        >
          <div class="picture-chunk" @mouseover="start()" @mouseout="stop()">
            <!-- <transition-group name="image"> -->
              <img
                :src="photo.src"
                v-for="(photo,index) in item.photos"
                :key="index"
                v-show="index == showIndex"
              />
            <!-- </transition-group> -->
          </div>
          <div class="info">
            <div class="info-chunk">
              <div class="avatar-chunk">
                <img item.headPortrait />
              </div>
              <span class="nick-name">{{item.nickName}}</span>
              <div class="prise">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icondianzan" />
                </svg>
                <span class="prise-number">{{item.starNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" ref="col5">
      <div class="item" v-for="(item, index) in dataList5" :key="index">
        <div
          @mouseover="hoverOn = !hoverOn"
          @mouseout="hoverOn = !hoverOn"
          v-bind:class="{item: !hoverOn, 'item-move': hoverOn}"
        >
          <div class="picture-chunk" @mouseover="start()" @mouseout="stop()">
            <!-- <transition-group name="image"> -->
              <img
                :src="photo.src"
                v-for="(photo,index) in item.photos"
                :key="index"
                v-show="index == showIndex"
              />
            <!-- </transition-group> -->
          </div>
          <div class="info">
            <div class="info-chunk">
              <div class="avatar-chunk">
                <img item.headPortrait />
              </div>
              <span class="nick-name">{{item.nickName}}</span>
              <div class="prise">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icondianzan" />
                </svg>
                <span class="prise-number">{{item.starNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "waterfall",
  data() {
    return {
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      dataList5: [],
      listCollection: [],
      windowHeight: window.screen.height + 500,
      imgs: [],
      showIndex: 0,
      hoverOn: false
    };
  },
  methods: {
    selectCol() {
      var getColHeight = ref => {
        return this.$refs[ref].offsetHeight;
      };
      var height1 = getColHeight("col1");
      var height2 = getColHeight("col2");
      var height3 = getColHeight("col3");
      var height4 = getColHeight("col4");
      var height5 = getColHeight("col5");
      switch (Math.min(height1, height2, height3, height4, height5)) {
        case height1:
          return "dataList1";
          break;
        case height2:
          return "dataList2";
          break;
        case height3:
          return "dataList3";
          break;
        case height4:
          return "dataList4";
          break;
        case height5:
          return "dataList5";
          break;
      }
    },
    addDataAccount(arg) {
      var menu = this.listCollection;
      var index = arg || 0;
      // var refName = this.selectCol();
      if (menu.length > index) {
        this[refName].push[this.listCollection[index]];
        this.$nextTick(() => {
          this.addDataAccount(index + 1); // 回调
        });
      }
    },
    loadData() {
      if (document.documentElement.scrollTop > this.windowHeight - 200) {
        this.windowHeight += 1000;
        this.sponserRequest();
      }
    },
    sponserRequest() {
      this.$axios({
        url: "",
        method: "get"
      }).then(res => {
        this.listCollection = res.data;
        this.addDataAccount();
      });
    },
    start() {
      this.timer = setInterval(this.changeIndex, 2000);
    },
    stop() {
      clearInterval(this.timer);
    },
    changeIndex() {
      if (this.showIndex >= this.imgs.length - 1) {
        this.showIndex = 0;
      } else {
        this.showIndex++;
      }
    }
  },
  mounted() {
    this.addDataAccount();
    window.addEventListener("scroll", this.loadData());
  },
  destroyed() {
    window.removeEventListener("scroll", this.loadData());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.waterfall {
  display: none;
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 800px;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}

.waterfall .col {
  flex: 1;
  margin: 15px;
}

@keyframes item-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-3px);
  }
}

.item {
  margin-top: 10%;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 5px 5px #f0eded;
}

.item-move {
  margin-top: 10%;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 5px 5px #f0eded;
  -webkit-animation: item-up 1s ease;
  -moz-animation: item-up 1s ease;
  -o-animation: item-up 1s ease;
  animation: item-up 1s ease;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.item img,
.item-move img {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.picture-chunk {
  font-size: 0;
  position: relative;
}

.picture-chunk img {
  position: relative;
  width: 100%;
}

.info {
  padding-top: 5%;
  border: 2px solid #b1afaf;
  border-radius: 0 0 10px 10px;
  border-top: 0;
}

.info-chunk {
  display: flex;
  justify-content: center;
  padding: 1% 0 1% 0;
}

.avatar-chunk {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
@keyframes imgAction {
  from {
    transform: translateZ(-100%);
    opacity: 0;
  }
  to {
    transform: translateZ(0);
    opacity: 1;
  }
}

.avatar-chunk img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.image-enter-active {
  animation: imgAction 3s ease;
}

.info-chunk .icon {
  width: 2em;
  height: 24px;
  margin-top: 2px;
}

.nick-name {
  margin-right: 10%;
  max-width: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-chunk span {
  line-height: 30px;
}

.prise {
  display: flex;
}

.prise-number {
  max-width: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


