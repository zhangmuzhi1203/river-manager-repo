<template>
  <div class="genderBox">
    <div class="gTitle">男女比例</div>
    <div class="gImg"></div>
    <div class="sex">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png">
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../images/woman.png">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref='charts'></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
//获取图形图标的DOM节点
let charts = ref();
onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value);
  //设置配置项
  mycharts.setOption({
    //组件标题
    title: {
      text: '男女比例',//主标题
      textStyle: {//主标题颜色
        color: 'skyblue'
      },
      left: '40%'
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      }
      ,
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  });
})
</script>

<style scoped lang="scss">
.genderBox {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  color: white;

  .gTitle {
    font-size: 20px;
  }

  .gImg {
    background: url('../../images/dataScreen-title.png') no-repeat;
    background-size: 100% 100%;
    width: 68px;
    height: 7px;
    margin-top: 10px;
  }

  .sex {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 5px;

    p {
      margin-bottom: 35px;
    }

    .man {
      width: 111px;
      height: 115px;
      background: url('../../images/man-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .woman {
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: space-around;
    color: white;
  }

  .charts {
    height: 100px;
    padding: 0 70px;
  }
}
</style>