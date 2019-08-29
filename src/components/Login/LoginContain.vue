<!-- 这是登录组件的父组件 布局框 -->
<template>
	<transition name="el-fade-in">
		<div id="outter" v-if="show" @click.stop="">
			<el-container style="flex-direction: column;padding: 0 25px 20px;">
				<div><i class="el-icon-close" @click="closeLoginContain"></i></div>
				<div class="SignHeader">
					<h1>倾旅</h1>
					<!-- <Logo></Logo> -->
					<h2 id="description">
						TravelTalking, 我的旅行印记
					</h2>
				</div>
				<component :is="trag"></component>
			</el-container>
			<div id="tragger">
				<span @click="tragger">{{tra_content}}</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import login from "./login"
	import register from "./register"
	import Logo from "../Logo"
	export default {
		components: {
			'login': login,
			'register': register,
			'Logo': Logo,
		},
		data: function() {
			return {
				trag: "login",
				tra_content: "没有账号?注册",
			}
		},
		methods: {
			tragger: function() {
				if (this.trag == "login") {
					this.trag = "register";
					this.tra_content = "已有账号?登录";
				} else {
					this.trag = "login";
					this.tra_content = "没有账号?注册";
				}
			},
			closeLoginContain(){
				this.$store.commit('closeLoginContain');
			},
			
		},
		computed: {
			show() {
				return this.$store.state.login.showLoginContain && (!this.$store.state.login.loginState)
			},
		},
	}
</script>
<style lang="scss" scoped="scoped">
	$red:#e74b37;
	@import url("http://cdn.repository.webfont.com/webfonts/nomal/131834/19673/5d373537f629d80ef05e7fa8.css");

	#outter {
		width: 38%;
		min-width: 300px;
		max-width: 420px;
		background-image: url(../../assets/background.jpg);
		background-size: cover;
		position: fixed;
		z-index: 2000;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		box-shadow: #2C3E50;
		background-color: white;
	}

	.SignHeader {
		padding: 10px 0px 5px 0px;

		#logo {
			margin: 0px !important;
		}

		h1 {
			margin-top: -20px;
			font-size: 60px;
		}

		;

		h2 {
			line-height: 45px;
		}

		;

		h1,
		h2 {
			color: $red;
			text-align: center;
			font-family: 'jdzhonyuanjian1ac4d12a5d202fa';


		}
	}

	#tragger {
		background-color: #f6f6f6;
		height: 45px;
		line-height: 45px;
		border-top: 1px solid #ebebeb;
		font-size: 12px;
		color: darkred;
		text-align: center;

		span {
			&:hover {
				cursor: pointer;
			}
		}
	}

	.el-icon-close {
		float: right;
		margin-right: -20px;

		&:hover {
			cursor: pointer;
		}

		&:before {
			font-size: 25px;
		}
	}
</style>
