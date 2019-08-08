<template>
<!-- 推荐景点列表 -->
 <div class="spot">
   <form class="search">
      <input type="text" placeholder="搜索景点" autocomplete="off" v-model="keyword" />
      <button type="button" v-on:mouseover="put = !put" v-on:mouseout="put = !put" @click="submitKeyword()">
        <svg class="icon" aria-hidden="true" v-show="put == false">
          <use xlink:href="#iconsoushuo" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="put == true">
          <use xlink:href="#iconsoushuo-copy" />
        </svg>
      </button>
    </form>
   <div class="list-point" v-for="(item, index) in listMenu" :key='index' @click="getSpotDetails(index)">
     <div class="spot-pic-chunk">
       <img :src= item.imgUrl>
     </div>
     <div class="spot-info">
       <div class="info-point">
         <svg class="icon" aria-hidden="true"> 
           <use xlink:href="#iconjingdian1"></use>
         </svg>
         <span>{{item.title}}</span>
       </div>
       <div class="info-point">
         <svg class="icon" aria-hidden="true"> 
           <use xlink:href="#icondidian"></use>
         </svg>
         <span>{{item.location}}</span>
       </div>
       <!-- <div class="info-point"> // 评论数
          <svg class="icon" aria-hidden="true"> 
           <use xlink:href="#iconpinglun2"></use>
         </svg>
         <span></span>
       </div> -->
     </div>
     <div class="mark">
      <svg class="icon" aria-hidden="true"> 
        <use xlink:href="#iconpingfen1"></use>
      </svg>
      <span>评分：{{item.score}}</span>
      <span></span>
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
       keyword: '',
       searchWord: '',
       windowHeight: window.screen.height + 300,
       num: 0,
       url: '/share/scenic',
       param: ''
     }
   },
   components: {

   },
   methods: {
     getSpotDetails(index) {
       this.$store.state.recommend.id = this.listMenu[index].id;
       this.$store.state.recommend.url = '/share/scenic/detail';
       this.$store.state.recommend.detailType = 4;
       this.$store.state.recommend.collectType = 12;
       this.$store.state.recommend.commentUrl = '/comment/scenic';
       this.$store.state.recommend.commentType = 5;
       this.$store.state.recommend.replyUrl = '/reply/scenic';
       this.$store.state.recommend.replyType = 6;
       this.$store.state.recommend.deleteCommentUrl = '/comment/scenic/{commentId}';
       this.$store.state.recommend.deleteReplyUrl = '/reply/scenic/{replyId}';
       this.$store.state.navigation.location = 1;
       this.$router.push({
         path: '/details',
         name: 'details'
       })
     },
   searchSpot(n, num) {
      if(n == 2 && this.keyword == '') {
        return;
      } else if(n == 2 && this.keyword != '') {
         this.listMenu = [];
         this.num = 0;
         this.searchWord = this.keyword;
         this.url = '/search/scenic';
         this.param =  {
          key: this.searchWord,
          num: this.num,
          size: 8
        }
         } else {
        this.num += num;
        this.searchWord = '';
        this.url = '/share/scenic';
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
          if(res.data.result == 'success') {
            this.listMenu.push({
            id: res.data.message[i].id,
            imgUrl: res.data.message[i].preview,
            title: res.data.message[i].title,
            location: res.data.message[i].location,
            score: res.data.message[i].score
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
      this.searchSpot(2);
    },
    listenHeight() {
     if(document.documentElement.scrollTop > this.windowHeight) {
        this.windowHeight += 300;
        this.searchSpot(1, 8);
      }
    }
  },
  mounted: function() {
    this.searchSpot(1, 8);
    window.addEventListener("scroll", this.listenHeight);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.listenHeight);
  }
}
</script>

<style scoped>
.spot {
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

.spot-pic-chunk {
  width: 20%;
  height: 90%;
  margin-top: 10px;
  margin-left: 10px;
}

.spot-pic-chunk img {
  width: 100%;
  height: 100%;
}

.spot-info {
  width: 60%;
}

.info-point {
  margin: 20px;
  margin-left: 5%;
  font-size: 1.6em;
}
.info-point span {
  font-size: 0.7em;
  line-height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mark {
  width: 120px;
  height: 20%;
  margin-top: 2%;
  margin-left: 5%;
}
</style>
