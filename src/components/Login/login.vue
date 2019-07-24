<template>
	<div>
		<form>
			<el-popover placement="right"  trigger="focus" :disabled="e_vis">
				<el-input placeholder="请输入邮箱" v-model="email" slot="reference">
				</el-input>
				<span><i class="el-icon-warning-outline"></i> 邮箱格式不正确</span>
			</el-popover>
			<el-input placeholder="请输入密码" v-model="password" show-password slot="reference"></el-input>
			<el-popover placement="right" trigger="click">
				<el-button type="primary" plain slot="reference">登录</el-button>
				<span><i class="el-icon-warning-outline"></i>邮箱或者密码错误</span>
			</el-popover>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
			}
		},
		methods: {
			
		},
		computed: {
			e_vis:function() {
				return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.email)
			},
			p_vis:function() {
				return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}/.test(this.password)
			},
			
		},


	}
</script>

<style lang="scss" scoped="scoped">
	.el-input,
	.el-button {
		margin-top: 10px;
	}
	.el-popover{
		min-width: 0;
	}
	.el-icon-check{
		color: #67C23A;
	}
	.el-icon-warning-outline{
		color: #F56C6C;
	}
	.el-button {
		width: 100%;
	}
	.el-input__suffix-inner {
		display: none;
	}
</style>