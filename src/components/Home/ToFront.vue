<template>
<!-- 置顶组件 -->
  <div
    class="to-front"
    v-on:mouseover="clickon = !clickon"
    v-on:mouseout="clickon = !clickon"
    v-show="finish == true" 
    v-on:click="backToTop()"
    title="置顶"
  >
    <svg class="icon" aria-hidden="true" v-show="clickon == false">
      <use xlink:href="#iconxiangshang" />
    </svg>
    <svg class="icon" aria-hidden="true" v-show="clickon == true">
      <use xlink:href="#iconxiangshang-copy" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "to-front",
  data() {
    return {
      clickon: false,
      finish: false
    };
  },
  methods: {
    backToTop() {
      // var timer = null;  //原生JS
      // cancelAnimationFrame(timer);
      // //获取当前毫秒数
      // var startTime = +new Date();
      // //获取当前页面的滚动高度
      // var b = document.body.scrollTop || document.documentElement.scrollTop;
      // var d = 500;
      // var c = b;
      // timer = requestAnimationFrame(function func() {
      //   var t = d - Math.max(0, startTime - +new Date() + d);
      //   document.documentElement.scrollTop = document.body.scrollTop =
      //     (t * -c) / d + b;
      //   timer = requestAnimationFrame(func);
      //   if (t == d) {
      //     cancelAnimationFrame(timer);
      //   }
      // });
      $('html,body').animate({ scrollTop: 0 }, 500);
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollHeight > window.screen.height + 500) {
        var that = this;
        that.finish = true;
      }
      if (document.documentElement.scrollTop < window.screen.height + 500) {
        var that = this;
        that.finish = false;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes show-icon {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.to-front {
  position: fixed;
  width: 40px;
  height: 40px;
  margin-left: 93%;
  margin-top: 17%;
  border: 1px solid #333333;
  border-radius: 50%;
  cursor: pointer;

  -webkit-animation: show-icon 0.4s;
     -moz-animation: show-icon 0.4s;
       -o-animation: show-icon 0.4s;
          animation: show-icon 0.4s;

  -webkit-animation-fill-mode: forwards;
     -moz-animation-fill-mode: forwards;
       -o-animation-fill-mode: forwards;
          animation-fill-mode: forwards;

  -webkit-animation-iteration-count: 1;
     -moz-animation-iteration-count: 1;
       -o-animation-iteration-count: 1;
          animation-iteration-count: 1;
}

.to-front:hover {
  border-color: #e74b37;
}

.to-front .icon {
  width: 2em;
  height: 2em;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
