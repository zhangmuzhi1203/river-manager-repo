<template>
  <span ref="text" class="msg"></span>
</template>
 
<script setup>
import { ref, onMounted } from "vue"
import TypeIt from 'typeit'
const text = ref(null)
onMounted(() => {
  new (TypeIt)(text.value, {
    strings: ["路漫漫其修远兮，吾将上下而求索", ["水清乡愿-环保型污水处理与检测系统助力乡村振兴"]],
    cursorChar: "<span class='cursorChar'>|<span>",//用于光标的字符。HTML也可以
    speed: 100,
    lifeLike: true,// 使打字速度不规则
    cursor: true,//在字符串末尾显示闪烁的光标
    breakLines: false,// 控制是将多个字符串打印在彼此之上，还是删除这些字符串并相互替换
    loop: true,//是否循环
  }).go()
})
</script>
  
<style scoped>
.msg {
  color: darkcyan;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
}

.msg :v-deep(.cursorChar) {
  display: inline-block;
  margin-left: 2px;
}
</style>    
