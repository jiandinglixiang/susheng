<script setup>
import InformationItem from "@/components/information/InformationItem.vue"

function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <uni-nav-bar
    title="考试资讯"
    :fixed="true"
    left-icon="back"
    :border="false"
    right-width="164rpx"
    @clickLeft="navigateBack"
    @clickRight="navigateBack"
    class="nav-bar"
  >
    <template v-slot:right>
      <view class="right-btn">在线考友</view>
    </template>
  </uni-nav-bar>
  <view style="height: 16rpx" />
  <information-item />
  <information-item />
  <information-item />
  <information-item />
</template>

<style scoped lang="scss">
.nav-bar {
  :deep(.uni-nav-bar-text) {
    font-size: 36rpx;
    font-weight: 500;
  }
}
.right-btn {
  box-sizing: border-box;
  width: 164rpx;
  height: 56rpx;
  border-radius: 200rpx;
  border: 1rpx solid rgba(48, 93, 218, 1);
  font-size: 24rpx;
  font-weight: 500;
  line-height: 56rpx;
  color: rgba(48, 93, 218, 1);
  padding-left: 52rpx;
  background: url("/static/information/test-friend@2x.png") rgba(48, 93, 218, 0.08) no-repeat 16rpx
    center;
  background-size: 32rpx 32rpx;
}
</style>
