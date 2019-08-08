<template>
	<div class="page">
		<person></person>
		<naviga></naviga>
		<photo-wall></photo-wall>
	</div>
</template>


<script>

import Photo from './Photo'
import Person from './Person'
import Naviga from './Naviga'
import PhotoWall from './PhotoWall'

 export default {
	name: "page",
	components: {
		'photo': Photo,
		'person': Person,
		'naviga': Naviga,
		'photo-wall': PhotoWall
	}
 }

</script>


<style lang="scss" scoped="scoped">
#app .page {
	text-align: start;
	background: rgb(186, 210, 233);
	height: 100%;
	z-index: -77;
}

.page:after {
	content: "";
	clear: both;
	display: block;
}

.photo-wall{
	margin: 0 auto;
	padding: 40px 60px;
	width: 800px;
	height: 880px;
	background: #f9faf3;
}
</style>