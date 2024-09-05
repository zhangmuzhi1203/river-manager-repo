<template>
  <el-containe direction="vertical">
    <TopHeader />
    <el-container>
      <SideMenu />

      <el-container direction="vertical">
        <el-main>
          <router-view></router-view>
        </el-main>
        <Footer />
      </el-container>
    </el-container>
  </el-containe>
</template>

<script setup>
import TopHeader from '@/components/mainbox/TopHeader.vue'
import SideMenu from '@/components/mainbox/SideMenu.vue'
import Footer from '@/components/mainbox/Footer.vue'
</script>

<style lang="scss" scoped>
.el-main {
  //控制mainbox的高度
  overflow: auto;
  height: calc(90vh - 60px);
}
</style>