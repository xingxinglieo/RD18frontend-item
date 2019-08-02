<template>
<el-popover
    placement="right"
    trigger="focus"
    width=150
    content="标签最多10个字"
    :disabled="state.length<7"
    >
<el-autocomplete v-model="state" maxlength=10 :fetch-suggestions="querySearchAsync" :placeholder="placeholder" slot="reference"></el-autocomplete>
</el-popover>

</template>
<script>
export default {
  props: {
      placeholder: String
  },
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null
    };
  },
  methods: {
    loadAll() {
      return [
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" },
        { value: "四全鲜食" },
        { value: "三全鲜食" },
        { value: "三全鲜食" }
      ];
    },
    //用户输入时 开启检索函数(可能有节流)
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      //queryString存在吗?(用户输入数据了吗?) 存在返回检索结果 不存在返回全部推荐列表
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      //随机3秒内 执行callback
      //这个cb在内部已经自定义了
      cb(results);
    },
    createStateFilter(queryString) {
      //返回一个过滤器函数 a是过滤器内定的参数
      //运用了闭包 , 保留了queryString
      //
      return a => {
        return a.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    }
    // handleSelect(item) {
    //   console.log(item);
    // }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="scss" scoped>
.el-autocomplete-suggestion li {
  padding: 0 0px;
}
.el-autocomplete {
  width: 100%;
}
</style>
