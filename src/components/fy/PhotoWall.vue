<template>
	<div class="photo-wall">
        <div id="pags">
            <ul class="pag-box">
                <li class="pag" :key="'travelTalk'"><span class="pag-head"></span>游记</li>
                <li class="pag" v-for="item in items" :key="item">
                    <span class="pag-head"></span>
                    {{item}}
                </li>
            </ul>
        </div>
		<div id="photos">
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
            <photo></photo>
        </div>
	</div>
</template>

<script>
import Photo from './Photo'

 export default {
	name: "photo-wall",
	data() {
		return{
			items: {
                "meishi": "日本",
                "meijing": "巴啦啦",
                "jianzhu": "wsl",
                "fengsu": "妈耶"
            }
		}
    },
    components: {
        'photo': Photo
    }
 }

</script>

<style lang="scss" scoped>

#photos {
    float: left;
    width: 650px;
    height: 1400px;
    background: #ffffff;
    padding: 40px 15px 80px;
    overflow: hidden;

}

#pags {
    float: right;
}

.photo-wall{
	margin: 0 auto;
	padding: 40px 0 40px 60px;
	width: 860px;
	height: 1520px;
	background: #f9faf3;
}

.photo-wall :after {
    content: "";
    clear: both;
    display: block;
}

.pag-box {
    list-style: none;
}

.pag {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 40px;
    background-color: #e74b37;
    color: #f9faf3;
    margin: 5px 0 35px;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    letter-spacing: 5px;
}

.pag-head {
    display: inline-block;
    position: absolute;
    left: -40px;
    width: 0;
    height: 0;
    border-right: 20px solid #e74b37;
    border-left: 20px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}

.pag-publish {
   width: 80px;
   height: 40px;
   padding: 0 0 0 10px;
   line-height: 40px;
   font-size: 16px;
   color: #f9faf3;
   background-color: #e74b37;
   border-radius: 10px;
   margin: 5px 0 35px;
}

</style>