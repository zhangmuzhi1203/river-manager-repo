<template>
  <div>
    <el-page-header icon="" title="环保方案" font="500px">
      <template #content>
        <span class="text-large font-600 mr-3"> 方案列表 </span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <div class="filter-menu text-center mb-40" style="text-align: center">
        <h4>根据水质参数确定环保方案</h4>
      </div>
    </el-card>
    <div class="wrapper">
      <div class="card">
        <div class="poster">
          <img src="https://img.picui.cn/free/2024/09/04/66d830a4976f6.jpg" />
        </div>
        <div class="details">
          <h1>电导率</h1>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="tags">
            <span class="tag">离子</span>
            <span class="tag">有害物质</span>
            <span class="tag">金属</span>
          </div>
          <p class="desc">
            一般情况下，地表水的电导率通常在 50 μS/cm 到 1500 μS/cm 之间
            初步处理：可以采用格栅、沉砂池等物理处理方法，去除水中的悬浮颗粒物。
            生物处理：生物滤池，通过微生物降解有机物质。
            离子交换：使用离子交换树脂去除水中的离子，特别是硬度离子（如钙、镁离子）。
            反渗透：反渗透膜可以有效地过滤掉大多数溶解性离子。
          </p>
        </div>
      </div>
      <div class="card">
        <div class="poster">
          <img src="https://img.picui.cn/free/2024/09/04/66d830a4825b6.jpg" alt="Location Unknown" />
        </div>
        <div class="details">
          <h1>浑浊度</h1>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="tags">
            <span class="tag">悬浮颗粒</span>
            <span class="tag">密度</span>
            <span class="tag">体积</span>
          </div>
          <p class="desc">
            沉淀： 利用沉淀池或沉淀槽，使悬浮颗粒物沉降到水底 过滤：
            使用物理过滤设备，如砂滤、过滤器等，将水通过过滤介质，将悬浮物质拦截下来。
            生物絮凝：
            利用微生物的作用，通过生物絮凝剂促使悬浮物聚结成较大的颗粒.
            植物沉淀：
            通过适当的植物，如芦苇、莎草等，帮助水体中的颗粒物质沉淀。
          </p>
        </div>
      </div>
      <div class="card">
        <div class="poster">
          <img src="https://img.picui.cn/free/2024/09/04/66d830a49b551.jpg" alt="Location Unknown" />
        </div>
        <div class="details">
          <h1>PH值</h1>
          <div class="rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <div class="tags">
            <span class="tag yellow">大于7</span>
            <span class="tag">小于7</span>
            <span class="tag blue">近似7</span>
          </div>
          <p class="desc">
            PH值过高：酸性处理
            注入二氧化碳，促使水体中的碱性物质与二氧化碳发生反应生成碳酸，从而降低
            pH 值。 这是一种相对温和的调整方式，常用于饮用水处理。植物修复
            PH值过低：碱性处理
            使用石灰（氢氧化钙）来中和酸性水体，生成碳酸钙。利用适当的微生物群，使其代谢产生碱性物质，从而中和酸性水体。这是一种常见的中和方法，适用于处理含酸性物质的废水。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 30px;
}

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.card {
  position: relative;
  width: 325px;
  height: 450px;
  background: #000;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.poster {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.poster::before {
  content: "";
  position: absolute;
  bottom: -45%;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: 0.3s;
}

.card:hover .poster::before {
  bottom: 0;
}

.poster img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.card:hover .poster img {
  transform: scale(1.1);
}

.details {
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: auto;
  padding: 1.5em 1.5em 2em;
  background: #000a;
  backdrop-filter: blur(16px) saturate(120%);
  transition: 0.3s;
  color: #fff;
  z-index: 2;
}

.card:hover .details {
  bottom: 0;
}

.details h1,
.details h2 {
  font-weight: 700;
}

.details h1 {
  font-size: 1.5em;
  margin-bottom: 5px;
}

.details h2 {
  font-weight: 400;
  font-size: 1em;
  margin-bottom: 10px;
  opacity: 0.6;
}

.details .rating {
  position: relative;
  margin-bottom: 15px;
  display: flex;
  gap: 0.25em;
}

.details .rating i {
  color: #e3c414;
}

.details .rating span {
  margin-left: 0.25em;
}

.details .tags {
  display: flex;
  gap: 0.375em;
  margin-bottom: 0.875em;
  font-size: 0.85em;
}

.details .tags span {
  padding: 0.35rem 0.65rem;
  color: #fff;
  border: 1.5px solid rgba(255 255 255 / 0.4);
  border-radius: 4px;
  border-radius: 50px;
}

.details .desc {
  color: #fff;
  opacity: 0.8;
  line-height: 1.5;
  margin-bottom: 1em;
}

.details .cast h3 {
  margin-bottom: 0.5em;
}

.details .cast ul {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  width: 100%;
}

.details .cast ul li {
  list-style: none;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid #fff;
}

.details .cast ul li img {
  width: 100%;
  height: 100%;
}
</style>