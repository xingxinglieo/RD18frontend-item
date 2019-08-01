# 倾旅-ReleaseNote

****


#### 8.1

* 新增 上传游记框
* 新增 已配置全局url http://47.112.212.177/qinglv
#### 7.25

* 新增 vuex 全局变量 `showLoginContain(Boolean)` : 控制登录框显示状态
* 新增 vuex 全局变量 `loginState(Boolean) ` : 记录登录状态
* 优化 挂载登录框至全局 , 通过vuex中变量显示--显示方法 : 在mothod中调用`this.$store.commit('openLoginContain');`
* 新增 登录框所有改变时的渐变动画 

#### 7.25

- 更新组件

#### 7.23

- 新增 组件

#### 7.23

* 新增 [`vuex`](https://vuex.vuejs.org/zh/) 插件 ,  vuex 用于配置全局状态
* 新增 注册组件正则验证 
* 新增 挂载axios至原型 , 任意组件可使用 this.$axios调用
* 新增 登录组件 

#### 7.19

* 新增 引入sass
* 新增 引入[element ui插件](https://element.eleme.cn/#/zh-CN/component/installation) , 配置主题色为`#e74b37`

#### 7.17

* 新增 引入iconfont链接
#### 7.15 
* 新增 初始化vue-cli,vue-router和npm文件



