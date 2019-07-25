<template>
	<div class="photo">
		<div class="photo-box">
			<img src="../../assets/qq.jpg" class="photos">
		</div>
		<p class="publish-time">{{publishTime}}</p>
	</div>
</template>

<script>

 export default {
	name: "photo",
	data() {
		return{
			publishTime: "2017-6-1"
		}
	}
 }

</script>

<style>
.photo {
	padding: 6px 8px;
	margin: 0 16px;
    margin-bottom: 30px;
	border: 1px solid rgb(184, 180, 180);
	border-radius: 6px;
	width: 150px;
	height: auto;
	float: left;
	box-shadow: 5px 5px 14px rgb(211, 209, 209);
    background-color: rgb(251, 251, 250);
}

.photo-box {
	width: 150px;
	overflow: hidden;
}

.photos {
	height: 180px;
	margin-left: -77px;
	display: block;
}


.publish-time{
	font-size: 14px;
  text-align: center;
  padding-left: 0;
}


</style>