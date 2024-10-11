<template>
  <div class="rankBox">
    <div class="rankTitle">
      热门景区排行
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
  let information = {
    colorArrays: [
      {
        flag: "rgb(245,34,45)",
        top: "rgba(245,34,45,0.75)",
        bottom: "rgba(114,46,206,0.4)",
      },
      {
        flag: "rgb(250, 140, 22)",
        top: " rgba(250, 140, 22, 0.75)",
        bottom: " rgba(160, 217, 17, 0.4)",
      },
      {
        flag: "rgb(82, 196, 26)",
        top: " rgba(82, 196, 26, 0.75)",
        bottom: "rgba(160, 217, 17, 0.4)",
      },
      {
        flag: "rgb(19, 194, 194)",
        top: " rgba(19, 194, 194, 0.75)",
        bottom: "rgba(47, 84, 235, 0.4)",
      },
    ],
    legend: [
      "老君山",
      "故宫",
      "九寨沟",
      "武功山",
    ],
    data: [80, 70, 90, 60],
  }
  let option = {
    title: {
      text: "2024-10    人数:单位(万)",
      textStyle: {
        fontSize: 30,
        color: "#b4e4ff",
      },
      right: 30,
      top: 20,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter: "{b}:{c}",
      backgroundColor: "rgba(9,40,84,0.8)",
      borderColor: "rgba(9,40,84,0.8)",
      textStyle: {
        fontSize: 20,
        color: "#fff",
      },
      axisPointer: {
        type: "shadow",
      },
      //@ts-ignore
      formatter: function (params: any) {
        var res = "<div>";
        for (var i = 0, l = params.length; i < l; i++) {
          // 创建 marker 标签
          res +=
            "<div style='display:flex; justify-content:space-between;'><div><span style='margin-right: 5px; border-radius: 50%; display: inline-block; width:14px; height: 14px; vertical-align: middle; background:linear-gradient(" +
            params[i].color.colorStops[0].color +
            ", " +
            params[i].color.colorStops[1].color +
            ");'></span>";
          res +=
            params[0].name +
            "</div>&nbsp;&nbsp;&nbsp;&nbsp;" +
            "<span style='font-weight: bold;'>" +
            params[i].value +
            "</span></div>";
        }
        res += "</div>";
        return res;
      }
    },
    grid: {
      left: "3%",
      top: "30%",
      right: "3%",
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: "value",
      show: false,
      position: "top",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      nameLocation: "start",
      nameTextStyle: {
        color: "#b4e4ff",
        fontSize: 20,
        padding: [0, 0, 0, 140],
      },
      axisTick: {
        show: false,
        alignWithLabel: false,
        length: 5,
      },
      splitLine: {
        //网格线
        show: false,
      },
      inverse: "true", //排序
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(180, 228, 255, 0.3)",
          width: 2,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(18, 63, 115, 0.3)", "rgba(255,255,255,0)"],
        },
      },
      axisLabel: {
        color: "#b4e4ff",
        margin: 20,
        fontSize: 20,
      },
      data: information.legend,
    },
    series: [
      {
        name: "能耗值",
        type: "bar",
        stack: "地点",
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
          color: "#b4e4ff", //color of value
          fontSize: 20,
          padding: [0, 0, 0, 10],
        },
        itemStyle: {
          show: true,
          color: function (params: any) {
            let num = information.colorArrays.length;
            let index = params.dataIndex > num - 1 ? num - 1 : params.dataIndex;
            let colorArray = information.colorArrays;
            return {
              type: "linear",
              colorStops: [
                {
                  offset: 0,
                  color: colorArray[index].bottom,
                },
                {
                  offset: 1,
                  color: colorArray[index].top,
                },
              ],
            };
          },
          borderWidth: 0,
          borderColor: "#333",
        },
        emphasis: {
          // 解决渐变色hover变色问题
          disabled: true,
        },
        barGap: "0%",
        barCategoryGap: "50%",
        data: information.data,
      },
      {
        tooltip: {
          show: false,
        },
        stack: "地点",
        type: "bar",
        itemStyle: {
          color: function (params: any) {
            let num = information.colorArrays.length;
            let index = params.dataIndex > num - 1 ? num - 1 : params.dataIndex;
            return information.colorArrays[index].flag;
          },
        },
        barMinHeight: 2,
        data: [0, 0, 0, 0, 0, 0],
        z: 3,
      },
    ]
  }
  mycharts.setOption(option)
})
</script>

<style scoped lang="scss">
.rankBox {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  color: white;

  .rankTitle {
    font-size: 20px;
  }

  img {
    margin-top: 10px;
    margin-bottom: 45px;
  }

  .charts {
    height: 255px;
  }
}
</style>