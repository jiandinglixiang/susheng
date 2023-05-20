<script setup>
import { formatNumber } from "@/utils/func"
const props = defineProps({
  mode: {
    type: String,
    default: "learn"
  }
})
function navigateTo() {
  uni.navigateTo({ url: "/pages/live/detail" })
}
</script>

<template>
  <view class="live-line-card-item">
    <image
      @click="navigateTo"
      class="live-img"
      src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"
    />
    <view class="right-content">
      <text class="name">
        快题设计冲刺班快题设计冲刺班快题设计冲刺班…快题设计冲刺班快题设计冲刺班快题设计冲刺班…
      </text>
      <view class="bottom-time">7月28日 19:00-20:30</view>
    </view>
    <view class="live-status watching-live watch-replay">
      <!--已预约-->
    </view>
    <view class="receive-handouts">领取讲义</view>
  </view>
</template>

<style scoped lang="scss">
.live-line-card-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 32rpx 32rpx;
  padding: 16rpx 0 16rpx 16rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-img {
    flex: 0 0 auto;
    width: 254rpx;
    height: 140rpx;
    border-radius: 4rpx;
    margin-right: 20rpx;
  }
  .right-content {
    flex: 1 1 auto;
    min-height: 140rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: space-between;
    margin-right: 20rpx;
  }
  .name {
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    max-height: 72rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .bottom-time {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: rgba(48, 93, 218, 1);
    padding-right: 128rpx;
  }
}
.receive-handouts {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 128rpx;
  height: 60rpx;
  border-radius: 8rpx 0rpx 8rpx 0rpx;
  background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
  font-size: 24rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.live-status {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 4rpx;
  border-radius: 8rpx 0rpx 8rpx 0rpx;
  background: rgba(255, 243, 230, 1);

  &:after {
    content: "待开始";
    scale: 0.75;
    font-size: 24rpx;
    font-weight: 700;
    color: rgba(255, 142, 13, 1);
    vertical-align: top;
  }
  &.watching-live {
    background: rgba(231, 241, 255, 1);
    &:after {
      content: "直播中";
      color: rgba(15, 115, 255, 1);
    }
  }
  &.reserved {
    background: rgba(237, 237, 237, 1);
    &:after {
      content: "已预约";
      color: rgba(138, 138, 138, 1);
    }
  }
  &.watch-replay {
    background: rgba(230, 247, 237, 1);
    &:after {
      content: "回放中";
      color: rgba(9, 179, 77, 1);
    }
  }
}
</style>
