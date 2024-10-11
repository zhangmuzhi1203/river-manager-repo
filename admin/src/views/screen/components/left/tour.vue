<template>
  <div class="tourBox">
    <div class="tourTitle">
      实时游客统计
    </div>
    <div class="tourImg"></div>
    <div class="total">
      可预约总量<span>999999</span>人
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let people = ref('415900人')
//水球图拓展插件
let charts = ref()
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value);
  let value = 0.43;
  //设置实例的配置项
  mycharts.setOption({

    title: {
      text: value + "%",
      textStyle: {
        fontSize: 20,
        fontFamily: "Microsoft Yahei",
        fontWeight: "normal",
        color: "#fff",
      },
      x: "center",
      y: "48%",
    },
    series: [
      {
        type: "liquidFill", //配置echarts图类型
        radius: "60%",
        center: ["50%", "50%"],
        //  shape: 'roundRect',// 设置水球图类型（矩形[rect]，菱形[diamond]，三角形[triangle]，水滴状[pin],箭头[arrow]...） 默认为圆形
        data: [0.5, 0.5],  //设置波浪的值 
        //waveAnimation:false, //静止的波浪
        backgroundStyle: {
          borderWidth: 1,
          color: "transparent",//水球图内部背景色
        },
        outline: {
          borderDistance: 10,
          itemStyle: {
            borderWidth: 4,
            borderColor: "#5acef2",
          },
        },
        color: [ //波浪颜色
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "rgba(6, 187, 112, 0.3)", //下
              },
              {
                offset: 0,
                color: "rgba(11, 201, 199, 0.3)",
              },
            ],
            globalCoord: false,
          },
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: "rgba(6, 187, 112, 1)", //下
              },
              {
                offset: 0,
                color: "rgba(11, 201, 199, 1)",
              },
            ],
            globalCoord: false,
          },
        ],
        label: {
          normal: {
            formatter: "",
          },
        },
      },

    ],
  })
})
</script>

<style scoped lang="scss">
.tourBox {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  color: white;
  margin-top: 10px;

  .tourTitle {
    font-size: 20px;
  }

  .tourImg {
    background: url('../../images/dataScreen-title.png') no-repeat;
    background-size: 100% 100%;
    width: 68px;
    height: 7px;
    margin-top: 10px;
  }

  .total {
    float: right;
    font-size: 20px;

    span {
      font-style: italic;
      color: yellowgreen;
    }
  }

  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;

    span {
      line-height: 40px;
      height: 40px;
      flex: 1;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .charts {
    width: 100%;
    height: 255px;
  }
}
</style>