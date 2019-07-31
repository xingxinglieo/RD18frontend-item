<!-- 这是注册组件的 -->
<template>
	<div>
		<form>
			<el-popover placement="right" trigger="focus" :disabled="isEmail">
				<el-input placeholder="请输入邮箱" v-model="email" slot="reference">
				</el-input>
				<!-- 
				1.检验邮箱格式是否正确
				 -->

				<span v-if="!isEmail"><i class="el-icon-warning-outline"></i> 邮箱格式不正确</span>
				<div class="blank" slot="reference">
					<transition name="el-fade-in">
						<div v-if="isEmail">
							<i class="transition-box el-icon-check"></i>
						</div>
					</transition>
				</div>
				

			</el-popover>

			<el-popover placement="right" width="120" trigger="focus" :disabled="isPassword">
				<el-input placeholder="请输入密码" v-model="password" show-password slot="reference">
				</el-input>
				<div class="blank" slot="reference">
					<transition name="el-fade-in">
						<div v-if="isPassword">
							<i class="transition-box el-icon-check"></i>
						</div>
					</transition>
				</div>
				<span v-if="!isPassword"><i class="el-icon-warning-outline"></i> 长度为8-18个字符,必须包含字母,数字,符号中的两种</span>
			</el-popover>
			<el-input placeholder="请确认密码" v-model="confirm" show-password>
			</el-input>
			<div class="blank">
				<transition name="el-fade-in">
					<div v-if="confirm!==''">
						<div style="height: 18px;position:relative;">
							<transition name="el-fade-in">
								<i v-if="isConfirm" class="el-icon-check" style="position: absolute;"></i>
								<span v-else class="transition-box" style="color: darkred;font-size: 14px;position:absolute;"><i class="el-icon-warning-outline"></i>
									两次密码不相同</span>
							</transition>
						</div>
					</div>
				</transition>
			</div>
			
			<!-- 三个框有一个不满足 button就禁用
					点击后开启节流,数据返回才解禁
				 -->
			<el-button type="primary" plain slot="reference" @click="sendRegisterRequest" :disabled="!allRight || throttle">注册</el-button>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				confirm: '',
				throttle: false, //节流 , 防止用户多次点击注册按钮
			}
		},
		methods: {
			sendRegisterRequest() {
				this.throttle = true;
				this.$axios.post(
						'/user/register', {
							params: {
								userName: this.email,
								password: this.password,
							},
						}
					)
					.then(data => {
						this.throttle = false;
						if (data.result === 'success') {
							this.$message({
								message: '注册成功',
								type: 'success',
								center: true,

							})

						} else {
							this.$message({
								message: '注册失败 , 此邮箱已注册',
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
			isPassword: function() {
				return /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(this.password)
			},
			isConfirm: function() {
				return this.password === this.confirm;
			},
			allRight: function() {
				return this.isEmail && this.isPassword && this.isConfirm;
			},
		},


	}
</script>

<style lang="scss" scoped="scoped">
	.blank{
		height: 20px
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
