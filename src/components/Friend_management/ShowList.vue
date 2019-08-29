<template>
  <div class="show-list" v-show="state">
    <div class="list-chunk">
      <div class="list-point" v-for="(item, index) in list" :key="index">
        <div class="avatar-chunk">
          <img :src="item.headPortrait" />
        </div>
        <div class="info">
          <div class="nickname">
            <p>{{item.nickname}}</p>
          </div>
          <div class="signature">
            <p>{{item.signature}}</p>
          </div>
        </div>
        <div class="state">
          <div
            class="relation"
            @click="changeStatus(item.userId, item.friendStatus, index)"
            v-show="$store.state.management.showIndex != 5"
          >
            <button class="relation-btn">{{item.friendStatus}}</button>
          </div>
          <div class="personal">
            <button class="personal-btn">个人主页</button>
          </div>
          <div
            class="personal"
            v-show="$store.state.management.showIndex != 5 && $store.state.management.showIndex != 1"
          >
            <button class="personal-btn" @click="changeStatus(item.userId, '拉黑', index)">拉黑</button>
          </div>
          <div class="personal" v-show="$store.state.management.showIndex == 5">
            <button class="personal-btn" @click="changeStatus(item.userId, '移出黑名单', index)">移出黑名单</button>
          </div>
        </div>
      </div>
    </div>
    <div class="next-page">
      <button>上一页</button>
      <button>下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: true,
      list: [],
      num: 0,
      size: 8
    };
  },
  methods: {
    changeOption() {
      this.list = [];
      setTimeout(() => {
        this.state = true;
      }, 0);
      this.state = false;
      this.getList();
    },
    getList() {  // 获取列表
      this.list = [];
      var instance = this.$axios.create({
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 4000
      });
      instance
        .get(this.$store.state.management.previewUrl, {
          params: {
            num: this.num,
            size: this.size
          }
        })
        .then(res => {
          console.log(res);
          if (
            res.data.result == "success" &&
            res.data.message != [] &&
            res.data.message != ""
          ) {
            for (var i = 0; i < res.data.message.length; i++) {
              if(res.data.message[i].userId == 1) {
                continue;
              }
              // 验证关系
              switch (this.$store.state.management.showIndex) {
                case 1:
                  var status;
                  switch (res.data.message[i].friendStatus) {
                    case 1:
                      status = "已关注";
                      break;
                    case 2:
                      status = "关注";
                      break;
                    default:
                      break;
                  }
                  this.list.push({
                    userId: res.data.message[i].userId,
                    headPortrait:
                      "http://47.112.212.177:80/requireImage/" +
                      res.data.message[i].headPortrait,
                    nickname: res.data.message[i].nickname,
                    signature: res.data.message[i].signature,
                    friendStatus: status
                  });
                  break;
                case 2:
                  var note = res.data.message[i].nickname;
                  if (res.data.message[i].note != "") {
                    note =
                      res.data.message[i].nickname +
                      "(" +
                      res.data.message[i].note +
                      ")";
                  }
                  this.list.push({
                    userId: res.data.message[i].userId,
                    headPortrait:
                      "http://47.112.212.177:80/requireImage/" +
                      res.data.message[i].headPortrait,
                    nickname: note,
                    signature: res.data.message[i].signature,
                    friendStatus: "已关注"
                  });
                  break;
                case 3:
                  switch (res.data.message[i].friendStatus) {
                    case 3:
                      this.list.push({
                        userId: res.data.message[i].userId,
                        headPortrait:
                          "http://47.112.212.177:80/requireImage/" +
                          res.data.message[i].headPortrait,
                        nickname: res.data.message[i].nickname,
                        signature: res.data.message[i].signature,
                        friendStatus: "回粉"
                      });
                      break;
                    case 4:
                      this.list.push({
                        userId: res.data.message[i].userId,
                        headPortrait:
                          "http://47.112.212.177:80/requireImage/" +
                          res.data.message[i].headPortrait,
                        nickname: res.data.message[i].nickname,
                        signature: res.data.message[i].signature,
                        friendStatus: "已关注"
                      });
                      break;
                    default:
                      break;
                  }
                  break;
                case 4:
                  this.list.push({
                    userId: res.data.message[i].userId,
                    headPortrait:
                      "http://47.112.212.177:80/requireImage/" +
                      res.data.message[i].headPortrait,
                    nickname: res.data.message[i].nickname,
                    signature: res.data.message[i].signature,
                    friendStatus: "已关注"
                  });
                  break;
                case 5:
                  this.list.push({
                    userId: res.data.message[i].userId,
                    headPortrait:
                      "http://47.112.212.177:80/requireImage/" +
                      res.data.message[i].headPortrait,
                    nickname: res.data.message[i].nickname,
                    signature: res.data.message[i].signature,
                    friendStatus: "移除黑名单"
                  });
                  break;
                default:
                  break;
              }
            }
          }
        }),
        err => {
          console.log(err);
        };
    },
    // 更改与用户的关系
    changeStatus(id, status, index) {
      switch (status) {
        case "关注": // 关注该用户
          this.concernUser(id, index);
          break;
        case "回粉": // 关注该用户
          this.concernUser(id, index);
          break;
        case "已关注": // 取消关注
          this.cancerConcern(id, index);
          break;
        case "拉黑":
          this.blacklistUser(id, index);
          break;
        case "移出黑名单":
          this.cancerBlackList(id, index);
          break;
        default:
          break;
      }
    },
    concernUser(id, index) {
      // 关注用户
      var data = {
        toUserId: id
      };
      this.$axios.put(`/friend/follow/${data.toUserId}`).then(res => {
        console.log(res);
        if (res.data.result == "success") {
          this.list[index].friendStatus = "已关注";
        }
      }),
        err => {
          console.log(err);
        };
    },
    cancerConcern(id, index) {
      // 取消关注
      var data = {
        toUserId: id
      };
      this.$axios.delete(`/friend/unFollow/${data.toUserId}`).then(res => {
        console.log(res);
        if (res.data.result == "success") {
          switch (this.$store.state.management.showIndex) {
            case 1:
              this.list[index].friendStatus = "关注";
              break;
            case 2:
              this.list.splice(index, 1);
              break;
            case 3:
              this.list[index].friendStatus = "回粉";
              break;
            case 4:
              this.list.splice(index, 1);
              break;
            default:
              break;
          }
        }
      }),
        err => {
          console.log(err);
        };
    },
    blacklistUser(id, index) {
      var data = {
        toUserId: id
      };
      this.$axios.put(`/friend/blacklist/${data.toUserId}`).then(res => {
        console.log(res);
        if (res.data.result == "success") {
          this.list.splice(index, 1);
        }
      }),
        err => {
          console.log(err);
        };
    },
    cancerBlackList(id, index) {
      var data = {
        toUserId: id
      };
      this.$axios.delete(`/friend/unBlacklist/${data.toUserId}`).then(res => {
        console.log(res);
        if (res.data.result == "success") {
          this.list.splice(index, 1);
        }
      }),
        err => {
          console.log(err);
        };
    },
    searchUser() {
      if(this.msg == '') {
        return;
      }
      this.$axios.get('/search/user', {
        params: {
          key: this.msg,
          num: this.num,
          size: this.size
        }
      }).then((res) => {
        console.log(res);
      }), err => { 
        console.log(err);
      }
    }
  },
  mounted: function() {
    this.list = [];
  }
};
</script>

<style scoped>
.show-list {
  width: 100%;
  min-height: 1000px;
  border: 10px solid #f75a5a;
}

.list-chunk {
  height: 970px;
}

@keyframes show {
  from {
    transform: translateY(200px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.list-point {
  position: relative;
  display: flex;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #eeeded;

  -webkit-animation: show 0.6s ease;
  -moz-animation: show 0.6s ease;
  -o-animation: show 0.6s ease;
  animation: show 0.6s ease;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-iteration-count: 1;
  -moz-animation-iteration-count: 1;
  -o-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.avatar-chunk {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 10px 0 0 50px;
}

.avatar-chunk img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.info {
  width: 50%;
  height: 80px;
  margin: 20px;
}

.nickname {
  width: 100%;
  height: 20px;
  font-size: 17px;
}

.signature {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 10px 0;
  color: #333333;
}

.state {
  width: 30%;
  height: 80px;
  margin: 10px;
  text-align: center;
}

.relation,
.personal {
  width: 80%;
  height: 30px;
  margin: 5px auto;
}

.relation-btn,
.personal-btn,
.next-page button {
  width: 50%;
  padding: 5px;
  border: 0;
  border-radius: 4px;
  outline: 0;
  box-shadow: 1px 1px;
  cursor: pointer;
  color: #fff;
  background-color: #e74b37;
}

.next-page button {
  margin: 20px;
}

.relation-btn:hover,
.personal-btn:hover,
.next-page button:hover {
  background-color: #fa533d;
}

.next-page {
  display: flex;
  width: 30%;
  margin: auto;
}
</style>
