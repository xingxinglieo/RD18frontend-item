<template>
<!-- 展示主界面组件 -->
 <div>
   <home></home>
   <programa></programa>
   
 </div>
</template>

<script>
import Home from './Home'
import Programa from './Programa'
 export default {
   components: {
     'home': Home,
     'programa': Programa
   }
 }
</script>

<style>

 
</style>
