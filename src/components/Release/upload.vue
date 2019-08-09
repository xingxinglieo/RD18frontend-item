<template>
<div
    style="position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: rgba(0,0,0,.5);
    "
  >
  <!-- 遮盖层 -->
  <component :is="upload"></component>
</div>    
</template>
<script>
import content from "./uploadcontent"
import onlyphoto from "./onlyphoto"
export default {
    components:{
        'mycontent': content,
        'myphoto': onlyphoto,
    },
    data() {
        return{
            upload: "mycontent",
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

