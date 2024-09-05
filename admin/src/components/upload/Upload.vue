<template>
  <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
    :auto-upload="false" :on-change="handleChange">
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue"
import { defineEmits, defineProps, computed } from 'vue'
//每次选择完图片之后的回调

const props = defineProps({
  avatar: String
})

const emit = defineEmits(["zmz"])

const uploadAvatar = computed(
  () =>
    props.avatar.includes("blob")
      ? props.avatar
      : "http://localhost:3000" + props.avatar
)

const handleChange = file => {
  emit("zmz", file.raw)
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>
