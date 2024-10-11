<template>
  <div class="yearBox">
    <div class="yearTitle">
      年度游客量对比
    </div>
    <img src="../../images/dataScreen-title.png">
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let charts = ref()
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value);
  const color = ['#FDC844', '#42FEB7', '#3C7EFF', '#8E51DA', '#FF5A5A']
  const legendData = ['2022', '2023', '2024']
  const xPoint = []
  for (let i = 0; i < 10; i++) {
    let currentTime = new Date().getTime() - 3600 * 1000 * 24 * i;
    let time = new Date(currentTime).toLocaleDateString();
    xPoint.push(time);
  }
  let series = []
  for (let i = 0; i < 3; i++) {
    let curData = []
    for (let j = 0; j < 10; j++) {
      curData.push(Math.floor(Math.random() * 100))
    }
    const obj = {
      name: legendData[i], // 每一条线对应的名称
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 6,
      itemStyle: {
        color: color[i % color.length],
        borderWidth: 6,
        borderColor: 'rgba(51, 181, 255, .2)'
      },
      lineStyle: {
        normal: {
          width: 2,
          color: color[i % color.length] // 线条颜色
        }
      },
      label: {
        show: false,
        color: 'rgba(255,255,255, 0.6)'
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
              offset: 0,
              color: 'rgba(103, 171, 249, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(103, 171, 249, 0)'
            }
          ]
        }
      },
      data: curData
    }
    series.push(obj)
  }
  let option = {
    grid: {
      top: '5%',
      bottom: '20%',
      left: '10%',
      right: '5%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, .6)'
        }
      },
      splitLine: {
        // 网格线
        show: false
      },
      axisTick: {
        show: false
      },
      data: xPoint
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(255, 255, 255, .6)',
        fontSize: 12
      },
      plitLine: {
        lineStyle: {
          type: 'dashed',
          width: 1,
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
    },
    legend: {
      data: legendData,
      left: 'center',
      bottom: '3%',
      itemGap: 10,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'rect',
      textStyle: {
        color: '#fff',
        fontSize: 12,
        rich: {
          a: {
            verticalAlign: 'middle'
          }
        },
        padding: [0, 0, -2, 0]
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgb(33, 85, 154, .6)',
      borderWidth: 1,
      borderColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(85, 149, 233, .6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(85, 149, 233, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      padding: 8,
      textStyle: {
        color: '#fff'
      },
      axisPointer: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, .6)'
        }
      },

      extraCssText: 'box-shadow: 2px 2px 16px 1px rgba(0, 39, 102, 0.16)',
      formatter: function (params: any) {
        let content = `<div style='font-size: 14px; color: #fff;'>${params[0].name}</div>`
        if (Array.isArray(params)) {
          for (let i = 0; i < params.length; i++) {
            content += `
                  <div style='display: flex; align-items: center; padding: 4px; background: #21559A; margin-top: 4px; color: #fff;'>
                    <div style='width: 10px; height: 10px; background: ${params[i].color}; margin-right: 8px;'></div>
                    <div style='font-size: 12px; margin-right: 32px;'>${params[i].seriesName}</div>
                    <div style='font-size: 14px;'>${params[i].value}</div>
                  </div>
                `
          }
        }
        return content
      }
    },
    series: series
  }
  mycharts.setOption(option)
})
</script>

<style scoped lang=scss>
.yearBox {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  color: white;

  .yearTitle {
    margin-bottom: 5px;
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