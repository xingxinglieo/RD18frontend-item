<template>
	<div class="naviga">
		<div class="naviga-box">
            <div class="naviga-tab">
                <span  v-bind:class="{'tab-a':isA1,'tab-b':isB1}" v-on:click="change(1)">游记史</span>
                <span  v-bind:class="{'tab-a':isA2,'tab-b':isB2}" v-on:click="change(2)">照片墙</span>
            </div>
        </div>
	</div>
</template>

<script>

 export default {
    name: "naviga",
    data() {
        return {
            isA1: false,
            isB1: true,
            isA2: true,
            isB2: false
        }
    },
    methods: {
        change(num) {
            if(num == 1){
                this.isA1 = false;
                this.isB1 = true;
                this.isA2 = true;
                this.isB2 = false;
            }else {
                this.isA2 = false;
                this.isB2 = true;
                this.isA1 = true;
                this.isB1 = false;
            }
        }
    }
 }

</script>

<style lang="scss" scoped>

.naviga {
    width: 920px;
    margin: 0 auto;
    z-index: 10;
    background-color: #f9faf3;
}
.naviga-box {
    background-color: #f9faf3;
    width: 100%;
}

.naviga-tab {
    margin: 0 auto;
    height: 50px;
    width: 800px;
    padding: 4px 0 12px;
    text-align: center;
    border-bottom: 1px solid rgb(226, 226, 226);
}
.tab-a {
    display: inline-block;
    line-height: 50px;
    margin: 0 90px;
    padding: 0 10px;
    font-size: 18px;
    color: rgb(62, 62, 61);
    cursor: pointer;
}

.tab-b {
    display: inline-block;
    line-height: 50px;
    margin: 0 90px;
    padding: 0 10px;
    font-size: 18px;
    color: #000;
    cursor: pointer;
    border-bottom: 2px solid #e74b37;
}
</style>