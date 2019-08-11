<template>
<!-- 推荐界面导航 -->
  <div class="navigation"> 
    <div class="bar">
      <div v-bind:class="{'bar-point': hover1, 'bar-point-hover': !hover1}" v-on:click="changePage(1)"> 
        <p>美食</p>
      </div>
      <div v-bind:class="{'bar-point': hover2, 'bar-point-hover': !hover2}" v-on:click="changePage(2)">
        <p>路线</p>
      </div>
      <div v-bind:class="{'bar-point': hover3, 'bar-point-hover': !hover3}" v-on:click="changePage(3)">   
        <p>景点</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover1: false,
      hover2: true,
      hover3: true
    };
  },
  methods: {
    changePage(index) {
      switch(index) {
        case 1: this.$router.push({
          path: '/interface/recommend', 
          name: 'cate'
        });
        this.hover1 = false;
        this.hover2 = true;
        this.hover3 = true;
          break;
        case 2: this.$router.push({
          path: '/interface/recommend/route', 
          name: 'route'
        });
        this.hover1 = true;
        this.hover2 = false;
        this.hover3 = true;
          break;
        case 3: this.$router.push({
          path: '/interface/recommend/spot', 
          name: 'spot'
        });
        this.hover1 = true;
        this.hover2 = true;
        this.hover3 = false;
        break;
      }
    }
  },
  mounted: function() {
    this.$store.state.navigation.location = 1;
    if(this.$store.state.recommend.detailType == 7) {
      this.changePage(2);
    } else if(this.$store.state.recommend.detailType == 4) {
      this.changePage(3);
    } else {
      this.changePage(1);
    }
  }

};
</script>

<style scoped>
.navigation {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}

.bar {
  display: flex;
  justify-content: center;
  height: 10%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid gray;
}

.bar-point {
  flex: 1;
  padding-top: 1%;
  padding-bottom: 1%;
  margin: 0 1% 1% 1%;
  cursor: pointer;
  text-align: center;
  border: 0;
  -webkit-transition: background-color 0.5s;
     -moz-transition: background-color 0.5s;
       -o-transition: background-color 0.5s;
          transition: background-color 0.5s;
}

.bar-point:hover {
  color: #fff;
  background-color: #e74b37;
}
.bar-point-hover {
 flex: 1;
  padding-top: 1%;
  padding-bottom: 1%;
  margin: 0 1% 1% 1%;
  cursor: pointer;
  text-align: center;
  border: 0;
  color: #fff;
  background-color: #e74b37;
}

</style>