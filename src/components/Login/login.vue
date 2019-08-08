<template>
	<div>
		<form>
			<el-popover placement="right" trigger="focus" :disabled="isEmail">
				<el-input placeholder="请输入邮箱" v-model="email" slot="reference">
				</el-input>
				<span><i class="el-icon-warning-outline"></i> 邮箱格式不正确</span>
			</el-popover>
			<div class="blank"></div>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<div class="blank"></div>
			<el-popover placement="right" trigger="focus" :disabled="isVerify">
				<el-input placeholder="请输入验证码" v-model="verifyCode" style="width: 33%;" slot="reference"></el-input>
				<span><i class="el-icon-warning-outline"></i> 请输入验证码</span>
			</el-popover>
			<div class="blank"></div>
			<el-popover placement="right" trigger="hover" :disabled="isVerify&&isEmail">
				<span><i class="el-icon-warning-outline"></i> 请检查邮箱格式或输入验证码</span>
				<el-button type="primary" plain slot="reference" @click="sendLoginRequest" :disabled="throttle">登录</el-button>
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
				verifyCode: '',
				throttle: false, //节流 , 防止用户多次点击注册按钮

			}
		},
		methods: {
			sendLoginRequest() {
				if (!this.isVerify || !this.isEmail) {
					this.$message({
						message: '请检查邮箱格式或输入验证码',
						type: 'error',
						center: true,
						duration: 1500,
					})
					return;

				}
				this.throttle = true;
				this.$axios.post(
						'http://47.112.212.177:80/qinglv/user/login', {
							params: {
								userName: this.email,
								password: this.password,
								verifyCode: this.verifyCode,
							},
						}
					)
					.then(data => {
						this.throttle = false;
						if (data.result === 'success') {
							this.$store.commit('changeLoginState');
							this.$store.commit('closeLoginContain');
							this.$message({
								message: '登录成功',
								type: 'success',
								center: true,

							})

						} else {
							this.$message({
								message: '登录失败 , 请检查验证码或者账户密码',
								type: 'error',
								center: true,
								duration: 1500,
							})

						}
					})
					.catch(data => {
						this.throttle = false;
						this.$message({
							message: '连接失败 , 请检查网络或者联系管理员',
							type: 'error',
							center: true,
							duration: 1500,
						})
					})
			},

		},
		computed: {
			isEmail: function() {
				return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.email)
			},
			isVerify: function() {
				return this.verifyCode.length === 4;
			}
		},


	}
</script>

<style lang="scss" scoped="scoped">
	.blank{
		height: 20px
	}
	.el-popover {
		min-width: 0;
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
