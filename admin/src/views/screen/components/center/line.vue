<template>
  <div class="lineBox">
    <div class="lineTitle">未来7天游客量数据趋势图</div>
    <img src="../../images/dataScreen-title.png" alt="">
    <div class="charts" ref='line'></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
//获取图形图标的节点
let line = ref();
onMounted(() => {
  let mycharts = echarts.init(line.value);
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: 30,
      top: 30,
      right: 20,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: '#CFCFCF',
        interval: 0,
        fontSize: 14
      },
      //刻度
      axisTick: {
        show: true
      },
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false
      },
      //轴线的设置
      axisLine: {
        show: true
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: '#CFCFCF',
        fontSize: 14
      },
      splitLine: {
        show: false,
        lineStyle: {
          width: 0.8,
          color: 'rgba(127, 214, 255, .4)',
          type: 'dashed'
        }
      },
      //刻度
      axisTick: {
        show: true
      },
      //轴线的设置
      axisLine: {
        show: true
      },
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#00FFF6'
        },
        itemStyle: {
          color: '#00FFF6',
          borderColor: '#00FFF6',
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#00FFF686'
              },
              {
                offset: 1,
                color: '#00FFF600'
              }
            ]
          }
        },
        data: [300, 1200, 500, 1100, 400, 1300, 150]
      }
    ]
  }
  mycharts.setOption(option)
})
</script>

<style scoped lang="scss">
.lineBox {
  height: 100%;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 10px;

  .lineTitle {
    font-size: 20px;
    color: white;
  }

  .charts {
    height: 230px;
  }
}
</style>