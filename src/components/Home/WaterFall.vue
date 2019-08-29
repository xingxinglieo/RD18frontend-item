<template>
  <!-- 瀑布流 -->
  <div class="waterfall">
    <div id="col1">
      <div class="item" v-for="(item, index) in dataList1" :key="index" @click="fetchDetail()">
        <div class="picture-chunk">
          <img
            :src="photo"
            v-for="(photo,index) in item.photos"
            :key="index"
            v-show="index == showindex"
          />
        </div>
        <div class="info">
           <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img :src="item.headPortrait" />
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
    <div id="col2">
      <div class="item" v-for="(item, index) in dataList2" :key="index">
        <div class="picture-chunk">
          <img
            :src="photo"
            v-for="(photo,index) in item.photos"
            :key="index"
            v-show="index == showindex"
          />
        </div>
        <div class="info">
          <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img :src="item.headPortrait" />
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
    <div id="col3">
      <div class="item" v-for="(item, index) in dataList3" :key="index">
        <div class="picture-chunk">
          <img
            :src="photo"
            v-for="(photo,index) in item.photos"
            :key="index"
            v-show="index == showindex"
          />
        </div>
        <div class="info">
            <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img :src="item.headPortrait" />
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
    <div id="col4">
      <div class="item" v-for="(item, index) in dataList4" :key="index">
        <div class="picture-chunk">
          <img
            :src="photo"
            v-for="(photo,index) in item.photos"
            :key="index"
            v-show="index == showindex"
          />
        </div>
        <div class="info">
           <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img :src="item.headPortrait" />
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
    <div id="col5">
      <div class="item" v-for="(item, index) in dataList5" :key="index">
        <div class="picture-chunk">
          <img
            :src="photo"
            v-for="(photo,index) in item.photos"
            :key="index"
            v-show="index == showindex"
          />
        </div>
        <div class="info">
           <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="info-chunk">
            <div class="avatar-chunk">
              <img :src="item.headPortrait" />
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
</template>

<script>
export default {
  name: "waterfall",
  data() {
    return {
      listCollection: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      dataList5: [],
      windowHeight: window.screen.height + 200,
      num: 0,
      size: 20,
      arr: 0,
      showindex: 0
    };
  },
  methods: {
    selectCol() {
      var height1 = $("#col1").height();
      var height2 = $("#col2").height();
      var height3 = $("#col3").height();
      var height4 = $("#col4").height();
      var height5 = $("#col5").height();
      console.log(height1);

      switch (Math.min(height1, height2, height3, height4, height5)) {
        case height1:
          return 1;
          break;
        case height2:
          return 2;
          break;
        case height3:
          return 3;
          break;
        case height4:
          return 4;
          break;
        case height5:
          return 5;
          break;
      }
    },
    addDataAccount() {
      var ref = this.selectCol();
      if (this.listCollection.length > this.arr) {
        switch (ref) {
          case 1:
            this.dataList1.push(this.listCollection[this.arr]);
            break;
          case 2:
            this.dataList2.push(this.listCollection[this.arr]);
            break;
          case 3:
            this.dataList3.push(this.listCollection[this.arr]);
            break;
          case 4:
            this.dataList4.push(this.listCollection[this.arr]);
            break;
          case 5:
            this.dataList5.push(this.listCollection[this.arr]);
            break;
          default:
            break;
        }
        this.$nextTick(() => {
          this.arr++;
          this.addDataAccount(); // 回调
        });
      }
    },
    loadData() {
      if (document.documentElement.scrollTop > this.windowHeight - 200) {
        this.windowHeight += 200;
        this.num += 20;
        this.size += 20;
        this.sponserRequest();
      }
    },
    sponserRequest(id) {
      var param;
      if (id == "" || id == null) {
        param = {
          num: this.num,
          size: this.size
        };
      } else {
        param = {
          num: this.num,
          size: this.size,
          categoryId: id
        };
      }
      this.$axios
        .get(this.$store.state.waterfall.url, {
          params: param
        })
        .then(res => {
          console.log(res);
          if (res.data.result == "success") {
            if (this.size == 10) {
              this.listCollection = [];
            }
            for (var i = 0; i < res.data.message.length; i++) {
              var star = res.data.message[i].starNum;
              if (res.data.message[i].starNum == null) {
                star = 0;
              }
              this.listCollection.push({
                id: res.data.message[i].id,
                userId: res.data.message[i].userId,
                headPortrait:
                  "http://47.112.212.177:80/requireImage/" +
                  res.data.message[i].headPortrait,
                nickName: res.data.message[i].nickName,
                photos: res.data.message[i].photo,
                starNum: star,
                title: res.data.message[i].title
              });
            }
            this.addDataAccount();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearList() {
      this.listCollection = [];
      this.dataList1 = [];
      this.dataList2 = [];
      this.dataList3 = [];
      this.dataList4 = [];
      this.dataList5 = [];
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
    },
    searchTravelNotes(keyword) {
      this.$axios.get('/search/travel', {
        params: {
          key: keyword,
          num: this.num,
          size: this.size
        }
      }).then((res) => {
        console.log(res);
        
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.sponserRequest();
    window.addEventListener("scroll", this.loadData());
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.loadData());
  }
};
</script>

<style scoped>
.waterfall {
  position: relative;
  width: 80%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}

#col1,
#col2,
#col3,
#col4,
#col5 {
  float: left;
  width: 18%;
  margin: 1%;
  min-height: 10px;
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

.item:hover {
  opacity: 0.8;
  background-color: rgb(238, 237, 237);
}

.item-move {
  margin-top: 10%;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 5px 5px #f0eded;
}

.picture-chunk {
  font-size: 0;
  position: relative;
}

.picture-chunk img {
  position: relative;
  width: 100%;
  border-radius: 4px 4px 0 0;
}

.info {
  padding-top: 5%;
  border-radius: 0 0 10px 10px;
  border-top: 0;
}

.info-chunk {
  display: flex;
  justify-content: space-evenly;
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

.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: 90%;
  margin: 10px auto;
}
</style>

