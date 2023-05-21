<script setup>
import { setTitleNViewButtonStyle } from "@/utils/func"
import { nextTick, onMounted, onUnmounted } from "vue"
let stopRightButtonListener

onMounted(() => {
  stopRightButtonListener = setTitleNViewButtonStyle(
    { text: "\ue688", color: "#333333" },
    rightButton
  )
})
onUnmounted(() => {
  stopRightButtonListener?.()
})

let s = 0

function rightButton() {
  s++
  console.log(s)
  setTitleNViewButtonStyle({
    text: s % 2 ? "\ue688" : "\ue68f",
    color: s % 2 ? "#333333" : "#305DDA"
  })
}
</script>

<template>
  <image class="course-img" src="https://img.js.design/assets/img/62314251882e8c6600acde3c.png" />
  <view class="course-price">
    <text class="price">
      <text class="rmb">¥</text>
      <text>1888</text>
    </text>
    <text class="date-text">购课之日起至</text>
    <text class="date">2026-10-31</text>
  </view>
  <view class="receive-information-card">
    <text class="name">2023面试快速提交高班快来报名2023面试</text>
    <view class="box-below">
      <text class="highlight">领取资料</text>
      <text>点击添加学管领取课程资料</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.course-img {
  width: 750rpx;
  height: 412rpx;
}
.course-price {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 104rpx;
  padding: 0 32rpx;
  border-radius: 0rpx 0rpx 16rpx 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  .rmb {
    font-size: 32rpx;
  }
  .price {
    flex: 1 1 auto;
    font-size: 48rpx;
    font-weight: 700;
    line-height: 48rpx;
    color: rgba(235, 61, 61, 1);
  }
  .date-text {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
    margin-right: 8rpx;
  }
  .date {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(235, 61, 61, 1);
  }
}
.receive-information-card {
  margin: 32rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-flow: column nowrap;
  .box-below {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(51, 51, 51, 1);
    background: url("/static/home/arrow@2x.png") no-repeat right center;
    background-size: 14rpx 20rpx;
  }
  .name {
    font-size: 32rpx;
    font-weight: 700;
    line-height: 32rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 32rpx;
  }
  .highlight {
    margin-right: 12rpx;
    padding: 6rpx 8rpx;
    color: rgba(48, 93, 218, 1);
    border-radius: 4rpx;
    background: rgba(48, 93, 218, 0.1);
  }
}
</style>
