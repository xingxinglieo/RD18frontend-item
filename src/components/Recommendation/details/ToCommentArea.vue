<template>
 <div class="to-comment-area" @mouseenter="clickon = true" @mouseleave="clickon = false" v-show="finish == true" @click="toCommentArea()" title="评论区">
    <svg class="icon" aria-hidden="true" v-show="clickon == false">
      <use xlink:href="#iconxiangxia" />
    </svg>
    <svg class="icon" aria-hidden="true" v-show="clickon == true">
      <use xlink:href="#iconxiangxia-copy" />
    </svg>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       clickon: false,
       finish: false
     }
   },
   components: {
     
   },
   methods: {
     toCommentArea() {
       $('html,body').animate({ scrollTop: this.$store.state.show_chunk_height }, 400);
     }
   },
   mounted: function() {
      window.addEventListener("scroll", () => {
      if (document.documentElement.scrollHeight > window.screen.height + 500) {
        this.finish = true;
      }
      if (document.documentElement.scrollTop <= window.screen.height + 500) {
        this.finish = false;
      }
    });
   }

 }
</script>

<style scoped>
@keyframes show-icon {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.to-comment-area {
  position: fixed;
  width: 40px;
  height: 40px;
  margin-left: 93%;
  margin-top: 23%;
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

.to-comment-area:hover {
  border-color: #e74b37;
}

.to-comment-area .icon {
  width: 2em;
  height: 2em;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
 
</style>
