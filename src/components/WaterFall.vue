<template>
  <div class="waterfall">
    <div id="row0" class="item">
     <!-- <div class="plate">
       <div class="shrink-show"><img src="" class="new-img"></div>
       <div class="simple-info"></div>
     </div> -->
    </div>
    <div id="row1" class="item">
     
    </div>
    <div id="row2" class="item">
    
    </div>
    <div id="row3" class="item">
     
    </div>
    <div id="row4" class="item">
     
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "waterfall",
  data() {
    return {
      
    };
  },
  methods: {

  },
  mounted: function() {
   function calculate(imgCollection) {
    if(imgCollection == null || imgCollection.length == 0) {
      return 0;
    } else {
      var rowLength = 0;
      for(var i = 0; i < imgCollection.length; i++) {
        rowLength +=  imgCollection[i].offsetHeight;
      };
      // console.log(rowLength);
      return rowLength;
    }
    }
    function minDiv() {
    var list0 = document.getElementById("row0");
    var list1 = document.getElementById("row1");
    var list2 = document.getElementById("row2");
    var list3 = document.getElementById("row3");
    var list4 = document.getElementById("row4");
    var listNode0 = list0.children;
    var listNode1 = list1.children;
    var listNode2 = list2.children;
    var listNode3 = list3.children;
    var listNode4 = list4.children;
    var listLength0 = calculate(listNode0);
    var listLength1 = calculate(listNode1);
    var listLength2 = calculate(listNode2);
    var listLength3 = calculate(listNode3);
    var listLength4 = calculate(listNode4);
    var minHeight = Math.min(listLength0,listLength1,listLength2,listLength3,listLength4);
    // console.log(minHeight);
    if(minHeight == listLength0) {
      return list0;
    }else if(minHeight == listLength1) {
      return list1;
    }else if(minHeight == listLength2) {
      return list2;
    }else if(minHeight == listLength3) {
      return list3;
    } else {
      return list4;
    }
    }
    function insertNode() {
      var gap = setInterval(function() {
         if(document.documentElement.scrollHeight > windowHeight) {
        clearInterval(gap);
      };
      imgId++;
      if(imgId > 10) {
        imgId = 1;
      }
        var min = minDiv();
    //     var plateNode = document.createElement("<div class='plate'><div class='shrink-show'><img src='require('../assets/'+imgId+'.jpg')' class='new-img'></div>\
    //    <div class='simple-info'></div>\
    //  </div>");
        var plateNode = document.createElement("div");
        var shrinkNode = document.createElement("div");
        var infoNode = document.createElement("div");
        var chunk = document.createElement("div");
        var newImg = document.createElement("img");
        plateNode.setAttribute("class","plate");
        shrinkNode.setAttribute("class","shrink-show");
        infoNode.setAttribute("class","simple-info");
        plateNode.style.borderRadius = "10px";
        plateNode.style.boxShadow = ""
        newImg.src = require("../assets/"+imgId+".jpg");
        newImg.style.width = "100%";
        // var imgNode = document.getElementsByClassName("new-img");
        // if(imgNode.length == 1) {
        //   imgNode[0].src = require("../assets/"+imgId+".jpg");
        //   imgId++;
        // }
        // var plateNode = document.getElementById("row0").firstChild.cloneNode(true);
        min.appendChild(plateNode);
        // var imgNode1 = document.getElementsByClassName("new-img");
        // console.log(imgNode1.length)
        // imgNode1[imgNode1.length-1].src = require("../assets/"+imgId+".jpg");
        plateNode.appendChild(shrinkNode);
        shrinkNode.appendChild(newImg);
        plateNode.appendChild(infoNode);
      },100)
    }
    var windowHeight = window.screen.height + 500;
    var imgId = 1;
    // console.log(windowHeight);
    window.addEventListener("load",function() {
      insertNode();
      window.document.addEventListener("scroll",function() {
        if(document.documentElement.scrollTop + window.screen.height > windowHeight){
        windowHeight += 500;
        insertNode();
        }
      })
    })  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.waterfall {
  display: none;
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 800px;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}
.waterfall .item {
  flex: 1;
  margin: 15px;
}
.shrink-show img {
  width: 100%;
}
</style>
