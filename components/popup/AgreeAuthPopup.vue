<template>
  <view class="container">
    <view class="tips">
      <text>我已阅读并同意《用户服务协议》与《隐私政策》</text>
    </view>
    <view class="btn-group">
      <button class="quit" @click="emits('action', 'close')">退出</button>
      <button class="agree" @click="emits('action', 'agree')">同意</button>
    </view>
  </view>
</template>
<script setup>
const emits = defineEmits(["action"])
</script>

<style scoped lang="scss">
.container {
  width: 648rpx;
  border-radius: 32rpx;
  background: #ffffff;
  overflow: hidden;
}
.tips {
  padding: 76rpx 70rpx 0;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 44.8rpx;
  text-align: center;
}
.btn-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 152rpx;
  button {
    width: 252rpx;
    height: 88rpx;
    border-radius: 200rpx;
    line-height: 88rpx;
    font-size: 32rpx;
  }
  .quit {
    color: #999999;
    background-color: #ffffff;
    border: 1rpx solid #979797;
  }
  .agree {
    color: #ffffff;
    font-weight: 700;
    border: none;
    background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
  }
}
</style>
