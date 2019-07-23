<template>
	<div id="outter">
		<el-container style="flex-direction: column;padding: 0 20px 20px;">
			<div><i class="el-icon-close"></i></div>
			<div class="SignHeader">
				<Logo></Logo>
				<h2 id="description">
					倾旅,我的旅行印记
				</h2>
			</div>
			<component :is="trag"></component>
		</el-container>
		<div id="tragger">
			<span @click="tragger">{{tra_content}}</span>
		</div>
	</div>

</template>

<script>
	import login from "./login"
	import register from "./register"
	import Logo from "../Logo"
	export default {
		components: {
			login,
			register,
			Logo
		},
		data: function() {
			return {
				trag: "login",
				tra_content: "没有账号?注册"
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
			}
		},

	}
</script>
<style lang="scss" scoped="scoped">
	$red:#e74b37;
	@import url("http://cdn.repository.webfont.com/webfonts/nomal/131834/19673/5d35bbb7f629d813c8601e7a.css");

	#outter {
		width: 420px;
		position: fixed;
		top: 100px;
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

		h2 {
			color: $red;
			text-align: center;
			line-height: 30px;
			font-family: 'jdzhonyuanjian1abf0e8c90202fa';
		}
	}

	#tragger {
		justify-content: center;
		background-color: #f6f6f6;
		height: 45px;
		line-height: 45px;
		border-top: 1px solid #ebebeb;
		font-size: 12px;
		color: darkred;

		span {
			&:hover {
				cursor: pointer;
			}
		}
	}

	.el-icon-close {
		float: right;
		margin: 5px -20px 0 0;

		&:hover {
			cursor: pointer;
		}

		&:before {
			font-size: 25px;
		}
	}
</style>
