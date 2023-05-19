<script setup>
const emits = defineEmits(["action"])
const props = defineProps({
  popupData: {
    type: Object,
    default() {
      return { title: "提示", tips: "", buttonText: "去登录" }
    }
  }
})
</script>
<template>
  <view class="LoginTips-container">
    <text class="title">{{ props.popupData.title }}</text>
    <view v-if="!props.popupData.tips.includes('<text>')" class="tips">
      <text>{{ props.popupData.tips }}</text>
    </view>
    <rich-text v-else class="tips" :nodes="props.popupData.tips"></rich-text>
      {{props.popupData.tips}}
    <button class="agree" @click="emits('action', 'btn')">
      {{ props.popupData.buttonText }}
    </button>
    <image class="close" src="/static/close@2x.png" @click="emits('action', 'close')"></image>
  </view>
</template>

<style scoped lang="scss">
.LoginTips-container {
  position: relative;
  width: 536rpx;
  border-radius: 32rpx;
  background: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 48rpx 56rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 500;
  line-height: 50.4rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 32rpx;
}
.tips {
  font-size: 32rpx;
  font-weight: 400;
  line-height: 44.8rpx;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-bottom: 48rpx;
}
.agree {
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
</style>
