<template>
<!-- 搜索框组件 -->
    <form class="search">
      <input type="text" placeholder="搜索" autocomplete="off">
      <button type="button" v-on:mouseover="put = !put"
      v-on:mouseout="put = !put">
        <svg class="icon" aria-hidden="true" v-show="put == false">
          <use xlink:href="#iconsoushuo" />
        </svg>
        <svg class="icon" aria-hidden="true" v-show="put == true">
          <use xlink:href="#iconsoushuo-copy" />
        </svg>
      </button>
    </form>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      put: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.search {
  display: flex;
  position: absolute;
  left: 50%;
  top: 18%;
  transform: translateX(-50%);
}
.search input {
  width: 380px;
  padding: 10px 10px 10px 20px;
  line-height: 10px;
  background-color: #ebebeb;
  outline: none;
  border: 0;
  border-radius: 10px 0 0 10px;
}
.search button {
  display: block;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 0 10px 10px 0;
  outline: 0;
  cursor: pointer;
  background-color: #ebebeb;
}
</style>
