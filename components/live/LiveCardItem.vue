<script setup>
import { formatNumber } from "@/utils/func"

const props = defineProps({
  id: String
})
</script>

<template>
  <view :id="props.id" class="live-card-item">
    <view class="live-status watch-replay">
      <!--<text>去上课</text>-->
    </view>
    <image class="live-img" src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" alt="" />
    <text class="name">学生心理学综合学生心理学综合学生心…合学生合学生合学生合学生</text>
    <text class="time">12月3日 20:30-21:30</text>
    <view class="bottom-box">
      <text class="people">{{ formatNumber(12323) }}</text>
      <view class="btn reserved">
        <!--去上课-->
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.live-card-item {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  margin-left: 32rpx;
  height: 380rpx;
  border-radius: 0rpx 0rpx 8rpx 8rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-img {
    flex: 0 0 auto;
    width: 312rpx;
    height: 176rpx;
    border-radius: 8rpx 8rpx 0rpx 0rpx;
    margin-bottom: 16rpx;
  }
  .name {
    flex: 0 0 auto;
    margin: 0 16rpx 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
    text-align: justify;
    max-height: 72rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time {
    flex: 1 0 auto;
    margin: 0 16rpx 16rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
  }
  .bottom-box {
    width: 100%;
    flex: 0 0 auto;
    align-self: flex-end;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .people {
    flex: 1 1 auto;
    height: 24rpx;
    margin-left: 16rpx;
    padding-left: 28rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
    background: url("/static/home/numberOfPeople@2x.png") no-repeat left center;
    background-size: 20rpx 24rpx;
    overflow: hidden;
  }
  .btn {
    flex: 0 0 auto;
    width: 148rpx;
    height: 56rpx;
    border-radius: 16rpx 0rpx 8rpx 0rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;

    &:after {
      content: "去上课";
      font-size: 24rpx;
      font-weight: 500;
      line-height: 56rpx;
      color: rgba(255, 255, 255, 1);
    }
    &.reservation-now {
      background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 100%);
      &:after {
        content: "立即预约";
      }
    }
    &.reserved {
      opacity: 0.4;
      background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 40%);
      &:after {
        content: "已预约";
      }
    }
  }
}
.live-status {
  position: absolute;
  left: 0;
  top: 0;
  padding: 8rpx;
  border-radius: 8rpx 0rpx 16rpx 0rpx;
  background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 100%);
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  &:after {
    content: "未开始";
    scale: 0.8;
    font-size: 20rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  &.watching-live {
    background: linear-gradient(139.19deg, rgba(49, 227, 179, 1) 0%, rgba(22, 195, 124, 1) 100%);
    &:after {
      content: "直播中";
    }
  }
  &.watch-replay {
    background: linear-gradient(135deg, rgba(202, 148, 255, 1) 0%, rgba(154, 91, 255, 1) 100%);
    &:after {
      content: "看回放";
    }
  }
}
</style>
