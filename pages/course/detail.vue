<script setup>
import parseHtml from "@/static/js/html-parser"
import { computed, nextTick, ref } from "vue"
import FixedFab from "@/components/fab/FixedFab.vue"
import { onLoad } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { POST_VCOURSE_DETATILS } from "@/api"
import { NoticeStatus } from "@/pinia/notice"
import { openURL } from "@/utils/func"

const storeNotice = NoticeStatus()
const detail = ref({
  id: -1,
  name: "",
  thumb: "",
  price: "",
  vcourseId: "",
  crowd: "",
  desc: "",
  specialService: "",
  cycle: "0",
  content: "",
  isorder: 0
})

onLoad(async (options) => {
  const res = await httpRequest(POST_VCOURSE_DETATILS, "POST", { id: options.id })
  detail.value = res.data
  nextTick(() => {
    uni.setNavigationBarTitle({ title: detail.value.name })
  })
})
const content = computed(() => parseHtml(detail.value.content))

function rightButton() {}
</script>

<template>
  <view>
    <fixed-fab @handleClick="openURL(storeNotice.miniApp.find((i) => i.id === 4))" />
    <image class="course-img" :src="detail.thumb" />
    <view class="course-price">
      <text class="price">
        <text class="rmb">¥</text>
        <text>{{ detail.price }}</text>
      </text>
      <text class="date-text">有效期：</text>
      <text class="date">购课之日起</text>
    </view>
    <view
      class="receive-information-card"
      @click="openURL(storeNotice.miniApp.find((i) => i.id === 7))"
    >
      <text class="name">{{ detail.name }}</text>
      <view class="box-below">
        <text class="highlight">领取资料</text>
        <text>点击添加学管领取课程资料</text>
      </view>
    </view>
    <view class="detailed-catalog">
      <text class="highlight">课程详情</text>
    </view>
    <view class="rich-text-box">
      <rich-text :nodes="content"></rich-text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.rich-text-box {
  width: 686rpx;
  display: flex;
  margin: 0 32rpx 32rpx;
  * {
    max-width: 686rpx;
  }
}
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
