<template>
	<div class="person">
		<img src="../../assets/qq2.jpg" class="back">
		<div class="person-data">
			<img src="../../assets/head.jpeg" class="head">
			<div class="main-material">
			<h3 class="name">喜之郎</h3>
			<p class="material sign">回家是最好的礼物</p>
			<p class="material">
						<svg class="icon" aria-hidden="true"> 
					<use xlink:href="#icondidian"></use>
					</svg>
						地址：广州
					</p>
			<p class="material">
						<svg class="icon" aria-hidden="true"> 
					<use xlink:href="#iconyouxiang"></use>
					</svg>
						邮箱：123123@123.com
					</p>
			</div>
			<div class="publish">
			<div class="publish-travel">
				<svg class="icon" aria-hidden="true"> 
      				<use xlink:href="#iconyouxi"></use>
    			</svg>
				发布游记
			</div>
			<div class="publish-photo">
				<svg class="icon" aria-hidden="true"> 
      				<use xlink:href="#icontianjiazhaopian"></use>
    			</svg>
				发布照片
			</div>
		</div>
		</div>
	</div>
</template>

<script>

 export default {
	name: "person",
	method: {
		more() {

		}
	}
 }

</script>

 <style lang="scss" scoped>

.person {
	position: relative;
	overflow: hidden;
	width: 100%;
}

.back {
	width: 100%;
	min-height: 100%;
	position: absolute;
	z-index: 0;
}

.person-data {
	position: relative;
	width: 800px;
	height: 250px;
	padding: 30px 60px;
	background-color: rgba(256, 256, 256, .6);
	z-index: 1;
	margin: 145px auto 0;
	border-radius: 10px 10px 0 0;
}

.head {
	margin-top: 30px;
	width: 180px;
	height: 180px;
	border: 2px solid #f9faf3;
	border-radius: 100%;
    float: left;
}

.main-material {
    float: left;
    margin: 30px;
}

.material {
    color: rgb(79, 78, 78);
    font-size: 15px;
	margin: 10px 0;
}

.material.sign {
  font-size: 17px;
}

.name {
    color: #222221; 
    font-size: 22px;
	margin: 20px 0 24px;
}

.publish {
	float: right;
	margin: 75px 30px;
}

.publish-travel,
.publish-photo {
	cursor: pointer;
	font-size: 22px;
	color: rgb(68, 68, 68);
	margin: 20px;
}

</style>