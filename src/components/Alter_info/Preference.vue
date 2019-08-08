<template>
  <transition name="preference">
    <div class="container" v-show="show">
      <div class="preference">
        <div class="preference-point" v-for="(item, index) in preference" :key="index">
          <button
            v-bind:class="{point: !item.select, 'point-on': item.select}"
            @click="item.select = !item.select"
          >{{item.name}}</button>
        </div>
      </div>
      <div class="save-preference">
        <button @click="changeState()">取消</button>
        <button @click="changeState(), addNewPreference()">确认</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    msg: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      show: false,
      preference: [],
      newPreference: [],
      oldId: []
    };
  },
  components: {},
  methods: {
    changeState() {
      this.show = !this.show;
    },
    getAllPreference() {
      let param = {
        id: 0
      };
      this.$axios.get(`/user/preference/${param.id}`).then(res => {
        console.log(res);
        if (res.data.result == "success") {
          this.preference = [];
          for (var i = 0; i < res.data.message.length; i++) {
            for (var j = 0; j < this.msg.length; j++) {
              var select = 0;
              if (res.data.message[i].id == this.msg[j].id) {
                this.preference.push({
                  id: res.data.message[i].id,
                  name: res.data.message[i].name,
                  select: true
                });
                select = 1;
                break;
              }
            }
            if (select == 1) {
              continue;
            } else {
              this.preference.push({
                id: res.data.message[i].id,
                name: res.data.message[i].name,
                select: false
              });
            }
          }
        }
      }),
        err => {
          console.log(err);
        };
    },
    addNewPreference() {
      this.newPreference = [];
      for(var i = 0; i < this.preference.length; i++) {
        if(this.preference[i].select == true) {
          this.newPreference.push({
            id: this.preference[i].id,
            name: this.preference[i].name
          })
        }
        for (var j = 0; j < this.msg.length; j++) {
          if(this.preference[i].id == this.msg[j].id && this.preference[i].select == false) {
            this.oldId.push(this.preference[i].id);
          }
        }
      };
      this.$emit('preference', this.newPreference, this.oldId);
    }
  }
};
</script>

<style scoped>
@keyframes preference {
  from {
    transform: translateY(120px);
    opacity: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  to {
    transform: translateY(0);
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
  }
}
.container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #fff;
  border: 1px solid #f5f5f5;
}

.preference {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: auto;
  text-align: center;
  border-radius: 10px;
}

.preference-enter-active {
  animation: preference 1s;
}

.preference-leave-active {
  animation: preference 1s reverse;
}

.preference-point {
  padding: 5px;
}

.point {
  width: 90%;
  height: 30px;
  margin: 2% auto;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  color: #fff;
  line-height: 30px;
}

.point-on {
  width: 90%;
  height: 30px;
  margin: 2% auto;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  color: #fff;
  line-height: 30px;
  background-color: #e74b37;
}

.point-on:hover {
  background-color: #c2402f;
}
.save-preference {
  display: flex;
  margin: 2% auto;
  width: 50%;
  text-align: center;
}

.save-preference button {
  width: 50%;
  height: 30px;
  margin: auto 5%;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  color: #fff;
  line-height: 30px;
  background-color: #e96554;
}

.save-preference button:hover {
  background-color: #e74b37;
}
</style>
