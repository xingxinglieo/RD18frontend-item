<template>
  <div>
    <div class="navigation">
      <div class="search">
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
              <input type="text" class="input-hide" v-show="show" v-model="keyword" />
            </transition>
            <button class="search-btn" @click="searchTravelNotes()">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconseach" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="preference-show">
        <button
          id="move"
          class="btn"
          v-bind:class="{'preference-btn': showIndex != 0, 'preference-btn-on': showIndex == 0}"
          @click="changeIndex(0, null)"
        >
          <span>所有</span>
          <button id="moveBtn"></button>
        </button>
        <button
          class="btn"
          v-bind:class="{'preference-btn': showIndex != index + 1, 'preference-btn-on': showIndex == index + 1}"
          v-for="(item, index) in preference"
          :key="index"
          @click="changeIndex(index+1, item.id)"
        >
          <span>{{item.name}}</span>
        </button>
      </div>
    </div>
    <waterfall ref="waterfall"></waterfall>
  </div>
</template>

<script>
import waterfall from "../Home/WaterFall";

export default {
  data() {
    return {
      preference: [],
      keyword: "",
      show: false,
      showIndex: 0,
      lastLocaltion: 0
    };
  },
  components: {
    waterfall
  },
  methods: {
    getPreference() {
      this.preference = [];
      var data = {
        id: 1
      };
      this.$axios
        .get(`/user/preference/${data.id}`)
        .then(res => {
          console.log(res);
          if (res.data.result == "success") {
            for (var i = 0; i < res.data.message.length; i++) {
              this.preference.push({
                id: res.data.message[i].id,
                name: res.data.message[i].name
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeIndex(i, id) {
      setTimeout(function() {
        this.lastLocaltion = i;
      }, 0);
      $("#moveBtn").animate({
        left:
          $(".btn:eq(" + i + ")").offset().left -
          $(".btn:eq(" + this.lastLocaltion + ")").offset().left
      });
      this.showIndex = i;
      if(id == null) {
        this.$refs.waterfall.clearList();
        this.$refs.waterfall.sponserRequest();
      } else {
        this.$refs.waterfall.clearList();
        this.$refs.waterfall.sponserRequest(id);
      }
    },
    searchTravelNotes() {
      if(this.keyword != '') {
        this.$refs.waterfall.searchTravelNotes(this.keyword)
      }
    }
  },
  mounted: function() {
    this.getPreference();
  }
};
</script>

<style scoped>
.navigation {
  width: 80%;
  padding: 1% 0;
  border: 2px solid #e74b37;
  border-radius: 24px;
  margin: 2% auto;
}

.preference-show {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
}

.preference-btn {
  width: 150px;
  margin: 1% 4%;
  line-height: 40px;
  border: 0;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  color: #61140a;
  font-size: 15px;
  background-color: rgb(240, 230, 230);
  opacity: 0.6;
}

.preference-btn span {
  opacity: 1;
}

#move {
  position: relative;
}

#moveBtn {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border: 0;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  background-color: rgb(216, 55, 55);
  opacity: 1;
}

.preference-btn:hover {
  color: #fff;
  background-color: #e9897c;
}

.preference-btn-on {
  width: 150px;
  margin: 1% 4%;
  line-height: 40px;
  border: 0;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  background-color: rgb(216, 55, 55);
  opacity: 0.6;
}

.preference-btn-on span {
  color: #fff;
  opacity: 1;
}

.search {
  position: relative;
  width: 100%;
}

.search-chunk {
  position: absolute;
  top: 50%;
  left: 96%;
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
</style>
