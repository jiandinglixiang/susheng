<script setup>
function navigateTo() {
  uni.navigateTo({ url: "/pages/information/detail" })
}
</script>

<template>
  <view class="information-item" @click="navigateTo">
    <view class="left-content">
      <text class="title">高顿教育与上海财高顿教育与上海财高顿教育与上海财高顿教育与上海财</text>
      <text class="time">9月23日</text>
      <text class="read">阅读7.5万</text>
    </view>
    <image
      v-if="Date.now() % 2"
      class="right-img"
      src="https://img.js.design/assets/img/6231425565c2ad7efe9bd6b6.png"
    />
  </view>
</template>

<style scoped lang="scss">
.information-item {
  margin: 0 32rpx 32rpx;
  display: flex;
  flex-flow: row nowrap;
  border-bottom: 2rpx solid rgba(238, 238, 238, 1);
}
.left-content {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  .title {
    width: 100%;
    flex: 1 1 auto;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 44rpx;
    color: rgba(51, 51, 51, 1);
    max-height: 96rpx;
    margin-bottom: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time,
  .read {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: rgba(153, 153, 153, 1);
    margin-right: 18rpx;
    margin-bottom: 32rpx;
  }
}

.right-img {
  flex: 0 0 auto;
  border-radius: 4rpx;
  width: 218rpx;
  height: 156rpx;
  margin-left: 16rpx;
}
</style>
