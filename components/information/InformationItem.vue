<script setup>
import dayjs from "dayjs"
import { computed } from "vue"

const props = defineProps({
  underLine: {
    type: Boolean,
    default: true
  },
  itemData: {
    type: Object,
    default() {
      return {}
    }
  }
})
const pubdate = computed(() => dayjs(props.itemData.pubdate).format("M月DD日"))
</script>

<template>
  <view class="information-item" :class="[underLine && 'under-line']">
    <view class="left-content">
      <text class="title">{{ itemData.title }}</text>
      <text class="time">{{ pubdate }}</text>
      <!--<text class="read">阅读7.5万</text>-->
    </view>
    <image v-if="itemData.litpic" class="right-img" :src="itemData.litpic" />
  </view>
</template>

<style scoped lang="scss">
.information-item {
  margin: 0 32rpx 32rpx;
  display: flex;
  flex-flow: row nowrap;
}
.under-line {
  border-bottom: 2rpx solid rgba(238, 238, 238, 1);
}
.left-content {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  .title {
    width: 100%;
    flex: 1 1 auto;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 44rpx;
    color: rgba(51, 51, 51, 1);
    max-height: 96rpx;
    margin-bottom: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time,
  .read {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: rgba(153, 153, 153, 1);
    margin-right: 18rpx;
    margin-bottom: 32rpx;
  }
}

.right-img {
  flex: 0 0 auto;
  border-radius: 4rpx;
  width: 218rpx;
  height: 156rpx;
  margin-left: 16rpx;
}
</style>
