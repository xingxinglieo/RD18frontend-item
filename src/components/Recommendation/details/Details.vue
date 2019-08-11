<template>
 <div>
   <to-comment-area></to-comment-area>
   <to-front></to-front>
   <show></show>
   <userComment></userComment>
 </div>
</template>

<script>
import ShowChunk from './ShowChunk'
import UserComment from './UserComment'
import ToFront from '../../Home/ToFront'
import ToCommentArea from './ToCommentArea'

 export default {
   data () {
     return {
       
     }
   },
   components: {
     show: ShowChunk,
     userComment: UserComment,
     'to-front': ToFront,
     'to-comment-area': ToCommentArea
   },
   methods: {

   }
 }
</script>

<style scoped>

 
</style>

