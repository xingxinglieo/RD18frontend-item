<template>
	<div class="publish-photo">
		<div class="publish-box">
            <div class="publish-box-title">发布图片</div>
            <form>
                <div class="input-fill-box">
                    <input type="text" autocomplete="off" placeholder="图片名字" class="input-fill" maxlength="20">
                    <span class="cue">（字数限制在20个字以内）</span>
                </div>
                <div class="input-photo-box">
                    <input class="input-photo" type="file" multiple accept="image/jpeg,image/png,image/bmp,image/gif">
                </div>
            </form>
        </div>
	</div>
</template>

<script>

 export default {
	name: "publish-photo",
	data() {
		return{
		}
	}
 }

</script>

<style lang="scss" scoped>
.publish-box {
    background-color: #fff;
    margin:0 auto;
    border: 1px solid #a5a1a1;
    border-radius: 10px;
    width: 720px;
    height: 400px;
    padding: 40px;
}

.publish-box-title {
    font-size: 20px;
    width: 300px;
    padding: 0 0 10px 0;
    border-bottom: 2px solid #e74b37;
    color: #e74b37;
    font-weight: 600;

}

.input-fill-box {
    margin: 30px 0;
    width: 100%;
}

.input-fill {
    width: 268px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-appearance: none;
    background-image: none;
    outline: none;
    height: 40px;
    line-height: 40px;
    border: 1px solid #e74b37;
    border-radius: 4px;
    color: #444444;
    padding: 0 15px;
}

.input-fill:focus {
    outline: none;
    border: 1.2px solid #e74b37;
}

.cue {
    color: #f79588;
}

::placeholder{
	color: #b8b5b5;
	opacity: 1;
}

.input-photo-box {
    background:  url("../../assets/add.jpg");
    background-size: 100% 100%;
    text-align: center;
    width: 148px;
    height: 148px;
    border: none;
    overflow: hidden;
    position: relative;
}

.input-photo {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
}

</style>