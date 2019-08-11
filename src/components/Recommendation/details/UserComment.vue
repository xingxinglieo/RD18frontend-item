<template>
  <!-- 用户发表评论 -->
  <div class="comment-area">
    <span class="title">评论区</span>
    <div class="my-comment">
      <div class="comment-chunk">
        <textarea class="content" placeholder="写下你的评论吧" v-model="comment.content" @focus="direct()"></textarea>
        <div class="face-expression" @mouseenter="show = !show" @mouseleave="show = !show">
          <svg class="icon" aria-hidden="true" v-show="show">
            <use xlink:href="#iconbiaoqing" />
          </svg>
          <svg class="icon" aria-hidden="true" v-show="!show">
            <use xlink:href="#iconbiaoqing-copy" />
          </svg>
        </div>
      </div>
      <div class="button-chunk">
        <button @click="sendUserComment()">发 表<br>评 论
        </button>
      </div>
    </div>
    <comment :msg="comment" ref="area"></comment>
  </div>
</template>

<script>
import Comment from './CommentArea'

export default {
  data() {
    return {
      show: true,
      comment: {
        id: '',
        headPortrait: '',
        nickName: '',
        content: ''
      }
    };
  },
  components: {
     comment: Comment
  },
  methods: {
    sendUserComment() {
      if(this.comment.content == '' || this.comment.content == null) {
        return;
      } else {  // 发起请求获取当前用户的头像、昵称、评论内容、评论时间等
        this.$refs.area.addUserComment();
        this.comment.content = '';
      };
    },
    direct() {
      this.$refs.area.changeFoucesDriection();
    }
  },
  created() {

  }
};
</script>

<style scoped>
.comment-area {
  position: relative;
  width: 60%;
  border: 1px solid #e5e9f0;
  margin: 4% auto;
}
.comment-area .title {
  position: absolute;
  top: -1em;
  left: 10%;
  line-height: 2em;
  padding: 0 1em;
  background-color: #fff;
}

.my-comment {
  display: flex;
  width: 90%;
  height: 80px;
  margin: 2% auto;
}

.comment-chunk {
  display: flex;
  width: 85%;
}

.comment-chunk .content {
  width: 90%;
  height: 75%;
  padding: 2% 2% 1% 2%;
  resize: none;
  outline: 0;
  border-radius: 10px;
  border-color: #e74b37;
}

.face-expression {
  height: 1.4em;
}

.face-expression .icon {
  width: 2em;
  height: 1.4em;
  cursor: pointer;
}

.button-chunk {
  width: 10%;
}

.button-chunk button {
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  background-color: #e74b37;
  -webkit-transition: background-color 0.3s;
  -moz-transition: background-color 0.3s;
  -o-transition: background-color 0.3s;
  transition: background-color 0.3s;
}

.button-chunk button:hover {
  background-color: #cf4331;
}
</style>
