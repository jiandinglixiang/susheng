<script setup>
const props = defineProps({
  fixed: Boolean,
  top: Number,
  list: Array,
  showDetail: Boolean
})
const emits = defineEmits(["noticeClick"])
</script>

<template>
  <view :class="props.fixed && 'notice-fixed'">
    <view class="notice">
      <image class="trumpet" src="/static/home/notice@2x.png"></image>
      <view class="right-box">
        <view
          class="list"
          :style="
            list.length > 1 && [
              `animation-duration: ${list.length * 2 * 3}s`,
              'animation-play-state:running'
            ]
          "
        >
          <view class="item" v-for="item in [...list, ...list]" @click="emits('noticeClick', item)">
            {{ item.title }}
            <text v-if="showDetail" class="highlight">了解详情</text>
          </view>
        </view>
      </view>
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

.right-box {
  font-size: 24rpx;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  flex: 1 1 auto;
  height: 72rpx;
  position: relative;
  overflow: hidden;
}
.list {
  height: 72rpx;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  animation-name: rolling;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 100s;
  animation-play-state: paused;
}
.item {
  min-width: 594rpx;
  flex: 0 0 auto;
  padding-right: 20rpx;
  white-space: nowrap;
}

@keyframes rolling {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
