<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tour class="tour"></Tour>
          <Gender class="gender"></Gender>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Count class="count"></Count>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top.vue'
import { ref, onMounted } from 'vue'
import Age from './components/left/age.vue';
import Gender from './components/left/gender.vue';
import Tour from './components/left/tour.vue';
import Map from './components/center/map.vue'
import Line from './components/center/line.vue'
import Rank from './components/right/rank.vue';
import Year from './components/right/year.vue'
import Count from './components/right/count.vue'
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
//组件挂载时先缩放拖拽一次
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//获取缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化 后续视口发生变化就缩放再拉拽
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    left: 50%;
    top: 50%;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .left {

        flex: 1;
        display: flex;
        flex-direction: column;

        .tour {
          flex: 1.2;
        }

        .gender {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;

        .map {
          flex: 4;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1.2;
        }

        .year {
          flex: 1;
        }

        .count {
          flex: 1;
        }
      }
    }
  }
}
</style>