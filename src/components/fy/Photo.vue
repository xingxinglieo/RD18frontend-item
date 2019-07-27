<template>
	<div class="photo">
		<div class="photo-box">
			<img src="../../assets/qq.jpg" class="photos">
			<div class="remarks" v-on:mouseover="displayBlock()" v-on:mouseout="displayNone()">
				<div class="remark" :title="content">{{content}}</div>
			</div>
		</div>
		<p class="publish-time">{{publishTime}}</p>
	</div>
</template>

<script>

import $ from 'jquery'

 export default {
	name: "photo",
	data() {
		return{
			publishTime: "2017-6-1",
			content: "hello,body,say:hey!!!!!!!!!!!!!!!!!!!!"
		}
	},
	methods: {
		displayBlock() {
			$('.remarks').css("display","block");
		},
		displayNone() {
			$('.remarks').css("display","none");
		}
	}
 }

</script>

<style lang="scss" scoped>

.photo {
	margin: 0 16px;
  margin-bottom: 30px;
	border: 1px solid rgb(184, 180, 180);
	height: auto;
	float: left;
  background-color: rgb(251, 251, 250);
}

.photo-box {
	position: relative;
	width: 180px;
	height: 120px;
	overflow: hidden;
}

.photos {
	height: 160px;
	margin-left: -32px;
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

.remarks {
	display: block;
	position: absolute;
	width: 100%;
	bottom: 0;
	z-index: 1;
	background-image: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,.6));
}

.remark {
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #dfdfdf;
	padding: 8px 10px 0;
	font-size: 14px;
	height: 20px;
	width: 95%;
}
</style>