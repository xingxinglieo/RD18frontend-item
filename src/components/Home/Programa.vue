<template>
<!-- 主界面下方 -->
  <div class="programa">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'programa',
  data () {
    return {
      active: 'fall'
    }
  },
  components: {
    'navigation': Navigation,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
