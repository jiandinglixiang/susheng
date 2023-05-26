<script setup>
import { setTitleNViewButtonStyle } from "@/utils/func"
import { nextTick, onUnmounted } from "vue"
import FixedFab from "@/components/fab/FixedFab.vue"
import { httpRequest } from "@/utils/http"
import { POST_VIDEO_LIST_CLASSHOUR } from "@/api"
import { onLoad } from "@dcloudio/uni-app"
let stopRightButtonListener

onLoad((options) => {
  httpRequest(POST_VIDEO_LIST_CLASSHOUR, "POST", { id: options.id })
  nextTick(() => {
    uni.setNavigationBarTitle({ title: "" })
  })
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
  <view>
    <fixed-fab />
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
    <view class="detailed-catalog">
      <text class="highlight">课程详情</text>
      <text>课程目录</text>
    </view>
    <view class="sub-name">- 课程内容 -</view>
    <uni-collapse>
      <uni-collapse-item
        :border="false"
        class="collapse-item"
        title="默认开启"
        title-border="none"
        v-for="i in 5"
      >
        <view class="collapse-content-item bottom-border" v-for="i in 4">
          <view class="box-left">
            <view class="name highlight">
              <image class="playing" src="/static/course/playing@2x.png"></image>
              执业医师考试复习规划
            </view>
            <view class="time-people">
              <image class="time" src="/static/course/time-icon@2x.png"></image>
              <text class="time-text">23:58</text>
              <image class="people" src="/static/course/people-number@2x.png"></image>
              <text class="people-text">666人</text>
            </view>
          </view>
          <view class="box-right">
            <!--待学习-->
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<style scoped lang="scss">
.course-img {
  width: 750rpx;
  height: 412rpx;
}
.sub-name {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 24rpx;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  margin-bottom: 20rpx;
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
.detailed-catalog {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin: 0 32rpx 32rpx;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 28rpx;
  color: rgba(153, 153, 153, 1);
  text {
    height: 42rpx;
    position: relative;
    margin-right: 32rpx;
  }
  .highlight {
    color: rgba(51, 51, 51, 1);
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32rpx;
      height: 6rpx;
      border-radius: 4rpx;
      background: rgba(48, 93, 218, 1);
    }
  }
}
.collapse-item {
  overflow: hidden;
  margin: 0 32rpx 16rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.07);
  :deep(.uni-collapse-item__wrap-content) {
    padding-bottom: 24rpx;
  }
  :deep(.uni-collapse-item__title-text) {
    font-size: 32rpx;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }
  :deep(.uni-collapse-item__title-arrow) {
    uni-text {
      display: none;
    }
    background: url("/static/home/arrow@2x.png") no-repeat center center;
    background-size: 14rpx 20rpx;
    &.uni-collapse-item__title-arrow-active {
      transform: rotate(90deg);
    }
  }
}
.collapse-content-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  box-sizing: border-box;
  height: 120rpx;
  margin: 0 32rpx;
  padding: 24rpx 0;
  &.bottom-border {
    border-bottom: 4rpx solid rgba(238, 238, 238, 1);
  }
  .box-left {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
  }
  .playing {
    display: inline-block;
    width: 20rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }
  .name {
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 16rpx;
  }
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
  .time-people {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .time {
    flex: 0 0 auto;
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
  }
  .time-text,
  people-text {
    flex: 0 0 auto;
    margin-right: 18rpx;
    vertical-align: bottom;
  }
  .people {
    flex: 0 0 auto;
    width: 20rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }

  .box-right {
    flex: 0 0 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(255, 139, 23, 1);
    padding-left: 48rpx;
    height: 40rpx;
    background: url("/static/course/play-with-learning@2x.png") no-repeat left center;
    background-size: 40rpx 40rpx;
    &:after {
      content: "待学习";
    }
    &.status-end {
      color: rgba(204, 204, 204, 1);
      background-image: url("/static/course/video-play3.png");
      &:after {
        content: "已学完";
      }
    }
    &.status-ing {
      color: rgba(48, 93, 218, 1);
      background-image: url("/static/course/video-play@2x.png");
      &:after {
        content: "学习中";
      }
    }
  }
}
</style>
