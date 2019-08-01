<template>
	<div>
		<!-- 
		下面包含props 用v-on 将父方法传给子组件
		 -->
		<el-upload action="" list-type="picture-card" 
		 :on-preview="handlePictureCardPreview"
		 :on-remove="handleRemove"
		 :auto-upload= "noAuto"
		 :multiple="true"
		 >
		<i class="el-icon-plus"></i>
		</el-upload>
		<!-- 
		下面这个是用来展示放大图的 
		 -->
		 
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="倾旅">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				noAuto:false,
			};
		},
		methods: {
			handleRemove(file, fileList) {
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;//把文件的blob url 传给data
				this.dialogVisible = true;
			},
			log(){
				 console.log(this.$children[0].uploadFiles[0].raw); //记得是raw里面的
			}
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$red:#e74b37;
</style>
