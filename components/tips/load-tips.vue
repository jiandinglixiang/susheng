<script setup>
import { LOADING_TEXT } from "@/utils/consts"

const props = defineProps({
  loading: String
})
const hasImage = ["nodata", "loaderror", "networkerror"]
</script>

<template>
  <view class="tip-container" :class="!hasImage.includes(loading) && 'list-loading'">
    <image class="tip-img" v-if="loading === 'nodata'" src="/static/no-data.png"></image>
    <image class="tip-img" v-else-if="loading === 'loaderror'" src="/static/load-error.png"></image>
    <image
      class="tip-img"
      v-else-if="loading === 'networkerror'"
      src="/static/network-error.png"
    ></image>
    <text class="tip-text">{{ LOADING_TEXT[loading] }}</text>
  </view>
</template>

<style scoped lang="scss">
.tip-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 80rpx 0;
}
.tip-img {
  width: 400rpx;
  height: 300rpx;
  margin-bottom: 32rpx;
}
.tip-text {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 28rpx;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}
.list-loading {
  padding: 0;
  .tip-text {
    font-size: 24rpx;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
