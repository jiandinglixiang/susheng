<script setup>
import { formatNumber } from "@/utils/func"
const props = defineProps({
  mode: {
    type: String,
    default: "learn"
  },
  itemData: {
    type: Object
  }
})
function navigateTo() {
  uni.navigateTo({ url: "/pages/course/detail" })
}
</script>

<template>
  <view class="course-line-card-item">
    <image
      @click="navigateTo"
      class="course-img"
      src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"
    />
    <view class="right-content">
      <text class="name">
        {{ itemData.title }}
      </text>
      <view class="bottom-box">
        <text class="people" v-if="props.mode !== 'learn'">{{ formatNumber(12323) }}</text>
        <view class="learn-now" v-else>立即学习</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.course-line-card-item {
  display: flex;
  flex-flow: row nowrap;
  margin: 0 32rpx 32rpx;
  .course-img {
    flex: 0 0 auto;
    width: 276rpx;
    height: 156rpx;
    border-radius: 8rpx;
    margin-right: 16rpx;
  }
  .right-content {
    flex: 1 1 auto;
    min-height: 156rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: space-between;
  }
  .name {
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 39.2rpx;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    max-height: 80rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .bottom-box {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
  .people {
    flex: 0 0 auto;
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
  .learn-now {
    align-self: flex-end;
    flex: 0 0 auto;
    width: 136rpx;
    height: 56rpx;
    border-radius: 446rpx 430rpx 446rpx 430rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    font-size: 24rpx;
    font-weight: 700;
    line-height: 56rpx;
    text-align: center;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
