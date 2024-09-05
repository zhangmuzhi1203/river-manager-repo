<template>
  <div>
    <el-page-header icon="" title="水清乡愿——助力乡村振兴" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>

    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎
            {{
          store.state.userInfo.username === "zmz"
            ? "张牧之"
            : store.state.userInfo.username
        }}
            回来,
            {{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="container">
        <h1>水清乡愿——助力乡村振兴</h1>
        <p style="font-weight: 700">
          &emsp;&emsp;水清乡愿是一款环保型污水处理和检测系统，
          旨在助力乡村振兴并践行社会主义核心价值观。在当今社会，
          乡村振兴已成为我国发展的重要战略，而环境保护和卫生健康是乡村振兴的重要组成部分。
          清乡水愿系统通过创新技术和智能化管理，为乡村地区提供了一种高效、可持续的污水处理和检测解决方案。
        </p>
        <a href="#">Learn more</a>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const avatarUrl = computed(
  () =>
    store.state.userInfo.avatar
      ? 'http://localhost:3000' + store.state.userInfo.avatar
      : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
const welcomeText = computed(
  () => new Date().getHours() < 12
    ? '新的一天要开开心心哦.'
    : '工作这么长时间，记得活动一下哦'
)

</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 30px;
}

.container {
  text-align: center;
  color: var(--color);
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80);
  background-size: cover;
  background-position: center;

  /*  this is where the magic happens:  */
  background-attachment: fixed;
}

h1 {
  font-weight: 700;
  font-size: 3rem;
}

p {
  max-width: 52ch;
  line-height: 1.5;
  padding: 1em;
}

a {
  display: inline-block;
  padding: 1em 3.5em;
  background-color: var(--color);
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 0.3em;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
}
</style>