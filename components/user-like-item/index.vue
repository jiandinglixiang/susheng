<template>
  <view class="user-like-item">
    <image class="user-avatar" :src="props.item.headerImageUrl"></image>
    <view class="user-mid-box">
      <text class="username-box">{{ props.item.nickName }}</text>
      <view class="describe-box">
        <view class="left"> </view>
        <view class="right">
          <text>粉丝</text>
          <text class="number">{{ props.item.watchCount }}</text>
        </view>
      </view>
    </view>
    <button
      class="action-btn"
      :class="props.item.watchStatus !== 0 && 'unlike'"
      @click="emits('unlike', props.item)"
    >
      {{ props.item.watchStatus === 0 ? "关注" : "取关" }}
    </button>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emits = defineEmits(["unlike"]);
</script>
<style lang="scss" scoped>
.user-like-item {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  box-sizing: border-box;
  height: 124rpx;
  margin: 32rpx;
  padding: 6rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4rpx 40rpx 0 rgba(221, 225, 234, 0.6);
}

.user-avatar {
  overflow: hidden;
  flex: 0 0 auto;
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
}

.user-mid-box {
  font-size: 24rpx;
  flex: 1 1 auto;
  box-sizing: border-box;
  padding-left: 18rpx;
  color: rgba(0, 0, 0, 1);

  .username-box {
    line-height: 40rpx;
    height: 40rpx;
  }

  .describe-box {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;

    .left {
      line-height: 40rpx;
      overflow: hidden;
      flex: 1 1 auto;
      max-width: 280rpx;
      height: 40rpx;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .right {
      line-height: 40rpx;
      display: flex;
      align-items: center;
      flex: 0 0 160rpx;
      flex-flow: row nowrap;
      width: 160rpx;
      height: 40rpx;

      .number {
        margin-left: 12rpx;
        color: rgba(255, 127, 0, 1);
      }
    }
  }
}

.action-btn {
  font-size: 24rpx;
  flex: 0 0 auto;
  width: 112rpx;
  height: 52rpx;
  color: rgba(255, 255, 255, 1);
  border-radius: 32rpx;
  background: rgba(255, 127, 0, 1);
}

.unlike {
  background: rgba(153, 153, 153, 1);
}
</style>
