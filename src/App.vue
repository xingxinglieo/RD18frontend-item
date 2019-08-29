<template>
		<div id="app" @click="$store.commit('closeLoginContain');">
			<router-view></router-view>
			<login-contain></login-contain>
		</div>
</template>
 
<script>
	import logincontain from '@/components/Login/LoginContain';
	export default {
		name: 'App',
		components:{
			'login-contain':logincontain,
		},
		methods:{
			
		},
		data() {
			return {

			}
		},
	}
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}
</style>