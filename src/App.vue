<template>
  <div id="app">
    <router-view></router-view>
    <cardNote/>
  </div>
</template>

<script>
import cardNote from './components/CardNote/cardNote';
export default {
  name: 'App',
  components: {
    cardNote
  }
  
}
</script>

<style>

</style>
