<template>
  <el-aside :width="$store.state.isCollapsed ? '45px' : '240px'">
    <el-menu
      :collapse="$store.state.isCollapsed"
      :router="true"
      :collapes-transition="false"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/center">
        <el-icon><UserFilled /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-menu-item index="/monitor">
        <el-icon><Stopwatch /></el-icon>
        <span>实时检测</span>
      </el-menu-item>

      <el-menu-item index="/aihandle">
        <el-icon><Comment /></el-icon>
        <span>环保方案</span>
      </el-menu-item>

      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/river-manage">
        <template #title>
          <el-icon><Finished /></el-icon>
          <span>污水管理</span>
        </template>
        <el-menu-item index="/river-manage/addriver">添加污水</el-menu-item>
        <el-menu-item index="/river-manage/riverlist">污水列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/data-manage">
        <template #title>
          <el-icon><Coin /></el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/data-manage/adddata">添加数据</el-menu-item>
        <el-menu-item index="/data-manage/datalist">数据列表</el-menu-item>
        <el-menu-item index="/data-manage/datarequire">数据展示</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import { HomeFilled, UserFilled, Finished, User, Coin, Stopwatch, Comment } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const vAdmin = {
  mounted (el) {
    // console.log(el)
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-aside {
  height: 90vh;

  .el-menu {
    height: 90vh;
  }
}
</style>