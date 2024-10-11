<template>
  <div class="ageBox">
    <div class="ageTitle">年龄比例</div>
    <img src="../../images/dataScreen-title.png" alt="">
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
//引入echarts
import * as echarts from 'echarts';
let charts = ref()
onMounted(() => {
  let mychart = echarts.init(charts.value);
  let option: any = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      backgroundColor: "rgba(1, 13, 19, 0.5)",
      borderWidth: 1,
      textStyle: {
        color: "rgba(212, 232, 254, 1)",
      },
    },
    legend: {
      orient: 'vertical',
      top: 45,
      left: 45,
      itemWidth: 15,
      itemHeight: 10,
      itemGap: 25,
      borderRadius: 4,
      textStyle: {
        color: "white",
        fontFamily: "Alibaba PuHuiTi",
        fontSize: 18,
        fontWeight: 400,
      },
    },
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        radius: '70%',
        center: ['65%', '45%'],
        data: [
          { value: 1048, name: '儿童' },
          { value: 735, name: '少年' },
          { value: 580, name: '中年' },
          { value: 484, name: '老年' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          label: {
            fontSize: 20, // 设置强调状态下的字体大小
            fontWeight: 'bold', // 可选：设置字体加粗
          },
        },
        label: {
          fontSize: 16, // 设置字体大小
          fontWeight: 'bold', // 可选：设置字体加粗
        },
      }
    ]
  }
  mychart.setOption(option)
})
</script>

<style scoped>
.ageBox {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;

  .ageTitle {
    font-size: 20px;
    color: white;
  }

  .charts {
    height: 260px;
  }
}
</style>