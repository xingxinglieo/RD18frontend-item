<template>
  <div class="right-card">
		<authorItem/>
		<panelCard/>
  </div>
</template>

<script>
import authorItem from './authorItem';
import panelCard from './panelCard';
export default {
  name: 'rightCard',
  components:{
		authorItem,
		panelCard
  },
  data(){
    return{

    }
  }
}
</script>

<style>
.card-note .right-card {
  float: right;
  width: 320px;
  margin-top: 20px;
}
</style>