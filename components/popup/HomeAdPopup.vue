<script setup>
const emits = defineEmits(["action"])
const props = defineProps({
  popupData: {
    type: Object,
    default() {
      return { title: "提示", tips: "123", buttonText: "立即查看" }
    }
  }
})
</script>
<template>
  <view class="home-ad-popup">
    <text class="title">解锁学习资源礼包</text>
    <view class="tips">
      <text>真题模拟系统</text>
      <uni-icons color="#10C278" type="checkmarkempty" size="25"></uni-icons>
    </view>
    <view class="tips">
      <text>通关资料</text>
      <uni-icons color="#10C278" type="checkmarkempty" size="25"></uni-icons>
    </view>
    <view class="tips">
      <text>教辅教材图书</text>
      <uni-icons color="#10C278" type="checkmarkempty" size="25"></uni-icons>
    </view>
    <view class="tips">
      <text>考试报名</text>
      <uni-icons color="#10C278" type="checkmarkempty" size="25"></uni-icons>
    </view>
    <button class="agree" @click="emits('action', 'btn')">
      {{ props.popupData.buttonText }}
    </button>
    <image class="close" src="/static/close@2x.png" @click="emits('action', 'close')"></image>
    <image class="head-bg" src="/static/information/information-spree.png"></image>
  </view>
</template>

<style scoped lang="scss">
.home-ad-popup {
  position: relative;
  width: 536rpx;
  border-radius: 32rpx;
  background: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 134rpx 56rpx 48rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 500;
  line-height: 50.4rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 32rpx;
}
.tips {
  width: 50%;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: 400;
  letter-spacing: 0rpx;
  line-height: 44.8rpx;
  color: rgba(51, 51, 51, 1);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.agree {
  margin-top: 64rpx;
  width: 536rpx;
  height: 88rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 200rpx;
  background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
}
.close {
  width: 64rpx;
  height: 64rpx;
  position: absolute;
  bottom: -128rpx;
}
.head-bg {
  position: absolute;
  top: -53rpx;
  width: 285rpx;
  height: 210rpx;
}
</style>
