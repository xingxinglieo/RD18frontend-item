<template>
  <div class="container">
    <div class="list">
      <div class="list-title">
        <p>最近联系人</p>
      </div>
      <div class="list-node">
        <div class="avatar-show">
          <img src="../../assets/7.jpg" />
        </div>
        <div class="side">
          <div class="nickname">
            <p>MAKERYI</p>
          </div>
          <div class="latest-msg">
            <P>我觉得你要好好学习对不对</P>
          </div>
        </div>
      </div>
    </div>
    <div class="room">
      <div class="obj-nickname">
        <p>MAKERYI</p>
      </div>
      <div class="msg-chunk">
        <vuescroll :scrollPanel="scrollPanel">
        <div class="msg-node" v-for="(item, index) in msgList" :key="index">
          <div class="chat-obj-msg-node" v-show="item.fromUserId == 1">
            <div class="chat-obj-head-portrait">
              <img :src="item.fromUserHeadPortrait" />
            </div>
            <div class="left-triangle"></div>
            <div class="chat-obj-msg">{{item.chatText}}</div>
          </div>
          <div class="user-msg-node" v-show="item.fromUserId == 2">
            <div class="user-msg">{{item.chatText}}</div>
            <div class="right-triangle"></div>
            <div class="user-head-portrait">
              <img :src="item.fromUserHeadPortrait" />
            </div>
          </div>
        </div>
        </vuescroll>
      </div>
      <textarea class="msg-input" v-model="msg"></textarea>
      <button class="send-msg-btn" @click="sendMsg()">发送</button>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  data() {
    return {
      communicationList: [],
      msgList: [],
      msg: '',
      ws: null,
      toUserId: 1
    };
  },
  components: {
    vuescroll
  },
  methods: {
    sendMsg() {
      if(this.msg == '') {
        return;
      };
        this.ws.send(JSON.stringify({
        order: 'send',
        toUserId: this.toUserId.toString(),
        chatText: this.msg
      }));
        this.msgList.push({
            chatText: this.msg,
            fromUserHeadPortrait: null,
            fromUserId:  2,
            fromUserNickname: 1
          });
    },
     connectSever() {
      if('WebSocket' in window) {
      this.ws = new WebSocket("ws://47.112.212.177:80/qinglv/friend/chat");
      this.ws.connecting = () => {
        console.log('正在连接服务器~');
      }
      this.ws.onopen = () => {
        console.log('已连接服务器');
      }
      this.ws.onmessage = (e) => {
        var data = JSON.parse(e.data);
        console.log(data);
        if(data.result == 'success') {
          this.msgList.push({
            chatText: data.message.chatText,
            fromUserHeadPortrait: data.message.fromUserHeadPortrait,
            fromUserId:  data.message.fromUserId,
            fromUserNickname: data.message.fromUserNickname
          });
        }
      }
      this.ws.onclose = () => {
        console.log('已断开与服务器的连接');
      }
      } else {
        console.log('当前浏览器不支持websocket');
      }
    },
    print(i) {
      console.log(i);
    }
  },
  mounted() {
    this.connectSever();
  },
  beforeDestroy () {
    this.ws.close();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.list {
  width: 20%;
  height: 100%;
}

.list-title {
  height: 3%;
  text-align: center;
}

.list-node {
  display: flex;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid #ebebeb;
}

.list-node:hover {
  opacity: 0.9;
  background-color: #ebebeb;
}

.avatar-show {
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
}

.avatar-show img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nickname {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  width: 90%;
  overflow: hidden;
  margin-left: 5px;
}

.latest-msg {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-left: 5px;
  line-height: 28px;
}

.room {
  position: relative;
  width: 80%;
  height: 100%;
  background-color: #f4f5f7;
}

.obj-nickname {
  width: 100%;
  height: 3%;
}

.msg-chunk {
  width: 100%;
  height: 75%;
  overflow: auto;
  border-top: 1px solid #d4d2d2;
  border-bottom: 1px solid #d4d2d2;
}

.msg-input {
  display: inline-block;
  width: 96%;
  height: 13%;
  padding: 2%;
  resize: none;
  outline: 0;
  border: 0;
  overflow: auto;
  background-color: #f4f5f7;
}

.send-msg-btn {
  position: absolute;
  bottom: 0.5%;
  left: 85%;
  width: 10%;
  padding: 4px;
  cursor: pointer;
  border: 0;
  outline: 0;
  border-radius: 5px;
  color: #666;
  background-color: #fffdfd;
  box-shadow: 0 0.5px 0.5px 0 transparent;
}

.send-msg-btn:hover {
  color: #cc5151;
  background-color: #f5f0f0;
}

.obj-nickname {
  text-align: center;
}

.msg-node {
  width: 95%;
  height: auto;
  margin: 2%;
}

.chat-obj-msg-node {
  display: flex;
  width: 100%;
  height: auto;
}

.chat-obj-head-portrait {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.chat-obj-head-portrait img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.chat-obj-msg {
  width: auto;
  max-width: 60%;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  word-wrap: break-word;
}

.user-msg-node {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: auto;
}

.user-head-portrait {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.user-head-portrait img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.user-msg {
  width: auto;
  max-width: 60%;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  word-wrap: break-word;
}

.right-triangle {
  position: relative;
  width: 2%;
}

.right-triangle:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 15px;
  left: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 14px solid #fff;
}

.left-triangle {
  position: relative;
  width: 2%;
}

.left-triangle:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: 15px;
  right: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 14px solid #fff;
}
</style>
