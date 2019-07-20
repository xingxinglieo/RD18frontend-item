<template>
  <div class="home">
    <logo></logo>
    <user></user>
    <search-bar></search-bar>
  </div>
</template>

<script>
import Logo from './Logo'
import User from './User'
import SearchBar from './SearchBar'

export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components: {
    'logo': Logo,
    'user': User,
    'search-bar': SearchBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  background: url("../assets/background.jpg") no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}

</style>