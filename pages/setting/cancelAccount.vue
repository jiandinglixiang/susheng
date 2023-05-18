<script setup>
import { ref } from "vue"

const a = ref(1)
</script>

<template>
  <view class="cancel-step1">
    <view class="why">请选择注销原因</view>
    <view v-for="i in 7" class="checkbox-custom">
      <view class="selected" />
      <text class="name">{{ i }}</text>
    </view>
    <view class="warn">
      <image src="/static/setting/Icon_my_remind@2x.png"></image>
      <text>请选择注销原因</text>
    </view>
    <button class="btn-next">下一步</button>
  </view>
</template>

<style scoped lang="scss">
page {
  background-color: #ffffff;
}
.cancel-step1 {
  padding: 50rpx 32rpx 0;
}
.why {
  font-size: 32rpx;
  font-weight: 500;
  line-height: 56rpx;
  color: rgba(51, 51, 51, 1);
}
.warn {
  margin-top: 32rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 24rpx;
  color: rgba(235, 61, 61, 1);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  image {
    width: 28rpx;
    height: 28rpx;
  }
}
.checkbox-custom {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 80rpx;

  .name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 50rpx;
    color: rgba(51, 51, 51, 1);
    margin-left: 16rpx;
    flex: 1 1 auto;
  }
  .unselected {
    width: 48rpx;
    height: 48rpx;
    background: url("/static/setting/unselected.png") no-repeat left top;
    background-size: 100% auto;
  }
  .selected {
    width: 48rpx;
    height: 48rpx;
    background: url("/static/setting/selected.png") no-repeat left top;
    background-size: 100% auto;
  }
}

.btn-next {
  position: fixed;
  bottom: 78rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 520rpx;
  height: 88rpx;
  border: none;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 88rpx;
  color: rgba(255, 255, 255, 1);
  border-radius: 44rpx;
  background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
}
</style>
