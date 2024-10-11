<template>
  <div class="top">
    <div class="left">
      <div class="lbtn" @click="goHome">首页</div>
    </div>
    <div class="center">
      <div class="title">
        智慧旅游可视化大数据展示平台
      </div>
    </div>
    <div class="right">
      <div class="rbtn">
        统计报告
      </div>
      <div class="time">
        当前时间{{ time }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
const $router = useRouter()
//获取当前时间并存储
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)
const goHome = () => {
  $router.push({ path: '/home' })
}
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped>
.top {
  display: flex;

  .left {
    flex: 1.5;

    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
  }

  .lbtn {
    float: right;
    background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
    background-size: 100% 100%;
    width: 150px;
    height: 40px;
    color: #29fcff;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }

  .center {
    flex: 2;

    .title {
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: cover;
      width: 100%;
      height: 74px;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1.5;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;

    .rbtn {
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: cover;
      float: left;
      width: 150px;
      height: 40px;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }

    .time {
      float: right;
      margin-right: 20px;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }
  }
}
</style>