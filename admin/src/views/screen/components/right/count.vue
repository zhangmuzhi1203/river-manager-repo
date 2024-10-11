<template>
  <div class="countBox">
    <div class="countTitle">
      预约渠道数据统计
    </div>
    <img src="../../images/dataScreen-title.png">
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let charts = ref()
onMounted(() => {
  //获取echarts类的实例
  const ColorList = ['#E8FF94', '#89FEBA', '#5EDCEB', '#57A4FF', '#8E87FF'] // 链群颜色值
  var arrayTemp = [
    {
      value: 10,
      name: '旅游官网',
      num: 1000,
    },
    {
      value: 40,
      name: '微信公众号',
      num: 1000,
    },
    {
      value: 50,
      name: '美团购票',
      num: 1000,
    },
  ]
  var titleData: any = []
  var series: any = []
  arrayTemp.forEach((item, index) => {
    const color = ColorList[index];
    titleData.push({
      text: item.name,
      x: `${24 * (index + 1)}%`,
      y: ' 30%',
      textAlign: 'center',
      textStyle: {
        fontSize: '16',
        color: color,
        textAlign: 'center',
      },
    });
    series.push({
      type: 'liquidFill',
      name: item.name,
      radius: '40%',
      center: [`${25 * (index + 1)}%`, '60%'],
      data: [
        {
          value: 1,
          itemStyle: {
            color: 'transparent',
          },
        },
        item.value / 100,
      ],
      backgroundStyle: {
        color: 'transparent',
      },
      color: [color],
      itemStyle: {
        opacity: 0.6,
      },
      outline: {
        borderDistance: 5,
        itemStyle: {
          borderWidth: 1,
          borderColor: color,
          shadowBlur: 10,
          shadowColor: '#000',
        },
      },
      label: {
        position: ['50%', '50%'],
        formatter: function () {
          return `${item.value}%`;
        },
        fontSize: 20,
        color: '#fff',
      },
    });
  })
  let mycharts = echarts.init(charts.value);
  let option = {
    title: titleData,
    series: series,
    tooltip: {
      show: true,
    },
  }

  mycharts.setOption(option)
})
</script>

<style scoped lang=scss>
.countBox {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  color: white;

  .countTitle {
    margin-bottom: 3px;
    font-size: 20px;
  }

  img {
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .charts {
    height: 270px;
  }
}
</style>