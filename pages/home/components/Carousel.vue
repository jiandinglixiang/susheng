<script setup>
import { ref } from "vue"

const info = [
  {
    colorClass: "uni-bg-red",
    url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 A"
  },
  {
    colorClass: "uni-bg-green",
    url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 B"
  },
  {
    colorClass: "uni-bg-blue",
    url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
    content: "内容 C"
  }
]
const dotsStyles = {
  border: "none",
  selectedBorder: "none",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  selectedBackgroundColor: "rgba(255, 255, 255, 1)"
}
const current = ref(1)
function change(event) {
  current.value = event.detail.current
}
function handleClick() {}
</script>

<template>
  <uni-swiper-dot
    class="uni-swiper-dot-box"
    :info="info"
    mode="round"
    :dotsStyles="dotsStyles"
    :current="current"
  >
    <swiper
      class="swiper-box"
      circular
      previous-margin="16px"
      next-margin="16px"
      :current="current"
      @change="change"
      autoplay
    >
      <swiper-item v-for="(item, index) in info" :key="index" @click="handleClick">
        <view class="swiper-item">
          <image class="swiper-img" :src="item.url"></image>
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<style scoped lang="scss">
.uni-swiper-dot-box {
  margin-bottom: 32rpx;
}
.swiper-box {
  height: 300rpx;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  padding: 0 8px;
}

.swiper-img {
  overflow: hidden;
  border-radius: 16rpx;
  flex: 1 1 auto;
  width: 100%;
}
</style>
