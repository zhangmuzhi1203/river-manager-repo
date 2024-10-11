<template>
  <div>
    <el-page-header icon="" title="实时检测" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 检测数据 </span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-row>
        <div class="wrapOne">
          <el-button class="button my_btn" @click="getData()">Get Data</el-button>
        </div>
      </el-row>
      <el-row :gutter="20" class="el-row">
        <el-col :span="6">
          <el-image style="width: 150px; height: 130px" src="https://i.postimg.cc/L5cfYYgK/image.png" :fit="fit" />
          <h3 class="my_h">
            {{
              store.state.cloudServerInfo[0]
                ? store.state.cloudServerInfo[0] + " S/M"
                : 0 + " S/M"
            }}
          </h3>
        </el-col>

        <el-col :span="6"><el-image style="width: 150px; height: 130px" src="https://i.postimg.cc/8kRdf5KN/image.png"
            :fit="fit" />
          <h3 class="my_h">
            {{
              store.state.cloudServerInfo[1]
                ? store.state.cloudServerInfo[1] + " ℃"
                : 0 + " ℃"
            }}
          </h3>
        </el-col>

        <el-col :span="6"><el-image style="width: 150px; height: 130px" src="https://i.postimg.cc/TYx9tmLK/image.png"
            :fit="fit" />
          <h3 class="my_h">
            {{
              store.state.cloudServerInfo[2]
                ? store.state.cloudServerInfo[2] * 10 + " NTU"
                : 0 + " NTU"
            }}
          </h3>
        </el-col>
        <el-col :span="6"><el-image style="width: 150px; height: 130px" src="https://i.postimg.cc/qRnsLMpc/pH.png"
            :fit="fit" />
          <h3 class="my_h">
            {{
              store.state.cloudServerInfo[3]
                ? store.state.cloudServerInfo[3] + " PH"
                : 0 + " PH"
            }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <h1>硬件设备</h1>
      </template>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in imgArray" :key="item">
          <img :src="item.imgUrl" style="width: 580px; height: 300px" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import axios from "axios"
import router from "@/router"
const store = useStore()
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
    console.log(newArr)
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
    store.commit('changeCloudServerInfo', obj)
    let dataCloud = {
      conductance: store.state.cloudServerInfo[0],
      temperature: store.state.cloudServerInfo[1],
      turbidity: store.state.cloudServerInfo[2],
      ph: store.state.cloudServerInfo[3],
    }
    console.log(dataCloud)
    axios.post('http://127.0.0.1:3000/adminapi/data/addcloud', dataCloud).then(res => {
      console.log(res.data.data)
      if (router.currentRoute.value.path === '/monitor') {
        setTimeout(() => {
          router.push('/data-manage/datalist')
        }, 50000)
      }
    })
  })
}
const imgArray = [
  {
    imgUrl: 'https://i.postimg.cc/dQZDCKK9/image.png'
  },
  {
    imgUrl: 'https://i.postimg.cc/HWbdHWgF/image.png'
  },
  {
    imgUrl: 'https://i.postimg.cc/3xxTggvH/image.png'
  },
  {
    imgUrl: 'https://i.postimg.cc/y8pznkm3/ph.png'
  },
  {
    imgUrl: 'https://i.postimg.cc/RC15yP1B/wifi.png'
  },
]
</script>
<style scoped>
.box-card {
  margin-top: 30px;
}

.wrapOne {
  position: relative;
  top: 0px;
  /* 向下移动元素 */
  left: 0px;
  /* 向右移动元素 */
}

.wrapTwo {
  position: relative;
  top: 0px;
  /* 向下移动元素 */
  left: 0px;
  /* 向右移动元素 */
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

.my_h {
  position: relative;
  top: 0px;
  left: 50px;
}

.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
