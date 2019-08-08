<template>
  <div class="bottom-gap">
    <div class="panel-card">
      <h3>相关笔记</h3>
      <div class="panel-list" style="max-height:400px;overflow-y:auto">
        <a v-for="panel in panels" :key="panel.content"  class="inner">
          <div class="picture">
            <span class="photo"></span>
          </div>
          <div class="content">
            <p class="desc">{{panel.content}}</p>
            <div class="info" >
              <i @click="Like(panel)">
						    <svg class="icon" aria-hidden="true">
    					    <use xlink:href="#icondianzan" v-show="panel.unlike"></use>
							    <use xlink:href="#icondianzan-copy" v-show="panel.like"></use>
  					    </svg>
					    </i>
              <span class="counts">{{panel.likeNum}}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel-gap',
  data(){
    return{
      panels:[
        {content:"倒计时降低哦啊激动 i 激动啊睡觉哦大家哦撒娇啊都是大啊的撒上冬季哦",likeNum:0,unlike:true,like:false},
        {content:"山东科技啊好久开会打瞌睡的快",likeNum:0,unlike:true,like:false},
        {content:3,likeNum:0,unlike:true,like:false},
        {content:5,likeNum:0,unlike:true,like:false},
        {content:6,likeNum:0,unlike:true,like:false},
        {content:7,likeNum:0,unlike:true,like:false},
        {content:8,likeNum:0,unlike:true,like:false},
        {content:9,likeNum:0,unlike:true,like:false},
        {content:10,likeNum:0,unlike:true,like:false},
        {content:1,likeNum:0,unlike:true,like:false},
        {content:2,likeNum:0,unlike:true,like:false}
      ],
    }
  },
  methods:{
    // Like:function(index){
    //   this.i = index;
		// 	this.like = !this.like;
		// 	this.unlike = !this.unlike;
		// 	if(this.unlike === true){
		// 		this.likeNum -= 1;
		// 	} else {
		// 		this.likeNum += 1;
		// 	}
    // }
    Like:function(panel){
      // this.i = index;
      // console.log(panel.like)
			panel.like = !panel.like;
			panel.unlike = !panel.unlike;
			if(panel.unlike === true){
				panel.likeNum -= 1;
			} else {
				panel.likeNum += 1;
			}
		}
  }
}
</script>

<style scoped>  
.panel-card {
  width: 320px;
  border: 1px solid #eee;
  border-radius: 4PX;
  cursor: pointer;
  background: #fff;
  padding-bottom: 9px;
}
.panel-card h3 {
  font-size: 16px;
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid #eee;
  font-weight: 500;
}
.inner {
  width: 280px;
  height: 80px;
  margin: 10px 20px;
  display: block;
  color: #555;
}
.inner:hover {
  color: #ff2741;
}
.inner .picture {
  position: relative;
  margin: 0 10px 0 0;
  overflow: hidden;
  float: left;
  background: #f8f8fa;
  width: 80px;
  height: 80px;
  border-radius: 4px;
}
.inner .picture .photo {
  display: block;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
.inner .content {
  float: left;
  width: 190px;
  margin: 3px 0 0 0;
}
.desc {
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  margin: 0;
}
.info {
  margin: 15px 0 0 0;
  color: #999;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -moz-box-pack: start;
  -o-box-pack: start;
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 15px;
}
.info .counts {
  margin-left: 8px;
  color: #555;
  line-height: 15px;
}
</style>