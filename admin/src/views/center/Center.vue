<template>
  <div>
    <el-page-header icon="" title="水清乡愿——助力乡村振兴" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username === "zmz"
      ? "张牧之"
      : store.state.userInfo.username }}</h3>
          <h5>{{ store.state.userInfo.role === 1 ? "管理员" : "普通用户" }}</h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>

          <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" />
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" class="m-2" placeholder="请选择性别" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="简介" prop="introduction">
              <el-input v-model="userForm.introduction" :rows="2" type="textarea" placeholder="请输入个人简介" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @zmz="handleChange" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { computed, ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import upload from "../../util/upload"
import Upload from '../../components/upload/Upload.vue'
const store = useStore()
const { _id, username, phone, gender, introduction, avatar } = store.state.userInfo
console.log(avatar, _id, username)
const userFormRef = ref()
const userForm = reactive(
  {
    _id,
    username,
    avatar,
    phone,
    gender,
    introduction,
    file: null
  }
)
const userFormRules = reactive({
  username: [
    //blur:通常表示当一个元素失去焦点时触发的事件
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  phone: [{
    required: true, message: '请输入手机号', trigger: 'blur'
  }],
  gender: [{
    required: true, message: '请输入性别', trigger: 'blur'
  }],
  introduction: [{
    required: true, message: '请输入个人简介', trigger: 'blur'
  }]
})
const avatarUrl = computed(
  () =>
    store.state.userInfo.avatar
      ? "http://localhost:3000" + store.state.userInfo.avatar
      : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
//选择性别
const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  },
  {
    label: '保密',
    value: 2
  }
]

//每次选择完图片之后的回调
const handleChange = file => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
//提交表单进行更新
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(valid)
      const res = await upload("http://127.0.0.1:3000/adminapi/user/upload", userForm)
      console.log(res)
      if (res.status) {
        store.commit("changeUserInfo", res.data)
        ElMessage.success("更新成功")
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }
}
</style>