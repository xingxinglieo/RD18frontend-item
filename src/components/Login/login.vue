<template>
	<div>
		<form>
			<el-input placeholder="请输入邮箱" v-model="email">
			</el-input>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<el-button type="primary" plain>登录</el-button>
		</form>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				email:'',
				password:'',
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
.el-input,.el-button{
		margin-top:10px;
	}
	
.el-button{
		width: 100%;
	}
	
</style>