<script setup></script>

<template>
  <view class="notice">
    <image class="trumpet" src="/static/home/notice@2x.png"></image>
    <view class="content">
      <text>2023年注册会计师马上开始报名了，点击</text>
      <text class="highlight">了解详情</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.notice {
  height: 72rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 32rpx;
  padding: 0 20rpx;
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
}
.trumpet {
  flex: 0 0 auto;
  width: 32rpx;
  height: 32rpx;
  margin-right: 20rpx;
}

.content {
  flex: 1 1 auto;
  font-size: 24rpx;
  line-height: 24rpx;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  word-break: break-all;
}
</style>
