<template>
  <div>
    <el-page-header icon="" title="用户管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
    </el-page-header>

    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="70px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userForm.phone" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="userForm.gender" class="m-2" placeholder="请选择性别" style="width: 100%">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-select v-model="userForm.role" class="m-2" placeholder="请选择用户权限" style="width: 100%">
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="userForm.introduction" :rows="2" type="textarea" placeholder="请输入个人简介" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const router = useRouter()
const userFormRef = ref()
const userForm = reactive({
  username: '',
  password: '',
  phone: '',
  gender: 2,//默认显示保密
  role: 2,//默认显示普通用户
  introduction: ''
})
const userFormRules = reactive({
  username: [{
    required: true, message: '请输入用户名', trigger: 'blur'
  }],
  password: [{
    required: true, message: '请输入密码', trigger: 'blur'
  }],
  phone: [{
    required: true, message: '请输入手机号', trigger: 'blur'
  }],
  gender: [{
    required: true, message: '请选择性别', trigger: 'blur'
  }],
  role: [{
    required: true, message: '请选择权限', trigger: 'blur'
  }],
  introduction: [{
    required: true, message: '请输入个人简介', trigger: 'blur'
  }]
})
const roleOptions = [
  { value: 1, label: '管理员' },
  { value: 2, label: '普通用户' }
]
const genderOptions = [
  { value: 1, label: '男' },
  { value: 0, label: '女' },
  { value: 2, label: '保密' }
]
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      axios.post('http://127.0.0.1:3000/adminapi/user/add', userForm).then(res => {
        if (res.data.status) {
          console.log(res.data.data)
          ElMessage.success('添加成功')
          router.push('/user-manage/userlist')
        } else {
          ElMessage.error('添加失败')
        }
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>