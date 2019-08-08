<template>
  <div class="slieshow">
    <!-- <span class="demonstration">Click 指示器触发</span> -->
    <el-carousel trigger="click" height="500px" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="item in items" :key="item">
        <span :style="item" class="inner" ></span>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="small-pic" style="width:500px">
        <div class="each" v-for="(item,index) in items" :key="item" @click="focus(index)">
            <i class="img" :style="item"></i>
        </div>
    </div> -->
  </div>
</template>
<script>
import url from '../../assets/sea.jpg';
import url1 from '../../assets/8.jpg';
import url2 from '../../assets/7.jpg';

export default {
  name: 'slieshow',
  data(){
      return {
        //   url:"../../assets/sea.jpg",
          items:["background-image:url("+url+")","background-image:url("+url1+")","background-image:url("+url2+")"],

      }
  },
  components: {
    
  },
  methods:{
    focus:function(index){
      var len = document.getElementsByClassName("each").length;
      for(var i = 0;i<len;i++){
        document.getElementsByClassName("each")[i].className = "each";
      }
      document.getElementsByClassName("each")[index].className = "each active";
    }
  }
  
}
</script>
<style scpoed>
  .el-carousel {
    overflow: hidden;
  }
  .el-carousel__item  {
    /* color: #475669; */
    /* font-size: 14px; */
    opacity: 0.85;
    /* line-height: 500px; */
    /* margin: 0; */
  }
 .el-carousel__item span {
    width: 100%;
    height: 100%;
    display: block;
    /* margin: 0 0 0 -40px; */
    -webkit-background-size: contain;
    -moz-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
 }
  .small-pic {
    margin: 10px 0 0 0;
    text-align: center;
  }
  .small-pic .each.active {
    -webkit-box-shadow: 0px 3px 8px 0 rgba(255,82,103,0.5);
    box-shadow: 0px 3px 8px 0 rgba(255,82,103,0.5);
    border: 1px solid #ff2741;
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transition: opacity 0.8s ease;
    -moz-transition: opacity 0.8s ease;
    -o-transition: opacity 0.8s ease;
    -ms-transition: opacity 0.8s ease;
    transition: opacity 0.8s ease;
  }
  .small-pic .each {
    width: 40px;
    height: 40px;
    display: inline-block;
    margin: 0 5px 0 0;
    border-radius: 4px;
    opacity: 0.6;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
    filter: alpha(opacity=60);
    -webkit-transition: opacity 0.8s ease;
    -moz-transition: opacity 0.8s ease;
    -o-transition: opacity 0.8s ease;
    -ms-transition: opacity 0.8s ease;
    transition: opacity 0.8s ease;
    cursor: pointer;
  }
  .small-pic .each .img {
    width: 100%;
    height: 100%;
    display: block;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 3px;
  }
  .el-carousel__indicator--horizontal {
    padding: 0;
  }
  .el-carousel__indicators {
    margin: 10px 0 0 0;
  }
  ul {
    text-align: center;
    width: 500px;
  }
  li {
    width: 40px;
    height: 40px;
    display: inline-block;
    margin: 0 5px 0 0;
    border-radius: 4px;
    opacity: 0.6;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
    filter: alpha(opacity=60);
    -webkit-transition: opacity 0.8s ease;
    -moz-transition: opacity 0.8s ease;
    -o-transition: opacity 0.8s ease;
    -ms-transition: opacity 0.8s ease;
    transition: opacity 0.8s ease;
    cursor: pointer;
  }
  .el-carousel__button {
    width: 100%!important;
    height: 100%!important;
    display: inline-block!important;
    -webkit-background-size: cover!important;
    -moz-background-size: cover!important;
    background-size: cover!important;
    background-position: center center!important;
    background-repeat: no-repeat!important;
    border-radius: 3px!important;
    background-image: url("../../assets/sea.jpg")!important;
  }
</style>