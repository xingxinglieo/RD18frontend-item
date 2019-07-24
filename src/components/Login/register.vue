<!-- 这是注册组件的 -->
<template>
	<div>
		<form>
			<el-popover placement="right" trigger="focus" :disabled="e_vis">
				<el-input placeholder="请输入邮箱" @change="hasReg" v-model="email" slot="reference">
				</el-input>
				<span v-if="!e_vis"><i class="el-icon-warning-outline" slot="reference"></i> 邮箱格式不正确</span>
				<i v-else-if="isReg" class="el-icon-warning-outline" slot="reference">用户已注册</i>
				<i v-else  class="el-icon-check" slot="reference"></i>
			</el-popover>

			<el-popover placement="right" width="120" trigger="focus" :disabled="p_vis">
				<el-input placeholder="请输入密码" v-model="password" show-password slot="reference">
				</el-input>
				<i v-if="p_vis" class="el-icon-check" slot="reference"></i>

				<span v-if="!p_vis"><i class="el-icon-warning-outline"></i> 长度为8-16个字符,必须包含字母,数字,符号中的两种</span>
			</el-popover>
			<el-popover placement="right" trigger="click">
				<el-button type="primary" plain slot="reference">注册</el-button>
				<span><i class="el-icon-warning-outline"></i>邮箱或者密码格式错误</span>
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
				isReg: false,
			}
		},
		methods: {
			hasReg(){
				this.$axios.get('https://www.apiopen.top/journalismApi')
				.then(data=>{
					console.log(this);
					if(data.result==="fail"){
						this.isReg = true;
					}
					else{
						this.isReg = false;
					}
				})
			},
		},
		computed: {
			e_vis: function() {
				return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.email)
			},
			p_vis: function() {
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

	.el-popover {
		min-width: 0px !important;
	}

	.el-icon-check {
		color: #67C23A;
	}

	.el-icon-warning-outline {
		color: #F56C6C;
	}

	.el-button {
		width: 100%;
	}

	.el-input__suffix-inner {
		display: none;
	}
</style>
