<template>
  <div class="card-note">
    <leftCard/>
    <rightCard/>
  </div>
</template>

<script>
import leftCard from './leftCard';
import rightCard from './rightCard';
export default {
  name: 'card-note',
  components:{
    leftCard,
    rightCard
  }
}
</script>

<style scoped>  
*{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
}
.card-note {
  width: 850px;
  margin: 50px auto 0 auto;
  padding-top: 60px;
  overflow: hidden;
  margin-bottom: 150px;
  padding-bottom: 36px;
}
</style>