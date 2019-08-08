<template>
  <!-- 评论区内容 -->
  <div class="comment-area">
    <!-- 每一条对美食、景点或者路线的直接评论 -->
    <div class="comment-point" v-for="(item1,index1) in commentList" :key="item1.id">
      <div class="user-info">
        <div class="avatar">
          <img :src="item1.headPortrait" />
        </div>
        <p class="user-nickname">{{item1.nickName}}</p>
        <div class="delete-comment" @click="deleteUserComment(index1)" v-if="item1.userId == userInfo.id">
          <div class="hover-point">
            <span>删除</span>
          </div>
        </div>
      </div>
      <div class="user-content">{{item1.content}}</div>
      <div class="comment-time">
        <span>{{item1.time}}</span>
        <svg class="icon" aria-hidden="true" v-show="!item1.star" @click="starIt(item1.id, $store.state.recommend.commentType, index1, 'comment')">
          <use xlink:href="#icondianzan" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="item1.star" @click="cancerStar(item1.id, $store.state.recommend.commentType, index1, 'comment')">
          <use xlink:href="#icondianzan-copy" />
        </svg>
        <span>{{item1.starNum}}</span>
      </div>
      <!-- 对评论内容的回复 -->
      <div v-for="(item2, index2) in item1.replyList" :key="index2.id">
        <div class="other-reply" v-show="item2 !== []">
        <div class="other-reply-info" >
          <div class="other-reply-avatar">
            <img :src="item2.fromHeadPortrait" />
          </div>
          <p class="other-reply-nickname">{{item2.fromNickname}}</p>
          <p>&nbsp;回复@&nbsp;</p>
          <div class="other-reply-avatar">
            <img :src="item2.toHeadPortrait" />
          </div>
          <p class="other-reply-nickname">{{item2.toNickname}}</p>
        </div>
        <div class="other-reply-content">{{item2.content}}</div>
        <div class="reply-time">
          <span>{{item2.time}}</span>
          <svg class="icon" aria-hidden="true" v-show="!item2.star" @click="starIt(item2.id, $store.state.recommend.replyType, index1, index2)">
            <use xlink:href="#icondianzan" />
          </svg>
          <svg class="icon" aria-hidden="true" v-show="item2.star" @click="cancerStar(item2.id, $store.state.recommend.replyType, index1, index2)">
            <use xlink:href="#icondianzan-copy" />
          </svg>
          <span>{{item2.starNum}}</span>
          <span class="other-reply-user-reply" @click="getActiveIndex(index1, item2.fromUserId, item2.fromNickname)" v-show="item2.fromUserId != userInfo.id">回复</span>
          <span class="delete-user-reply" @click="deleteUserReply(index1,index2)" v-show="item2.fromUserId == userInfo.id">删除</span>
        </div>
      </div>
      </div>
      <!-- 回复评论的输入框 -->
      <p class="reply-content" @click="getActiveIndex(index1, item1.userId, item1.nickName)" v-show="commentList.userId != userInfo.id">回复</p>
      <div class="my-reply" v-show="index1 === showIndex">
        <div class="reply-chunk">
          <textarea class="content-chunk" v-model="reply.content"></textarea>
          <div class="face-expression" @mouseenter="show = !show" @mouseleave="show = !show">
            <svg class="icon" aria-hidden="true" v-show="!show">
              <use xlink:href="#iconbiaoqing" />
            </svg>
            <svg class="icon" aria-hidden="true" v-show="show">
              <use xlink:href="#iconbiaoqing-copy"/>
            </svg>
          </div>
        </div>
        <div class="button-chunk">
          <button @click="replyComment()">回 复<br>评 论
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userInfo:{
        id: '',
        headPortrait: '',
        nickName: ''
      },
      commentList: [],
      newContent: "",
      show: false,
      showIndex: "",
      reply: {
        content: ""
      },
      windowHeight: window.scrollTop + 200,
      commentNum: 0,
      commentSize: 10,
      replyNum: 0,
      replySize: 5
    };
  },
  props: {
    msg: {
      type: Object,
      require: true
    }
  },
  components: {},
  methods: {
    changeFoucesDriection() {
      this.showIndex = '';
    },
    addUserComment() {
      // 上传数据
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/json"
        },
        timeout: 3000
      });     
      instance.post(this.$store.state.recommend.commentUrl, {
        articleId: this.$store.state.recommend.id,
        content: this.msg.content
      }
    ).then((res) => {
      console.log(res);
        if(res.data.result == 'success') {
          this.commentNum = this.commentList.length;
          this.commentSize = 3;
          this.getComment();
       }
      }), err => {
        console.log(err);
      }
    },
    getActiveIndex(index1, id, nickName) {
      this.showIndex = index1;
      this.reply.content = '';
      this.toId = id;
      $(".content-chunk:eq(" + index1 + ")").attr(
        "placeholder",
        "回复@" + nickName
      );
    },
    replyComment() {
      // 回复评论或评论里的回复
      if (this.reply.content == "" || this.reply.content == null) {
        return;
      } else {
        // 上传数据
      var instance = this.$axios.create({
        timeout: 6000
      });
      instance.post(this.$store.state.recommend.replyUrl, {
        commentId: this.commentList[this.showIndex].id,
        toUserId: this.toId,
        content: this.reply.content
      }).then(res => {
        console.log(res);
        if(this.commentList[this.showIndex].replyList == []) {
          this.replyNum = 0;
          this.replySize = 2;
        } else {
          this.replyNum = this.commentList[this.showIndex].replyList.length
          this.replySize = 2;
        }
        if(res.data.result == 'success') {
          this.getReply(this.showIndex);
        }
      }), err => {
        console.log(err);
      };
        this.reply.content = "";
      }
    },
    getComment() {
      // 获取评论
        this.$axios.get(this.$store.state.recommend.commentUrl, {
          params: {
            articleId: this.$store.state.recommend.id,
            num: this.commentNum,
            size: this.commentSize
          }
        }).then(res => {
          console.log(res);
          if (res.data.result == 'success') {
            if(res.data.message.length < this.commentSize) {
              this.commentSize = this.commentSize - 10 + res.data.message.length;
            }
            for (var i = 0; i < res.data.message.length; i++) {
              this.commentList.push({
                id: res.data.message[i].id,
                userId: res.data.message[i].userId,
                content: res.data.message[i].content,
                headPortrait: res.data.message[i].headPortrait,
                nickName: res.data.message[i].nickname,
                starNum: res.data.message[i].starNum,
                time: res.data.message[i].time,
                star: false,
                replyList: []
               });
              this.getReply(this.commentList.length - 1, this.commentList.length - 1);
              this.checkStarState(res.data.message[i].id, this.$store.state.recommend.commentType, this.commentList.length - 1, 1);
          }
         }
        }),
        err => {
          console.log(err);
        };
    },
    getReply(i, k) {
      // 获取对应评论的回复
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      });
      instance
        .get(this.$store.state.recommend.replyUrl, {
          params: {
            id: this.commentList[i].id,
            num: this.replyNum,
            size: this.replySize
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.result == 'success') {
          for (var j = 0; j < res.data.message.length; j++) {
           this.commentList[i].replyList.push({
              id: res.data.message[j].id,
              fromUserId: res.data.message[j].fromUserId,
              toUserId: res.data.message[j].toUserId,
              content: res.data.message[j].content,
              time: res.data.message[j].time,
              starNum: res.data.message[j].starNum,
              fromNickname: res.data.message[j].fromNickname,
              fromHeadPortrait: res.data.message[j].fromHeadPortrait,
              toNickname: res.data.message[j].toNickname,
              toHeadPortrait: res.data.message[j].toHeadPortrait,
              star: false
            });
            if(k != '' || k != null) {
            this.checkStarState(res.data.message[j].id, this.$store.state.recommend.replyType, i, 2, j);
            }
          }
         }
        });
    },
    checkStarState(id, type, index, i, k) {
      // 验证是否已经点赞
        this.$axios.get('/star', {
          params: {
            typeId: id,
            type: type
          },
          timeout: 3000
        }).then((res) => {
          console.log(res);
          if(res.data.result == 'success') {
            if(i == 1) {
            this.commentList[index].star = true;
            } else {
            this.commentList[index].replyList[k].star = true;
            }
          }
        }), err => {
          console.log(err);
        }
    },
    starIt(id, type, index1, index2) {
      // 点赞
      this.$axios.post('/star', this.$Qs.stringify({
             typeId: id,
             type: type
           }), {
           headers: {
             "content-type": "application/x-www-form-urlencoded"
           }
         }).then((res) => {
           console.log(res);
           if(res.data.result == 'success') {
             if(index2 == 'comment') {
               this.commentList[index1].star = true;
               this.commentList[index1].starNum++;
             } else {
               this.commentList[index1].replyList[index2].star = true;
               this.commentList[index1].replyList[index2].starNum++;
             }
           }
         }), err => {
           console.log(err);
         }
    },
    cancerStar(id, type, index1, index2) {
      // 取消点赞
       var data = {
            typeId: id,
            type: type
         };
        this.$axios.delete('/star', {params: data}).then((res) => {
          console.log(res);
           if(res.data.result == 'success') {
              if(index2 == 'comment') {
               this.commentList[index1].star = false;
               this.commentList[index1].starNum--;
             } else {
              this.commentList[index1].replyList[index2].star = false;
              this.commentList[index1].replyList[index2].starNum--;
             }
           }
         }), err => {
           console.log(err);
         }
    },
    deleteUserComment(i) {
      // 删除评论
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 5000
      });
      var data = {
        commentId: this.commentList[i].id
      };
      if(this.$store.state.recommend.detailType == 7) {
        instance.delete(`/comment/path/${data.commentId}`).then((res) => {
          console.log(res);
          if(res.data.result == 'success') {
            this.commentList.splice(i, 1);
          }
          
        }), err => {
          console.log(err);
        }
      } else if(this.$store.state.recommend.detailType == 4) {
        instance.delete(`/comment/scenic/${data.commentId}`).then((res) => {
          console.log(res);
          if(res.data.result == 'success') {
            this.commentList.splice(i, 1);
          }
        }), err => {
          console.log(err);
        }
      }
    },
    deleteUserReply(i, j) {
      // 删除回复
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 5000
      });
      var data = {
        replyId: this.commentList[i].replyList[j].id
      };
      if(this.$store.state.recommend.detailType == 7) {  // 删除的是路线评论的回复
        instance.delete(`/reply/path/${data.replyId}`).then((res) => {
          console.log(res);
          if(res.data.result == 'success') {
              this.commentList[i].replyList.splice(j, 1); // 删除数组的数据
          }
        }), err => {
          console.log(err);
        }
      } else if(this.$store.state.recommend.detailType == 4) {  // 删除的是景点评论的回复
         instance.delete(`/reply/scenic/${data.replyId}`).then((res) => {
          console.log(res);
          if(res.data.result == 'success') {
              this.commentList[i].replyList.splice(j, 1); // 删除数组的数据
          }
        }), err => {
          console.log(err);
        }
      }
    },
    listenHeight() {  // 监听浏览器滚动高度变化
      if (document.documentElement.scrollTop > this.windowHeight) {
        this.windowHeight += 200;
        this.getComment();
      }
    }
  },
  mounted: function() {
    // window.addEventListener("scroll", this.listenHeight);
    // 获取当前用户信息
    var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 4000
       });
        let params = {
          id: 2
        };
        instance.get(`/user/info/${params.id}`).then((res) => {
          console.log(res);
          this.userInfo.id = res.data.message.id;
          this.userInfo.headPortrait = res.data.message.headPortrait;
          this.userInfo.nickName = res.data.message.nickname;
        }), err => {
          console.log(err);
        };
        this.getComment();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenHeight);
  }
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}

.comment-area {
  width: 100%;
  border: 0;
  margin-bottom: 0;
}

.comment-point {
  width: 90%;
  min-height: 100px;
  margin: 1% auto;
  border-top: 1px solid #e5e9f0;
}

.user-info {
  display: flex;
  width: 100%;
  height: 30px;
  margin: 10px;
  border-radius: 50%;
}

.avatar {
  width: 30px;
  height: 30px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}

.user-info p {
  width: 150px;
  margin-left: 10px;
  line-height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-comment {
  height: auto;
  font-size: 0.7em;
  color: #e74b37;
  cursor: pointer;
}
.hover-point {
  border-radius: 5px;
  padding: 2px;
}

.delete-comment span {
  line-height: 1.3em;
}

.hover-point:hover {
  color: #fff;
  background-color: #e74b37;
}

.user-content {
  margin: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.comment-time {
  font-size: 0.7em;
}

.comment-time .icon {
  width: 1.4em;
  height: 1.4em;
  cursor: pointer;
}

.reply-time {
  font-size: 0.7em;
}

.reply-time .icon {
  font-size: 1.3em;
}

.reply-content {
  width: 5%;
  margin-left: 90%;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.reply-content:hover {
  color: #fff;
  background-color: #e0dede;
}

.other-reply {
  margin: 30px;
}

.other-reply-info {
  display: flex;
  margin: 5px;
}

.other-reply-avatar {
  width: auto;
  height: 20px;
}

.other-reply-nickname {
  width: auto;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.other-reply-user-reply,
.delete-user-reply {
  padding: 2px;
  font-size: 0.9em;
  cursor: pointer;
  border-radius: 5px;
}

.delete-user-reply {
  color: #e74b37;
}

.delete-user-reply:hover {
  color: #fff;
  background-color: #e74b37;
}

.other-reply-user-reply:hover {
  color: #fff;
  background-color: #e0dede;
}

.other-reply-avatar img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.other-reply-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.reply-area {
  position: relative;
  width: 60%;
  border: 1px solid #e5e9f0;
  margin: 4% auto;
}
.reply-area .title {
  position: absolute;
  top: -1em;
  left: 10%;
  line-height: 2em;
  padding: 0 1em;
  background-color: #fff;
}

.my-reply {
  display: flex;
  width: 90%;
  height: 80px;
  margin: 2% auto;
}
.reply-chunk {
  display: flex;
  width: 85%;
}

.reply-chunk .content-chunk {
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
