<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default() {
      return {}
    }
  }
})

</script>

<template>
  <view class="course-card-item">
    <image class="course-img" :src="itemData.thumb" />
    <text class="name">
      {{ itemData.name }}
    </text>
    <view class="person-title">
      <text>名师直播</text>
      <text>极速答疑</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.course-card-item {
  flex: 0 0 auto;
  width: 330rpx;
  margin-bottom: 32rpx;
  .name {
    height: 68rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
    font-weight: 400;
    letter-spacing: 0rpx;
    line-height: 33.6rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 12rpx;
  }
  .person-title {
    display: flex;
    flex-flow: row wrap;
    text {
      flex: 0 0 auto;
      border-radius: 4rpx;
      background: rgba(48, 93, 218, 0.1);
      padding: 8rpx 8rpx 8rpx 8rpx;
      font-size: 20rpx;
      font-weight: 400;
      line-height: 20rpx;
      color: rgba(48, 93, 218, 1);
      margin-right: 8rpx;
    }
  }
}
.course-img {
  width: 330rpx;
  height: 188rpx;
  border-radius: 8rpx;
  margin-bottom: 16rpx;
}
</style>
