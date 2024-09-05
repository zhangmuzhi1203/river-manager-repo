<template>
  <div>
    <el-page-header icon="" title="用户管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 用户列表 </span>
      </template>
    </el-page-header>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="性别">
          <!-- scope.row表示拿到是每一行 即一个对象 -->
          <template #default="scope">
            <span v-if="scope.row.gender === 1">男</span>
            <span v-else-if="scope.row.gender === 0">女</span>
            <span v-else>保密</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" />
        <el-table-column prop="introduction" label="简介" />
        <el-table-column label="权限">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
            <el-tag v-else>用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" circle @click="handleEdit(scope.row)"></el-button>
            <el-popconfirm title="你确定要删除吗?" confirm-button-text="确定" cancel-button-text="取消"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button type="danger" :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="编辑" width="50%" :before-close="handleClose">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select v-model="userForm.role" class="m-2" placeholder="请选择用户权限" style="width: 100%">
            <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="userForm.introduction" :rows="2" type="textarea" placeholder="请输入个人简介" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { Edit, Delete } from '@element-plus/icons-vue'
const userForm = reactive({
  username: '',
  phone: '',
  role: 2,
  introduction: ''
})
//判断权限
const roleOptions = [
  { value: 1, label: '管理员' },
  { value: 2, label: '普通用户' }
]
const userFormRef = ref()
const userFormRules = reactive({
  username: [{
    required: true, message: '请输入用户名', trigger: 'blur'
  }],
  phone: [{
    required: true, message: '请输入手机号', trigger: 'blur'
  }],
  role: [{
    required: true, message: '请选择权限', trigger: 'blur'
  }],
  introduction: [{
    required: true, message: '请输入个人简介', trigger: 'blur'
  }]
})
const tableData = ref([])//对应prop
onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get('http://127.0.0.1:3000/adminapi/user/list')
  console.log(res.data.data)
  tableData.value = res.data.data
}
//编辑回调
const handleEdit = async data => {
  const res = await axios.get(`http://127.0.0.1:3000/adminapi/user/list/${data._id}`)
  console.log(res.data.data)
  Object.assign(userForm, res.data.data[0])
  dialogVisible.value = true
}
//编辑确认回调
const handleEditConfirm = () => {
  userFormRef.value.validate((valid) => {
    console.log(userForm)
    if (valid) {
      axios.put(`http://127.0.0.1:3000/adminapi/user/list/${userForm._id}`, userForm)
      dialogVisible.value = false
      getTableData()
    }
  })
}
//删除回调
const handleDelete = async data => {
  await axios.delete(`http://127.0.0.1:3000/adminapi/user/list/${data._id}`)
  getTableData()
}
const dialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 30px;
}
</style>