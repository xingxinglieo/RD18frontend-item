<template>
  <div style="position:relative;display: inline-block">
    <transition name="el-fade-in">
      <div id="wrapper" v-show="isShow" @click.stop>
        <div id="contain" @click="myemoji($event)">
          <span class="emoji" v-for="item in emoji" :key="item">{{item}}</span>
        </div>
        <div id="switch" @click="myswitch($event)">
          <div class="switches" v-for="item in emojichange" :key="item">{{item}}</div>
        </div>
      </div>
    </transition>
    <div id="trigger" @click.stop="isShow=!isShow">😃</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      isShow: false,
      emoji: null, //指向不同数组的指针
      textareadom:{},
      loseBlurTextStart:0,
      emojichange: ["😄", "🍚", "🚲", "🐶", "✍"],
      emojiFaces: [
        "😁",
        "😀",
        "😂",
        "🤣",
        "😃",
        "😄",
        "😅",
        "😆",
        "😉",
        "😊",
        "😋",
        "😎",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "🙂",
        "🤗",
        "🤩",
        "🤔",
        "🤨",
        "😐",
        "😑",
        "😶",
        "🙄",
        "😏",
        "😣",
        "😥",
        "😮",
        "🤐",
        "😯",
        "😪",
        "😫",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "🤤",
        "😒",
        "😓",
        "😔",
        "😕",
        "🙃",
        "🤑",
        "😲",
        "🙁",
        "😖",
        "😞",
        "😟",
        "😤",
        "😢",
        "😭",
        "😦",
        "😧",
        "😨",
        "😩",
        "🤯",
        "😬",
        "😰",
        "😱",
        "😳",
        "🤪",
        "😵",
        "😡",
        "😠",
        "🤬",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "😇",
        "🤠",
        "🤡",
        "🤥",
        "🤫",
        "🤭",
        "🧐",
        "🤓",
        "😈",
        "👿",
        "👹",
        "👺",
        "💀",
        "👻",
        "👽",
        "🤖",
        "💩",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾"
      ],
      emojiGestures: [
        "🙏",
        "🤲",
        "👐",
        "🙌",
        "👏",
        "🤝",
        "👍",
        "👎",
        "👊",
        "✊",
        "🤛",
        "🤜",
        "🤞",
        "✌",
        "🤘",
        "👌",
        "👈",
        "👉",
        "👆",
        "👇",
        "☝",
        "🤚",
        "🖐",
        "🖖",
        "👋",
        "🤙",
        "💪",
        "🖕",
        "✍"
      ],
      emojiFood: [
        "☕️",
        "🍵",
        "🍶",
        "🍼",
        "🍺",
        "🍻",
        "🍸",
        "🍹",
        "🍷",
        "🍴",
        "🍕",
        "🍔",
        "🍟",
        "🍗",
        "🍖",
        "🍝",
        "🍛",
        "🍤",
        "🍱",
        "🍣",
        "🍥",
        "🍙",
        "🍘",
        "🍚",
        "🍜",
        "🍲",
        "🍢",
        "🍡",
        "🍞",
        "🍩",
        "🍮",
        "🍦",
        "🍨",
        "🍧",
        "🎂",
        "🍰",
        "🍪",
        "🍫",
        "🍬",
        "🍭",
        "🍯",
        "🍎",
        "🍏",
        "🍊",
        "🍋",
        "🍒",
        "🍇",
        "🍉",
        "🍓",
        "🍑",
        "🍈",
        "🍌",
        "🍐",
        "🍍",
        "🍠",
        "🍆",
        "🍅",
        "🌽"
      ],
      emojiAnimals: [
        "🐱",
        "🐶",
        "🐭",
        "🐹",
        "🐰",
        "🐺",
        "🐸",
        "🐯",
        "🐨",
        "🐻",
        "🐷",
        "🐽",
        "🐮",
        "🐗",
        "🐵",
        "🐒",
        "🐴",
        "🐎",
        "🐫",
        "🐑",
        "🐘",
        "🐼",
        "🐍",
        "🐦",
        "🐤",
        "🐥",
        "🐣",
        "🐔",
        "🐧",
        "🐢",
        "🐛",
        "🐝",
        "🐜",
        "🐞",
        "🐌",
        "🐙",
        "🐠",
        "🐟",
        "🐳",
        "🐋",
        "🐬",
        "🐄",
        "🐏",
        "🐀",
        "🐃",
        "🐅",
        "🐇",
        "🐉",
        "🐐",
        "🐓",
        "🐕",
        "🐖",
        "🐁",
        "🐂",
        "🐲",
        "🐡",
        "🐊",
        "🐪",
        "🐆"
      ],
      emojiTransportation: [
        "🚢",
        "🚤",
        "🚀",
        "✈",
        "🚊",
        "🚞",
        "🚲",
        "🚡",
        "🚟",
        "🚠",
        "🚜",
        "🚙",
        "🚘",
        "🚗",
        "🚕",
        "🚖",
        "🚛",
        "🚌",
        "🚍",
        "🚨",
        "🚓",
        "🚔",
        "🚒",
        "🚑",
        "🚐",
        "🚚",
        "🚋",
        "🚉",
        "🚆",
        "🚅",
        "🚄",
        "🚈",
        "🚝",
        "🚃",
        "🚎"
      ]
    };
  },
  props:{
    bindInputTextrea:String,
  },
  created: function() {
    this.emoji = this.emojiFaces;
  },
  mounted: function() {
    document.addEventListener("click", this.addClick);
    this.textareadom = document.querySelector(this.bindInputTextrea);
    this.textareadom.addEventListener("blur",()=>{
      this.loseBlurTextStart = this.textareadom.selectionStart;
    }); 
  },
  beforeDestroy: function() {
    document.removeEventListener("click", this.addClick);
  },
  methods: {
    myswitch(event) {
      switch (event.target.innerText) {
        case "😄":
          this.emoji = this.emojiFaces;
          break;
        case "🍚":
          this.emoji = this.emojiFood;
          break;
        case "🚲":
          this.emoji = this.emojiTransportation;
          break;
        case "🐶":
          this.emoji = this.emojiAnimals;
          break;
        case "✍":
          this.emoji = this.emojiGestures;
          break;
      }
      let switches = document.querySelectorAll(".switches");
      for (let i = 0; i < switches.length; i++) {
        switches[i].style.backgroundColor = "#f2f6fc";
      }
      event.target.style.backgroundColor = "#dcdfe6";
    },
    addClick() {
      this.isShow = false;
    },
    inserStr(source, start, newStr) {
      //为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
      //此方法解决了无法在行中文字之中插入/n或者表情包
      return source.slice(0, start) + newStr + source.slice(start);
    },
    myemoji(event) {
      if(event.target.className.indexOf("emoji") !== -1){
       this.textareadom.value = this.inserStr(this.textareadom.value,this.loseBlurTextStart,event.target.innerText )
        // this.isShow = false;
        this.setCaretPosition(this.textareadom,this.loseBlurTextStart+2);
        this.loseBlurTextStart = this.loseBlurTextStart+3;
      }
    },
  setCaretPosition(ctrl, pos){
  if(ctrl.setSelectionRange)
  {
    ctrl.focus();
    ctrl.setSelectionRange(pos,pos);
  }
  else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }

},
    changeshow() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="scss" scoped>
#wrapper {
  width: 315px;
  position: absolute;
  bottom: 39.5px;
  left: -20px;
  z-index:10;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  #contain {
    width: 100%;
    height: 135px;
    padding: 5px 5px 5px 15px;
    top: 100px;
    left: 5px;
    word-break: break-word;
    overflow: auto;
    white-space: normal;
    font-size: 20px;
    text-align: left;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    .emoji {
      display: inline-block;
      width: 33.1px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  #switch {
    display: flex;
    width: 335px;
    background: #f2f6fc;
    .switches {
      height: 30px;
      line-height: 30px;
      text-align: center;
      flex: 1;
      font-size: 18px;
      &:hover {
        cursor: pointer;
        //一定要加important 不然会被js设置的覆盖掉;
        background-color: #dcdfe6 !important;
      }
      transition: background-color 0.3s ease;
    }
  }
}

#trigger {
  &:hover {
    cursor: pointer;
  }
}
</style>
