<template>
  <div class="left-card">
    <slideshow/>
    <note/>
    <noteComment/>
  </div>
</template>

<script>
import slideshow from './slideshow';
import note from './note';
import noteComment from './noteComment'
export default {
  name: 'leftCard',
  components:{
    slideshow,
    note,
    noteComment
  },
  data(){
    return{
      pics:[1,2,3,4,5,6,7,8,9]
    }
  }
}
</script>

<style>
.card-note .left-card {
    float: left;
    margin-top: 20px;
    width: 500px;
}
ul {
  list-style: none;
}
li {
  /* position: absolute; */
}
</style>