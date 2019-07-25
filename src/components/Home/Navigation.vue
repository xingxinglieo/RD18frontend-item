<template>
<!-- 主界面导航组件 -->
  <div class="navigation">
    <div class="steer-point">
      <div
        class="point-icon"
        v-on:mouseover="foucusHere0 = !foucusHere0"
        v-on:mouseout="foucusHere0 = !foucusHere0"
        v-on:click="chanelMove(0)"
      >
        <svg class="icon" aria-hidden="true" v-show="foucusHere0 === false">
          <use xlink:href="#iconzonghe" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere0 === true">
          <use xlink:href="#iconzonghe-copy" />
        </svg>
        <p class="point-name">综合</p>
      </div>
      <div id="bottom-chanel"></div>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere1 = !foucusHere1"
      v-on:mouseout="foucusHere1 = !foucusHere1"
      v-on:click="chanelMove(1)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere1 === false">
          <use xlink:href="#iconguanfang" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere1 === true">
          <use xlink:href="#iconguanfang-copy" />
        </svg>
      </div>
      <p class="point-name">推荐</p>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere2 = !foucusHere3"
      v-on:mouseout="foucusHere2 = !foucusHere2"
      v-on:click="chanelMove(2)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere2 === false">
          <use xlink:href="#iconmeishi2" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere2 === true">
          <use xlink:href="#iconmeishi2-copy" />
        </svg>
      </div>
      <p class="point-name">美食</p>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere3 = !foucusHere3"
      v-on:mouseout="foucusHere3 = !foucusHere3"
      v-on:click="chanelMove(3)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere3 === false">
          <use xlink:href="#iconfengjing1" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere3 === true">
          <use xlink:href="#iconfengjing1-copy" />
        </svg>
      </div>
      <p class="point-name">自然</p>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere4 = !foucusHere4"
      v-on:mouseout="foucusHere4 = !foucusHere4"
      v-on:click="chanelMove(4)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere4 === false">
          <use xlink:href="#iconjianzhu" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere4 === true">
          <use xlink:href="#iconjianzhu-copy" />
        </svg>
      </div>
      <p class="point-name">建筑</p>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere5 = !foucusHere5"
      v-on:mouseout="foucusHere5 = !foucusHere5"
      v-on:click="chanelMove(5)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere5 === false">
          <use xlink:href="#iconyouji2" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere5 === true">
          <use xlink:href="#iconyouji2-copy" />
        </svg>
      </div>
      <p class="point-name">游记</p>
    </div>
    <div
      class="steer-point"
      v-on:mouseover="foucusHere6 = !foucusHere6"
      v-on:mouseout="foucusHere6 = !foucusHere6"
      v-on:click="chanelMove(6)"
    >
      <div class="point-icon">
        <svg class="icon" aria-hidden="true" v-show="foucusHere6 === false">
          <use xlink:href="#icondongtai1" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="foucusHere6 === true">
          <use xlink:href="#icondongtai1-copy" />
        </svg>
      </div>
      <p class="point-name">动态</p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "navigation",
  data() {
    return {
      foucusHere0: false,
      foucusHere1: false,
      foucusHere2: false,
      foucusHere3: false,
      foucusHere4: false,
      foucusHere5: false,
      foucusHere6: false,
      lastLocaltion: 0
    };
  },
  methods: {
    chanelMove(i) {
      setTimeout(function() {
        this.lastLocaltion = i;
      }, 0);
      setTimeout(function() {
        for(let j = 0; j <= 6; j++) {
        if(j == i) {
          $(".point-name:eq(" + j + ")").css("color","#e74b37")
        } else {
          $(".point-name:eq(" + j + ")").css("color","black")
        }
      }
      },400);
      $("#bottom-chanel").animate({
        left:
          $(".steer-point:eq(" + i + ")").offset().left -
          $(".steer-point:eq(" + this.lastLocaltion + ")").offset().left
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation {
  display: flex;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  border-bottom: 1.5px solid #b1afaf;
}
.navigate-under {
  z-index: -1;
}
.steer-point {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 50px;
  cursor: pointer;
  text-align: center;
}
.steer-point .icon {
  width: 2.5em;
  height: 2.5em;
}
.steer-point p {
  margin: 2px 0;
}
#bottom-chanel {
  position: absolute;
  width: 50px;
  border-top: 3px solid #e74b37;
  border-radius: 10px;
}
@keyframes chanel-move {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX();
  }
}
</style>