<template>
	<div class="photo">
		<div class="photo-main-box"  v-for="(item,index) in posts" :key="item.id">
			<div class="photo-box" v-on:mouseover="displayBlock(index)" v-on:mouseout="displayNone(index)">
				<div class="revise-main none">
					<div class="revise-down" @click="item.show = !item.show,revise(item.show,index)">
						<svg class="icon" aria-hidden="true"> 
							<use xlink:href="#iconxiala"></use>
						</svg>
					</div>
					<ul class="revise-box none">
						<li class="revise-name" @click="reviseName()">修改名字</li>
						<li class="revise-note" @click="reviseNote()">修改备注</li>
						<li class="revise-tab" @click="reviseTab()">修改标签</li>
					</ul>
				</div>
				<div class="photos-box">
					<img :src="item.photoUrl" class="photos" alt="item.name" :id="item.id">
				</div>
				<div class="remarks none">
					<div class="remark-name" :title="item.name">{{item.name}}</div>
					<div class="remark-tab">
						<svg class="icon" aria-hidden="true"> 
      						<use xlink:href="#iconbiaoqian3-copy"></use>
    					</svg>
						{{item.tabId}}
					</div>
					<div class="remark" :title="item.content">{{item.note}}</div>
				</div> 
			</div>
			<p class="publish-time">{{item.depositTime}}</p>
		</div>
	</div>
</template>

<script>

import $ from 'jquery'
import qq from '../../assets/qq.jpg'
import qq2 from '../../assets/qq2.jpg'

 export default {
	name: "photo",
	data() {
		return {
			posts: [
				{"id": "222",
				"photoUrl": "22222",
				"userId": "2222",
				"note": "2222",
				"depositTime": "error",
				"tabId": "222",
				"name": "2222",
				"show":false}
			]
		}
	},
	created() {
		this.drawPhoto();
	},
	methods: {
		drawPhoto() {
			this.$axios.get(
					'/photoWall/tab/photos',{
						params: {
							tabId:1,
							num:1,
							size:24
						},
						timeout:50000
					})
				.then(data => {
					if(data.message === 'success') {
						this.posts = data.message
					}else {
						console.log("error");
					}
			})

		},
		displayBlock:function(index) {
			var count1 = document.getElementsByClassName('remarks')[index];
			var revise1 = document.getElementsByClassName('revise-main')[index];
			count1.classList.remove('none');
			revise1.classList.remove('none');
		},
		displayNone:function(index) {
			var count2 = document.getElementsByClassName('remarks')[index];
			var revise2 = document.getElementsByClassName('revise-main')[index];
			count2.classList.add('none');
			revise2.classList.add('none');
		},
		revise:function(jud,index) {
			var reviseMessage = document.getElementsByClassName('revise-box')[index];
			if(jud){
				reviseMessage.classList.remove('none');
			}else{
				reviseMessage.classList.add('none');
			}
		}
	}
 }

</script>

<style lang="scss" scoped>

.photo {
	float: left;
    width: 650px;
    height: 1400px;
    background: #ffffff;
    padding: 40px 15px 80px;
    overflow: hidden;
	-moz-user-select: none; /*火狐*/
	-webkit-user-select: none; /*webkit浏览器*/
	-ms-user-select: none; /*IE10*/
	-khtml-user-select: none; /*早期浏览器*/
	user-select: none;
}

.photo-main-box {
	margin: 0 16px;
  	margin-bottom: 30px;
	border: 1px solid rgb(184, 180, 180);
	height: auto;
	float: left;
  	background-color: rgb(251, 251, 250);
}


.photo-box {
	position: relative;
	width: 182px;
	height: 120px;
}

.photos-box {
	position: relative;
	overflow: hidden;
	height: 120px;
}

.photos {
	height: 160px;
	margin-left: -31px;
	margin-top: -20px;
	display: block;
}


.publish-time{
	height: 30px;
	line-height: 30px;
	font-size: 12px;
  	text-align: center;
 	padding-left: 0;
}

.none {
	display: none;
}

.remarks {
	position: absolute;
	width: 100%;
	bottom: 0;
	z-index: 1;
	background-image: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,.6));
}

.remark-tab {
	position: absolute;
	color: #dfdfdf;
	font-size: 11px;
	height: 20px;
	width: 43%;
	right: 4px;
	top: 8px;
	text-align: right;
}

.remark-name {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #dfdfdf;
	padding: 8px 0 0 10px;
	font-size: 18px;
	line-height: 20px;
	height: 20px;
	width: 52%;
}

.remark {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #dfdfdf;
	padding: 0 10px;
	font-size: 14px;
	height: 20px;
	width: 95%;
}

.revise-main {
	position: absolute;
	top: 3px;
	right: 5px;
	z-index: 10;
}

.revise-down {
	cursor: pointer;
	position: relative;
    z-index: 50;
    display: block;
    width: 20px;
    height: 20px;
	position: relative;
    z-index: 50;
    display: block;
    width: 20px;
    height: 20px;
}

.revise-box {
	position: absolute;
    top: 21px;
    right: 0;
    width: 130px;
    background: #fff;
    z-index: 49;
    border-radius: 4px;
    border: 1px solid #D6D6D6;
    box-shadow: 0 0 2px rgba(0,0,0,.15);
}

.revise-name,
.revise-note,
.revise-tab {
	cursor: pointer;
	color: #262626;
    display: block;
    height: 18px;
    line-height: 18px;
    padding: 8px 0 8px 12px;
}

.revise:hover {
	background: rgb(186, 210, 233);
}


</style>