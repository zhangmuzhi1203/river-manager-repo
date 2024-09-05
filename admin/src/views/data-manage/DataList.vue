<template>
  <div>
    <el-page-header icon="" title="数据管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 数据列表 </span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="电导率">
          <template #default="scope">
            <span>{{ scope.row.conductance + " S/M" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="PH值">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.ph }}</span>
          </template>
        </el-table-column>
        <el-table-column label="温度">
          <template #default="scope">
            <span style="margin-left: 10px">{{
        scope.row.temperature + " ℃"
      }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浑浊度">
          <template #default="scope">
            <span style="margin-left: 10px">{{
        scope.row.turbidity + " NTU"
      }}</span>
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
      <el-form ref="dataFormRef" :model="dataForm" :rules="dataFormRules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="电导率" prop="conductance">
          <el-input v-model="dataForm.conductance" />
        </el-form-item>
        <el-form-item label="PH值" prop="ph">
          <el-input v-model="dataForm.ph" />
        </el-form-item>
        <el-form-item label="温度" prop="temperature">
          <el-input v-model="dataForm.temperature" />
        </el-form-item>
        <el-form-item label="浑浊度" prop="turbidity">
          <el-input v-model="dataForm.turbidity" />
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
import axios from "axios"
import { reactive, ref, onMounted } from "vue"
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const dataForm = reactive({
  conductance: null,
  ph: null,
  temperature: null,
  turbidity: null,
})
const dataFormRef = ref(null)
const dataFormRules = reactive({
  conductance: [{ required: true, message: '请输入电导率', trigger: 'blur' }],
  ph: [{ required: true, message: '请输入PH值', trigger: 'blur' }],
  temperature: [{ required: true, message: '请输入温度', trigger: 'blur' }],
  turbidity: [{ required: true, message: '请输入浑浊度', trigger: 'blur' }],
})
const tableData = ref([])//对应prop
onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get('http://127.0.0.1:3000/adminapi/data/list')
  tableData.value = res.data.data
}

const handleDelete = async data => {
  await axios.delete(`http://127.0.0.1:3000/adminapi/data/list/${data._id}`)
  getTableData()
}
const handleEdit = async data => {
  const res = await axios.get(`http://127.0.0.1:3000/adminapi/data/list/${data._id}`)
  Object.assign(dataForm, res.data.data[0])
  dialogVisible.value = true
}
const handleEditConfirm = async () => {
  dataFormRef.value.validate(async (valid) => {
    console.log(dataForm)
    if (valid) {
      const res = await axios.put(`http://127.0.0.1:3000/adminapi/data/list/${dataForm._id}`, dataForm)
      console.log(res.data)
      if (res.data.status) {
        dialogVisible.value = false
        getTableData()
        ElMessage.success('编辑成功')
      }
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