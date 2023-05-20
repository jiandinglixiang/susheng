<script setup>
const props = defineProps({
  leftText: String,
  navUrl: String
})
function navigateTo() {
  uni.navigateTo({ url: props.navUrl })
}
</script>

<template>
  <view class="section-bar">
    <text class="title">{{ props.leftText }}</text>
    <text class="more" @click="navigateTo">更多</text>
  </view>
</template>

<style scoped lang="scss">
.section-bar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 32rpx 32rpx;
  .title {
    flex: 1 1 auto;
    font-size: 36rpx;
    font-weight: 500;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
  }
  .more {
    flex: 0 0 auto;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(153, 153, 153, 1);
    padding-right: 22rpx;
    background: url("/static/home/arrow@2x.png") no-repeat right center;
    background-size: 14rpx 20rpx;
  }
}
</style>
