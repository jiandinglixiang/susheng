<script setup>
const props = defineProps({
  fixed: Boolean,
  top: Number,
  list: Array
})
const emits = defineEmits(["noticeClick"])

function asd(i) {
  console.log(i)
}
</script>

<template>
  <view :class="props.fixed && 'notice-fixed'">
    <view class="notice">
      <image class="trumpet" src="/static/home/notice@2x.png"></image>
      <swiper
        class="swiper"
        circular
        :autoplay="!!list?.length"
        :interval="2000"
        vertical
        disable-touch
      >
        <swiper-item v-for="item in list">
          <view class="content">
            <text>{{ item.title }}</text>
            <text class="highlight" @click="emits('noticeClick', item)">了解详情</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<style scoped lang="scss">
.notice-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 1);
  padding-top: calc(var(--status-bar-height) + 44px + 12rpx);
  height: 72rpx;
  z-index: 2;
}

.notice {
  height: 72rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 32rpx;
  padding: 0 20rpx;
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
}
.trumpet {
  flex: 0 0 auto;
  width: 32rpx;
  height: 32rpx;
  margin-right: 20rpx;
}

.content {
  height: 72rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  word-break: break-all;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.swiper {
  height: 72rpx;
  flex: 1 1 auto;
}
</style>
