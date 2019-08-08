<template>
  <div class="author-item bottom-gap">
    <h3 class="title">笔记作者</h3>
		<span class="author-info">
			<div class="left">
				<div class="left-img">
					<img src="../../assets/sea.jpg" alt="s" style="width:50px;height:50px;">
				</div>
			</div>
			<div class="right" style="width:190px;">
				<h6 class="name" style="font-size:16px;">
					<span class="name-detail">{{author}}</span>
				</h6>
				<p class="brief" style="font-size:14px;">{{brief}}</p>
			</div>
		</span>
		<div class="card-info">
			<div class="inner">
				<span>笔记</span>
				<span class="note">{{noteNum}}</span>
			</div>
			<div class="inner">
				<span>粉丝</span>
				<span class="fans">{{fansNum}}</span>
			</div>
			<div class="inner">
				<span>获赞与收藏</span>
				<span class="collect">{{collectNum}}</span>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'authorItem',
  components:{
  },
  data(){
    return{
			author:"卷毛",
			brief:"我来自揭阳，喜欢睡觉",
			noteNum:2,
			fansNum:"1w",
			collectNum:"102w"
    }
  }
}
</script>

<style>
.card-note .bottom-gap {
  margin: 0 0 20px 0;
}
.author-item {
	width: 320px;
  height: 176px;
  border: 1px solid #eee;
  border-radius: 4px;
  color: #000;
  font-size: 14px;
  background: #fff;
}
.author-item .title {
	font-weight: 500;
  font-size: 16px;
  padding: 10px 0 10px 20px;
  margin: 0;
  border-bottom: 1px solid #eee;
}
.author-item .author-info {
	margin: 10px 20px 0 20px;
  padding: 0 0 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
.author-info {
	margin: 9px 11px 0;
  padding: 0 0 10px 0;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  color: #333;
  display: block;
}
.author-info .left {
	position: relative;
	float: left;
}
.author-info .left .left-img img {
	border-radius: 50%;
}
.author-info .right {
	float: left;
  margin: 2px 0 0 15px;
}
.author-info .right .name {
	margin: 3px 0 0 0;
  font-weight: 500;
  vertical-align: middle;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.author-info .right .name .name-detail {
	display: inline-block;
}
.author-info .brief {
	color: #999;
  margin: 4px 0 0 0;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.author-item .card-info {
	overflow: hidden;
  margin: 8px 20px;
}
.author-item .card-info .inner {
	float: left;
  color: #999;
  width: 86px;
  font-size: 14px;
  margin: 0 3px;
}
.author-item .card-info .inner span {
	display: block;
  line-height: 20px;
}
.author-item .card-info .inner .note,
.author-item .card-info .inner .fans,
.author-item .card-info .inner .collect {
	color: #4f4f4f;
  font-weight: 500;
}
</style>