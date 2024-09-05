<template>
  <div>
    <el-page-header icon="" title="数据管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加数据 </span>
      </template>
    </el-page-header>
    <el-form ref="dataFormRef" :model="dataForm" :rules="dataFormRules" label-width="70px" class="demo-ruleForm">
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

      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import router from '@/router'
import { reactive, ref } from 'vue'
import axios from 'axios'
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
const submitForm = () => {
  dataFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(dataForm)
      const res = await axios.post('http://127.0.0.1:3000/adminapi/data/add', dataForm)
      console.log(res.data.data)
      if (res.data.status) {
        router.push('/data-manage/datalist')
        ElMessage.success('添加成功')
      } else {
        ElMessage.error('添加失败')
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>