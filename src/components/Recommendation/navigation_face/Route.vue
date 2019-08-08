<template>
<!-- 推荐路线列表 -->
 <div class="route">
   <form class="search">
      <input type="text" placeholder="搜索路线" autocomplete="off" v-model="keyword"/>
      <button type="button" v-on:mouseover="put = !put" v-on:mouseout="put = !put" @click="submitKeyword()">
        <svg class="icon" aria-hidden="true" v-show="put == false">
          <use xlink:href="#iconsoushuo" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="put == true">
          <use xlink:href="#iconsoushuo-copy" />
        </svg>
      </button>
    </form>
   <div class="list-point" v-for="(item, index) in listMenu" :key='index' @click="getRouteDetails(index)">
     <div class="route-pic-chunk">
       <img :src= item.imgUrl />
     </div>
     <div class="route-info">
       <div class="route-point">
         <span>{{item.title}}</span>
      </div>
      <div class="route-point">
         <svg class="icon" aria-hidden="true"> 
           <use xlink:href="#iconjianjie"></use>
         </svg>
          <span>介绍:</span>
       </div>
       <div class="route-intro">{{item.content}}</div>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       put: false,
       listMenu: [],
       hover: false,
       keyword: '',
       searchWord: '',
       windowHeight: window.screen.height + 200,
       url: '/share/path',
       num: 0,
       param: ''
     }
   },
   components: {
     
   },
   methods: {
     getRouteDetails(index) {
       this.$store.state.recommend.id = this.listMenu[index].id;
       this.$store.state.recommend.url = '/share/path/detail';
       this.$store.state.recommend.detailType = 7;
       this.$store.state.recommend.collectType = 11;
       this.$store.state.recommend.commentUrl = '/comment/path';
       this.$store.state.recommend.commentType = 8;
       this.$store.state.recommend.replyUrl = '/reply/path';
       this.$store.state.recommend.replyType = 9;
       this.$store.state.recommend.deleteCommentUrl = '/comment/path/{commentId}';
       this.$store.state.recommend.deleteReplyUrl = '/reply/path/{replyId}';
       this.$store.state.navigation.location = 1;
       this.$router.push({
         path: '/details',
         name: 'details'
       })
     },
    searchPath(n, num) {
      if(n == 2 && this.keyword == '') {
        return;
      } else if(n == 2 && this.keyword != '') {
         this.listMenu = [];
         this.num = 0;
         this.searchWord = this.keyword;
         this.url = '/search/path';
         this.param =  {
          key: this.searchWord,
          num: this.num,
          size: 8
        }
         } else {
        this.num += num;
        this.searchWord = '';
        this.url = '/share/path';
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
         console.log(res.data.message);
        for(let i = 0; i < res.data.message.length; i++) {
          if(res.data.result == 'success') {
            this.listMenu.push({
            id: res.data.message[i].id,
            imgUrl: res.data.message[i].preview,
            title: res.data.message[i].title,
            content: res.data.message[i].introduction
           })
          } else {
            window.removeEventListener("scroll", this.listenHeight);
          }
        }
      }), err => {
        console.log(err);
      }
    },
    submitKeyword() {
      this.searchPath(2);
    },
    listenHeight() {
     if(document.documentElement.scrollTop > this.windowHeight) {
        this.windowHeight += 200;
        this.searchPath(1, 8);
      }
    }
  },
  mounted: function() {
    this.searchPath(1, 8);
    window.addEventListener("scroll", this.listenHeight);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenHeight);
  }
 }
</script>

<style scoped>
.route {
  width: 90%;
  margin: 1% auto;
  border: 1px solid gray
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

.route-pic-chunk {
  width: 25%;
  height: 90%;
  margin-top: 10px;
  margin-left: 10px;
}

.route-pic-chunk img {
  width: 100%;
  height: 100%;
}

.route-info {
  width: 90%;
}

.route-point {
  max-width: 100%;
  margin: 10px;
  margin-left: 5%;
  font-size: 1.6em;
}

.route-point span {
  font-size: 0.7em;
}

.route-intro {
  display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  width: 90%;
  max-height: 100px;
  margin-left: 5%;
  word-wrap: break-word;
}
</style>

