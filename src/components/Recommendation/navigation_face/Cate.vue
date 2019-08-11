<template>
  <!-- 推荐美食列表 -->
  <div class="cate">
    <form class="search">
      <input type="text" placeholder="搜索美食" autocomplete="off" v-model="keyword" />
      <button type="button" v-on:mouseover="put = !put" v-on:mouseout="put = !put" @click="submitKeyword()">
        <svg class="icon" aria-hidden="true" v-show="put == false">
          <use xlink:href="#iconsoushuo" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="put == true">
          <use xlink:href="#iconsoushuo-copy" />
        </svg>
      </button>
    </form>
    <div class="list-point" v-for="(item, index) in listMenu" :key="index" @click="getCateDetails(index)">
      <div class="cate-pic-chunk">
        <img :src= item.imgUrl />
      </div>
      <div class="cate-info">
        <div class="cate-point">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconmeishi3" />
          </svg>
          <span>{{item.title}}</span>
          <br />
        </div>
        <div class="cate-point">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjianjie" />
          </svg>
          <span>简介：</span>
        </div>
        <div class="cate-intro">{{item.content}}</div>
      </div>
      <!-- <div class="mark">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconpingfen1" />
        </svg>
        <span>评分：</span>
        <span>9.8</span>
      </div>
      <div class="expand-pic" v-show="hover">
        <img src="../../../assets/cate.jpg" />
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listMenu: [],
      hover: false,
      put: false,
      keyword: '',
      searchWord: '',
      windowHeight: window.screen.height + 200,
      num: 0,
      url: '/share/food',
      param: ''
    };
  },
  components: {},
  methods: {
    getCateDetails(index) {
      // 此功能尚未开启
      // this.$store.state.recommend.id = this.listMenu[index].id;
      // this.$store.state.recommend.target = 'cate';
      // this.$router.push({
      //   path: "/details",
      //   name: "details"
      // });
    },
    searchCate(n, num) {
      if(n == 2 && this.keyword == '') {
        return;
      } else if(n == 2 && this.keyword != '') {
         this.listMenu = [];
         this.num = 0;
         this.searchWord = this.keyword;
         this.url = '/search/food';
         this.param =  {
          key: this.searchWord,
          num: this.num,
          size: 8
        }
         } else {
        this.num += num;
        this.searchWord = '';
        this.url = '/share/food';
        this.param =  {
          num: this.num,
          size: 8
        }
      };
      var instance = this.$axios.create({
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
     });
      instance.get(this.url,{
        params: this.param
      })
      .then((res) => {
        for(let i = 0; i < res.data.message.length; i++) {
          if(res.data.message != '无文章') {
            this.listMenu.push({
            id: res.data.message[i].id,
            imgUrl: res.data.message[i].preview,
            title: res.data.message[i].title,
            content: res.data.message[i].content
           })
          };
           if(res.data.message == null || res.data.message == []) {
            window.removeEventListener("scroll", this.listenHeight);
          }
        }
      }), err => {
        console.log(err);
      }
    },
    submitKeyword() {
      this.searchCate(2);
    },
    listenHeight() {
     if(document.documentElement.scrollTop > this.windowHeight) {
        this.windowHeight += 200;
        this.searchCate(1, 8);
      }
    }
  },
  mounted: function() {
    this.searchCate(1, 8);
    window.addEventListener("scroll", this.listenHeight);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenHeight);
  }
};
</script>

<style scoped>
.cate {
  width: 90%;
  margin: 1% auto;
  border: 1px solid gray;
}

.search {
  display: flex;
  margin: 2%;
}

.search input {
  width: 25%;
  padding: 8px;
  outline: 0;
  border: 0;
  border-radius: 10px 0 0 10px;
  background-color: #f8f7f7;
}

.search button {
  display: block;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 0 10px 10px 0;
  outline: 0;
  cursor: pointer;
  background-color: #f8f7f7;
}

.list-point {
  position: relative;
  display: flex;
  width: 98%;
  height: 200px;
  margin: 10px auto;
  border: 1px solid gray;
  cursor: pointer;
}

.list-point:hover {
  background-color: #eeebeb;
}

.cate-pic-chunk {
  width: 25%;
  height: 90%;
  margin-top: 10px;
  margin-left: 10px;
}

.cate-pic-chunk img {
  width: 100%;
  height: 100%;
}

.cate-info {
  width: 60%;
}

.cate-point {
  max-width: 50%;
  margin: 10px;
  margin-left: 5%;
  font-size: 1.6em;
}

.cate-point span {
  font-size: 0.7em;
}

.cate-intro {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  width: 100%;
  margin-left: 5%;
  word-wrap: break-word;
}

.mark {
  width: 120px;
  height: 20%;
  margin-top: 2%;
  margin-left: 5%;
}

.expand-pic {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  width: 40%;
  padding: 1%;
  background-color: white;
  border-radius: 5px;
}

.expand-pic img {
  width: 100%;
}
</style>