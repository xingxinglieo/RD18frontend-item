<template>
<!-- 主界面下方 -->
  <div class="programa">
    <navigation></navigation>
    <waterfall></waterfall>
  </div>
</template>

<script>
import Navigation from './Navigation'
import Waterfall from './WaterFall'

export default {
  name: 'programa',
  data () {
    return {
      
    }
  },
  components: {
    'navigation': Navigation,
     'waterfall': Waterfall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
