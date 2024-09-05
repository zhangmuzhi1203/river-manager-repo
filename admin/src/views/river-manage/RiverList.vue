<template>
  <div>
    <el-page-header icon="" title="污水管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 污水列表 </span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="rivername" label="污水名称" />
        <el-table-column prop="riveraddress" label="污水地址" />
        <el-table-column label="是否处理">
          <template #default="scope">
            <el-tag v-if="scope.row.ishandle === 1">是</el-tag>
            <el-tag class="ml-2" type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="污染程度">
          <template #default="scope">
            <el-tag class="ml-2" type="success" v-if="scope.row.pollutionlevel === 0">轻度</el-tag>
            <el-tag v-else-if="scope.row.pollutionlevel === 1">中度</el-tag>
            <el-tag class="ml-2" type="danger" v-else>重度</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="污水描述" />
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
      <el-form ref="riverFormRef" :model="riverForm" :rules="riverFormRules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="污水名称" prop="rivername">
          <el-input v-model="riverForm.rivername" />
        </el-form-item>
        <el-form-item label="污水地址" prop="riveraddress">
          <el-input v-model="riverForm.riveraddress" />
        </el-form-item>
        <el-form-item label="是否处理" prop="ishandle">
          <el-select v-model="riverForm.ishandle" class="m-2" placeholder="请选择是或否" style="width: 100%">
            <el-option v-for="item in handleOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="污染程度" prop="pollutionlevel">
          <el-select v-model="riverForm.pollutionlevel" class="m-2" placeholder="请选择污染程度" style="width: 100%">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="污水描述" prop="description">
          <el-input v-model="riverForm.description" :rows="2" type="textarea" placeholder="请输入描述" />
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
import { Edit, Delete } from '@element-plus/icons-vue'
import axios from 'axios'

const riverForm = reactive({
  rivername: '',
  riveraddress: '',
  pollutionlevel: 0,//0轻度 1中度 2重度
  ishandle: 1,//1是 0否
  description: ''
})
const levelOptions = [
  { value: 0, label: '轻度' },
  { value: 1, label: '中度' },
  { value: 2, label: '重度' }
]
const handleOptions = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]
const riverFormRef = ref()
const riverFormRules = reactive({
  rivername: [{ required: true, message: '请输入河流名称', trigger: 'blur' }],
  riveraddress: [{ required: true, message: '请输入河流地址', trigger: 'blur' }],
  pollutionlevel: [{ required: true, message: '请输入污染程度', trigger: 'blur' }],
  ishandle: [{ required: true, message: '请输入是否处理', trigger: 'blur' }],
  description: [{ required: true, message: '请输入河流描述', trigger: 'blur' }]
})
const tableData = ref([])//对应prop
onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get('http://127.0.0.1:3000/adminapi/river/list')
  console.log(res.data.data)
  tableData.value = res.data.data
}
const handleDelete = async data => {
  await axios.delete(`http://127.0.0.1:3000/adminapi/river/list/${data._id}`)
  getTableData()
}
const handleEdit = async data => {
  const res = await axios.get(`http://127.0.0.1:3000/adminapi/river/list/${data._id}`)
  Object.assign(riverForm, res.data.data[0])
  dialogVisible.value = true
}
const handleEditConfirm = async () => {
  riverFormRef.value.validate((valid) => {
    console.log(riverForm)
    if (valid) {
      axios.put(`http://127.0.0.1:3000/adminapi/river/list/${riverForm._id}`, riverForm)
      dialogVisible.value = false
      getTableData()
    }
  })
}
const dialogVisible = ref(false)
</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 30px;
}
</style>