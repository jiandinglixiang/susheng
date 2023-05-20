<script setup></script>

<template>
  <view class="nav-bar nav-bar-fixed">
    <image class="handoff" src="/static/home/handoff@2x.png"></image>
    <text>注册会计师</text>
    <image class="weixin" src="/static/home/weixin@2x.png"></image>
    <image class="weixin" src="/static/home/customer@2x.png"></image>
  </view>
  <view class="nav-bar" />
</template>

<style scoped lang="scss">
.nav-bar {
  padding-top: var(--status-bar-height);
  margin-bottom: 12rpx;
  height: 88rpx;
  background: #ffffff;
  z-index: 100;
}

.nav-bar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: 32rpx;
  padding-right: 32rpx;
  background: rgba(255, 255, 255, 1);
  .handoff {
    flex: 0 0 auto;

    margin-right: 8rpx;
    width: 56rpx;
    height: 56rpx;
  }
  .weixin {
    flex: 0 0 auto;
    width: 48rpx;
    height: 48rpx;
    margin-left: 24rpx;
  }
  text {
    flex: 1 1 auto;
    font-size: 36rpx;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
