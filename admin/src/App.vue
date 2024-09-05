<template>
  <!-- 具体来说，当你在应用中浏览不同的路由路径时，
    <router-view> 将根据当前路由匹配的组件来动态渲染和展示内容。
    这使你能够实现页面切换而不需要加载整个新页面，从而提供了更快的用户体验。
   -->
  <router-view />
</template>

<script setup>
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: darkgray;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
