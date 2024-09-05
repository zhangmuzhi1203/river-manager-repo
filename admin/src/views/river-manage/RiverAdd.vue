<template>
  <div>
    <el-page-header icon="" title="污水管理" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加污水 </span>
      </template>
    </el-page-header>
    <el-form ref="riverFormRef" :model="riverForm" :rules="riverFormRules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="污水名称" prop="rivername">
        <el-input v-model="riverForm.rivername" />
      </el-form-item>
      <el-form-item label="是否处理" prop="ishandle">
        <el-select v-model="riverForm.ishandle" class="m-2" placeholder="请选择是或否" style="width: 100%"
          placement="top-start">
          <el-option v-for="item in handleOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="污染程度" prop="pollutionlevel">
        <el-select v-model="riverForm.pollutionlevel" class="m-2" placeholder="请选择污染级别" style="width: 100%"
          placement="top-start">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="riveraddress">
        <el-input v-model="riverForm.riveraddress" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <RiverDescription @event="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加污水</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import RiverDescription from '@/components/riveredit/RiverDescription.vue'
import router from '@/router'
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
const submitForm = () => {
  riverFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(riverForm)
      axios.post('http://127.0.0.1:3000/adminapi/river/add', riverForm).then(res => {
        console.log(res.data.data)
        router.push('/river-manage/riverlist')
      })
    }
  })
}
//每次editor内容改变的回调
const handleChange = data => {
  // console.log(data)
  riverForm.description = data
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>