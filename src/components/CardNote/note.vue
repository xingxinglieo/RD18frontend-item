<template>
  <div class="note">
    <div class="note-top">
      <h1 class="title">{{title}}</h1>
    </div>
		<div class="content">
			<p v-for="content in contents" :key="content">{{content}}</p>
		</div>
		<div class="tags bottom-gap-add">
			<div class="operation-block">
				<span class="like">
					<i @click="Like">
						<svg class="icon" aria-hidden="true">
    					<use xlink:href="#icondianzan" v-show="unlike"></use>
							<use xlink:href="#icondianzan-copy" v-show="like"></use>
  					</svg>
					</i>
					<span>{{likeNum}}</span>
				</span>
				<span class="comment">
					<i>
						<svg class="icon" aria-hidden="true">
    					<use xlink:href="#iconpinglun2"></use>
  					</svg>
					</i>
					<span>{{commentNum}}</span>
				</span>
				<span class="star">
					<i @click="Star">
						<svg class="icon" aria-hidden="true">
    					<use xlink:href="#iconshoucang1" v-show="unstar"></use>
							<use xlink:href="#iconshoucang1-copy" v-show="star" style="width:20px;height:20px;"></use>
  					</svg>
					</i>
					<span>{{starNum}}</span>
				</span>
			</div>
			<div class="publish-date">
				<span>发布于 {{addZero}}</span>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'note',
  components:{
    
  },
  data(){
    return{
			title:"一秒get法式刘海🖤你看这个刘海，它又真又假",
			contents:["我简直快要爱死头上这块假刘海了😂恨不得走哪都把它戴上。",
			"",
			"前段时间去探店，想要打扮得意式风情些～就在网上买了个假发，然后自己加工了一下🤣没想到效果还挺好？？分享给你们",
			"先选择适合自己的发色（我买了深棕色和黑色。因为没有染过头发，所以黑色更自然些）",
			],
			likeNum:0,
			commentNum:0,
			starNum:0,
			unstar:true,
			star:false,
			unlike:true,
			like:false,
			uncomment:true,
			comment:false,
			mouth:3,
			date:12
    }
	},
	methods:{
		Like:function(){
			this.like = !this.like;
			this.unlike = !this.unlike;
			if(this.unlike === true){
				this.likeNum -= 1;
			} else {
				this.likeNum += 1;
			}
		},
		Star:function(){
			this.star = !this.star;
			this.unstar = !this.star;
			if(this.unstar === true){
				this.starNum -= 1;
			} else {
				this.starNum += 1;
			}
		},
		
	},
	computed:{
		addZero:function(){
			if(this.mouth<10){
				this.mouth = "0" + this.mouth;
			}
			if(this.date<10){
				this.date = "0" + this.date;
			}
			return this.mouth + "-" +this.date
		}
	}
}
</script>

<style scoped>
.note-top {
	margin: 20px 0;
}
.note-top .title {
	font-size: 24px;
	font-weight: 500;
	overflow: hidden;
}
.note .content p {
  margin: 20px 0;
}
.card-note .bottom-gap-add {
	margin: 0 0 30px 0;
}
.tags {
	font-size: 16px;
	color: #555;
}
.operation-block {
	margin-top: 30px;
}
.tags .like {
	color: #555;
	vertical-align: middle;
}
.tags .comment,
.tags .star {
	color: #555;
  margin-left: 25px;
	vertical-align: middle;
}
.tags .like span,
.tags .comment span,
.tags .star span {
	display: inline-block;
  margin: 0 0 0 3px;
}
.publish-date {
	margin-top: 30px;
	color: #999;
}
</style>