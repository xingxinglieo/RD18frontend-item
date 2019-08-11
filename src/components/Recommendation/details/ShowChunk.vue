<template>
<!-- 展示详细图片 -->
 <div class="slide-show">
    <h3>{{title}}</h3>
   <!-- <div class="show-part">
   <div class="show-chunk">
     <div id="imgChunk">
       <img :src="item" v-for="(item, index) in imgList" :key="index">
     </div>
      <div class="left-bar" @mouseenter="cursorInLeft = true" @mouseleave="cursorInLeft = false" @click="switchLeftPic()">
          <svg id="leftIcon" class="icon" aria-hidden="true" v-show="cursorInLeft"> 
            <use xlink:href="#iconleft-copy"></use>
          </svg>
      </div>
      <div class="right-bar" @mouseenter="cursorInRight = true" @mouseleave="cursorInRight = false"  @click="switchRightPic()">
          <svg id="rightIcon" class="icon" aria-hidden="true" v-show="cursorInRight"> 
            <use xlink:href="#iconleft1-copy"></use>
          </svg>
      </div>
    <div class="shrink-img">
      <img :src="item" v-for="(item, index) in imgList" :key="index" v-bind:class="{'shrink-show': true, 'shrink-show-on': index == showIndex }">
   </div>
   </div>
   </div> -->
   <!-- 相关介绍 -->
   <div class="detail-intro">
     <div class="deposit-time">时间: {{depositTime}}</div>
     <div id="detail-content" v-html="content"></div>
     <div class="traffic-info" v-show="this.$store.state.recommend.detailType == 4">
       <div v-html="trafficInfo"></div>
     </div>
     <div class="title"><span>END</span></div>
     <div class="like-star">
     <div class="like">
       <svg class="icon" aria-hidden="true" v-show="!like"  @click="like = !like, changeLikeNum()"> 
        <use xlink:href="#icondianzan"></use>
       </svg>
       <svg class="icon" aria-hidden="true" v-show="like"  @click="like = !like, changeLikeNum()"> 
        <use xlink:href="#icondianzan-copy"></use>
       </svg>
      <p>{{likeNumber}}</p>
     </div>
     <div class="star">
       <svg class="icon" aria-hidden="true" v-show="!star" @click="star = !star, changeStarNum()">
        <use xlink:href="#iconpingfen2"></use>
       </svg>
       <svg class="icon" aria-hidden="true" v-show="star" @click="star = !star, changeStarNum()"> 
        <use xlink:href="#iconshoucang"></use>
       </svg>
       <p>{{starNumber}}</p>
     </div>
     </div>
   </div>
 </div>
</template>

<script>

 export default {
   data () {
     return {
       title: '',
       imgList: [],
       cursorInLeft: false,
       cursorInRight: false,
       showIndex: 0,
       shrinkIndex: 0,
       like: false,
       star: false,
       likeNumber: '0',
       starNumber: '0',
       content: '',
       trafficInfo: '',
       depositTime:'',
     }
   },
   components: {
     
   },
   methods: {
     getCoord() {

     },
     switchLeftPic() {
       var width = $(".slide-show").width();
       this.showIndex--
        if(this.showIndex == -1 ) {
          this.showIndex = this.imgList.length - 1;
          $("#imgChunk").animate({
         left: -width*(this.imgList.length - 1)
         },300);
          return;
       }
       $("#imgChunk").animate({
         left: -width*this.showIndex
       },300)
     },
     switchRightPic() {
       var width = $(".slide-show").width();
       this.showIndex++
       if(this.showIndex >= this.imgList.length) {
         this.showIndex = 0;
       }
        $("#imgChunk").animate({
         left: -width*this.showIndex
       },300)
     },
     moveToTargetPic(index) {
       var spacing = this.showIndex - index;
       var width = $(".slide-show").width();
       if(spacing >= 0) {
         this.shrinkIndex = index;
           $("#imgChunk").animate({
         left: -width*spacing
       },300);
       } else {
         this.shrinkIndex = index;
          $("#imgChunk").animate({
          left: width*spacing
         },300);
       };
     },
     changeLikeNum() {
       if(this.like == true) {
         this.$axios.post('/star', this.$Qs.stringify({
             typeId: this.$store.state.recommend.id,
             type: this.$store.state.recommend.detailType
           }), {
           headers: {
             "content-type": "application/x-www-form-urlencoded"
           }
         }).then((res) => {
           console.log(res);
           if(res.data.result == 'success') {
              this.likeNumber++;
           }
         }), err => {
           console.log(err);
         }
       } else {
         var data = {
            typeId: this.$store.state.recommend.id,
            type: this.$store.state.recommend.detailType
         };
        this.$axios.delete('/star', {params: data}).then((res) => {
          console.log(res);
          
           if(res.data.result == 'success') {
              this.likeNumber--;
           }
         }), err => {
           console.log(err);
         }
       }
     },
     changeStarNum() {
      if(this.star == true) {
          this.$axios.post('/collection', this.$Qs.stringify({
             typeId: this.$store.state.recommend.id,
             type: this.$store.state.recommend.collectType
           }), {
           headers: {
             "content-type": "application/x-www-form-urlencoded"
           }
         }).then((res) => {
           console.log(res);
           if(res.data.result == 'success') {
              this.starNumber++;
           }
         }), err => {
           console.log(err);
         }
      } else {
        var data = {
            typeId: this.$store.state.recommend.id,
            type: this.$store.state.recommend.collectType
         };
        this.$axios.delete('/star', {params: data}).then((res) => {
          console.log(res);
           if(res.data.result == 'success') {
              this.starNumber--;
           }
         }), err => {
           console.log(err);
         }
      }
     },
     getDetails() {
       this.$axios.all([
         // 获取文章详情
         this.$axios.get(this.$store.state.recommend.url, {
         params: {
           id: this.$store.state.recommend.id,
         },
         timeout: 10000
        }),
        // 验证是否已经点赞
        this.$axios.get('/star', {
          params: {
            typeId: this.$store.state.recommend.id,
            type: this.$store.state.recommend.detailType
          },
          timeout: 3000
        }),
        // 验证是否已经收藏
        this.$axios.get('/collection', {
          params: {
            typeId: this.$store.state.recommend.id,
            type: this.$store.state.recommend.collectType
          },
          timeout: 3000
        })
       ]).then(
         this.$axios.spread((res, starRes, collectRes) => {
          console.log(res.data.message);
          console.log(starRes);
          console.log(collectRes);
         if(res.data.result == 'success') {
         this.title = res.data.message.title;
         this.imgList.push(res.data.message.preview);
         this.likeNumber = res.data.message.starNum;
         this.starNumber = res.data.message.collectionNum;
         this.depositTime = res.data.message.depositTime;
         if(this.$store.state.recommend.detailType == 7) {
           this.content = res.data.message.content;
         } else if (this.$store.state.recommend.detailType == 4) {
           this.content = res.data.message.spotIntroduction;
           this.trafficInfo = res.data.message.trafficInformation;
         };
         };
         if(starRes.data.result == 'success') {
           this.like = true;
         };
         if(collectRes.data.result == 'success') {
           this.star = true;
         };
         })
       ), err => {
         console.log(err);
       }
     
     },
     getHeight() {
       this.$store.state.show_chunk_height = $('.slide-show:eq(0)').height();
     }
   },
   mounted: function() {
    this.getDetails();
    window.addEventListener("scroll", this.getHeight);
   },
   beforeDestroy () {
    window.removeEventListener("scroll", this.getHeight);
   }
 }
</script>

<style scoped>

.slide-show {
  width: 1000px;
  height: auto;
  margin: 2% auto;
  border: 1px solid #e5e9f0;
  overflow: hidden;
}

.show-part{
  width: 100%;
  height: 700px;
}

h3 {
  text-align: center;
}

.show-chunk {
  position: relative;
  height: 600px;
  width: 100%;
  cursor: pointer;
}

#imgChunk {
  position: absolute;
  display: flex;
  width: 100%;
  height: 600px;
  z-index: -1;
  top: 0;
  left: 0;
}

#imgChunk img {
  width: 100%;
  height: 100%
} 

.left-bar {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
}

.right-bar {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  top: 0;
}

/* .left-bar:hover,
.right-bar:hover {
  cursor: none;
} */
.show-chunk .icon {
  position: absolute;
  width: 5em;
  height: 5em;
  top: 50%;
  transform: translateY(-50%);
}

#rightIcon {
  right: 0;
}

.shrink-img {
  position: absolute;
  display: flex;
  top: 610px;
  left: 50%;
  transform: translate(-50%);
  width: auto;
  height: 70px;
  overflow: hidden;
}

.shrink-show {
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
}

.shrink-show:hover {
  opacity: 0.8;
}

.shrink-show-on {
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
  border: 2px solid #e5e9f0;
}

.detail-intro {
  width: 90%;
  height: auto;
  min-height: 100px;
  margin: 0 auto;
}

#detail-content {
  padding-bottom: 5%;
}

.traffic-info {
  padding: 5%;
}

 .title {
  position: relative;
  border-bottom: 1px solid #e5e9f0;
}

.title span {
  position: absolute;
  top: -1em;
  left: 50%;
  transform: translateX(-50%);
  line-height: 2em;
  padding: 0 1em;
  background-color: #fff;
}

.like-star {
  display: flex;
  margin-left: 90%;
  cursor: pointer;
  text-align: center;
}

.like-star .icon {
  width: 2em;
  height: 2em;
  margin: 10px;
}

</style>
