<template>
  <div class="navigation">
    <div class="side-bar">
      <div class="title">
        <svg class="icon" aria-hidden="true"> 
          <use xlink:href="#iconzhifeiji"></use>
        </svg>
        <span>消息中心</span>
      </div>
      <div class="message-sort">
        <div v-for="(item, index) in sortList" v-bind:class="{sort: index != showIndex, 'sort-on': index == showIndex}" @click="showIndex = index" :key="index"><li>{{item}}</li></div>
      </div>
    </div>
    <div class="container">
    <div class="top">
      <div class="my-message">我的消息</div>
      <div class="service">客服</div>
    </div>
    <div class="chat-chunk">
      <chat></chat>
    </div>
    </div>
  </div>
</template>

<script>
import chat from './Chat'

export default {
  data() {
    return {
      sortList: ['好友消息', '商家消息', '系统消息'],
      showIndex: 0
    };
  },
  components: {
    chat
  },
  methods: {
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  width: 70%;
  height: 100vh;
  border: 1px solid #ebebeb;
  margin: 0 auto 1% auto;
  color: #666;
  background-color: hsla(0,0%,100%,.8);
}

.side-bar {
  width: 10%;
  height: 100vh;
  border-right: 1px solid #ebebeb;
}
.title {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.message-sort {
  margin-top: 40px;
}

.sort {
  width: 90%;
  height: 40px;
  margin: 10% auto;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}

.sort:hover {
  color: #e74b37;
}

.sort-on {
  width: 90%;
  height: 40px;
  margin: 10% auto;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: #e74b37;
  border-radius: 4px;
}

.container {
  width: 90%;
  height: 100vh;
}

.top {
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 40px;
  margin: 10px auto;
}

.my-message {
  height: 100%;
  margin-left: 2%;
  line-height: 40px;
}

.service {
  height: 100%;
  margin-right: 2%;
  line-height: 40px;
}

.chat-chunk {
  width: 98%;
  height: calc(100vh - 70px);
  margin: 10px auto;
  border: 1px solid #ebebeb;
}
</style>
