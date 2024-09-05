<template>
  <div class="login_container ">
    <el-row>
      <el-col :span="7" :xs="0"></el-col>
      <el-col :span="17" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <h1>水清乡愿在线管理平台</h1>
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="btn_login" @click="login">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
//引入封装的获取时间推断早晨上午下午晚上的函数
import { getTime } from '../util/getTime'
const store = useStore()
const router = useRouter()
const loginForm = reactive({
  username: 'zmz',
  password: '12345678'
})
const loginFormRef = ref([]) //表单的引用对象
//点击加载效果
let loading = ref(false)
//自定义校验规则函数
const validatorUserName = (rule, value, callback) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  console.log(rule)
  if (value.length >= 3) {
    callback()
  } else {
    callback(new Error('账号长度至少三位'))
  }
}
const validatorPassword = (rule, value, callback) => {
  console.log(rule)
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少八位'))
  }
}
const loginRules = reactive({
  username: [
    { trigger: 'change', validator: validatorUserName, required: true }
  ],
  password: [
    { trigger: 'change', validator: validatorPassword, required: true }
  ]
})
//提交表单函数
const login = () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      //登录时加载效果开启
      loading.value = true
      const res = await axios.post('http://127.0.0.1:3000/adminapi/user/login', loginForm)
      console.log(res.data)
      if (res.data.status) {
        store.commit('changeUserInfo', res.data.data)
        store.commit('changeGetterRouter', false)
        router.push('/index')
        //登录成功后的通知
        ElNotification({
          type: 'success',
          message: '登录成功',
          title: `hi ${getTime()}好`,
          duration: 2000
        })
        //登录成功后加载效果关闭
        loading.value = false
      } else {
        //请求失败->弹出登录失败信息
        //登录失败后的提示信息
        ElNotification({
          type: 'error',
          message: '登录失败',
          duration: 2000
        })
        //登录失败后加载效果关闭
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login_container {
  height: 100vh;
  width: 100%;
  background: url('@/assets/images/beijingtu.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 35vh;
    width: 60%;
    padding: 20px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
  }

  h1 {
    margin: 20px 0;
    color: white;
    font-size: 30px;
    text-align: center;
  }

  .btn_login {
    width: 100%;
  }
}
</style>