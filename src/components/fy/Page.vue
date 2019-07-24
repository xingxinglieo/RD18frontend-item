<template>
	<div class="page">
		<person></person>
		<div class="photo-wall">
			<photo></photo>
			<photo></photo>
			<photo></photo>
			<photo></photo>
			<photo></photo>
		</div>
	</div>
</template>


<script>

import Photo from './Photo'
import Person from './Person'

 export default {
	name: "page",
	components: {
		'photo': Photo,
		'person': Person
	}
 }

</script>


<style>
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
	border: 0.5px solid #dedede;
}
</style>