<template>
  <div>
    <el-page-header icon="" title="数据管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 数据展示 </span>
      </template>
    </el-page-header>
    <div class="wrapOne">
      <el-button class="button my_btn" @click="getData()">Click</el-button>
    </div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script setup>

import axios from "axios"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart, BarChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"
import { ref, provide } from "vue"

use([//use函数配置和使用ECharts的模块
  CanvasRenderer,//用于渲染ECharts图表的画布渲染器。
  PieChart,//用于创建饼图的模块。
  TitleComponent,//用于添加标题组件的模块。
  TooltipComponent,//用于添加工具提示组件的模块。
  LegendComponent//用于添加图例组件的模块。
])

provide(THEME_KEY, "light")//主题

const option = ref({
  title: {//标题
    text: "河水质量检测标准",
    left: "center"
  },
  tooltip: {//提示
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {//左边
    orient: "vertical",
    left: "left",
    data: ["电导率", "PH值", "温度", "浑浊度",]
  },
  series: [
    {
      name: "河水质量检测指标",
      type: "pie",//饼图
      // radius: "55%",//半径
      center: ["50%", "60%"],
      data: [
        { value: 23, name: "电导率" },
        { value: 28, name: "PH值" },
        { value: 22, name: "温度" },
        { value: 27, name: "浑浊度" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
})
const optionData = option.value
const params = {
  uid: "5c8975630fd647169da08223185e1386",
  type: 3,
}
const getData = () => {
  axios.get('https://apis.bemfa.com/va/alltopic', { params: params }).then(res => {
    console.log(res.data.data)
    let dataArr = res.data.data
    let newArr = []
    dataArr.forEach(e => {
      newArr.push(e.msg)
    })
    // console.log(newArr)
    // const newArrSlice = []
    const newArrTwo = newArr.map(item => item.replace(/#/g, ''))
    console.log(newArrTwo)
    let newOne = newArrTwo[0]
    let newTwo = newArrTwo[1]
    let newThree = newArrTwo[2]
    let newFour = newArrTwo[3]
    const newArrSlice = [newOne, newTwo, newThree, newFour]
    const obj = { ...newArrSlice }
    console.log(newArrSlice)
    console.log(obj)
    console.log(obj[0])
    optionData.series[0].data[0].value = obj[0]//电导率
    optionData.series[0].data[1].value = obj[3]//PH值
    optionData.series[0].data[2].value = obj[1]//温度
    optionData.series[0].data[3].value = obj[2]//浑浊度
    console.log(optionData.series[0].data[0].value = obj[0])
  })
}

</script>

<style scoped>
.chart {
  height: 500px;
  margin-top: 30px;
}
.wrapOne {
  position: relative;
  top: 0px; /* 向下移动元素 */
  left: 1000px; /* 向右移动元素 */
}
.button {
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.button:hover {
  background-color: #2ee59d;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>