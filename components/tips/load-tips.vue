<script setup>
const props = defineProps({
  type: String
})
const typeText = {
  loadError: "当前数据加载失败，请退出重试",
  noData: "暂无数据，您先看看其他内容～",
  networkError: "网络好像出小差了"
}
</script>

<template>
  <view class="tip-container">
    <image class="tip-img" v-if="props.type === 'noData'" src="/static/no-data.png"></image>
    <image
      class="tip-img"
      v-else-if="props.type === 'loadError'"
      src="/static/load-error.png"
    ></image>
    <image
      class="tip-img"
      v-else-if="props.type === 'networkError'"
      src="/static/network-error.png"
    ></image>
    <text class="tip-text">{{ typeText[props.type] }}</text>
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
</style>
