<template>
  <view
    :class="['text-container', props.msgData.role !== 'system' && 'is-user']"
  >
    <image class="user-avatar" src="/static/logo.png"></image>
    <view class="text-box" @="{...longPressListening}">
      <view
        v-if="props.msgData.id !== -1"
        v-show="popupShow"
        class="tooltip downward"
      >
        <view class="action-btn" @click.stop="handleActionBtn('delete')">
          <uni-icons color="white" size="30" type="trash" />
          <text>删除</text>
        </view>
      </view>
      <text>
        {{ props.msgData.content }}
      </text>
    </view>
  </view>
</template>
<script setup>
import { useLongPress } from "@/utils/useHooks";
import { ref } from "vue";

const props = defineProps({
  index: Number,
  msgData: {
    type: Object,
    default() {
      return {
        // chatList.msgList[0]
      };
    },
  },
});
const emits = defineEmits(["tooltipAction"]);
const longPressListening = useLongPress(longPress, onClick);
const popupShow = ref(false);

function handleActionBtn(action) {
  popupShow.value = false;
  emits("tooltipAction", action, props.index, props.msgData);
}
function longPress() {
  popupShow.value = true;
}
function onClick() {
  popupShow.value = false;
}
</script>
<style lang="scss" scoped>
.text-container {
  display: flex;
  flex: 1 1 auto;
  flex-flow: row nowrap;
  margin-top: 32rpx;
}

.user-avatar {
  background-color: white;
  border-radius: 50%;
  flex: 0 0 80rpx;
  height: 80rpx;
  width: 80rpx;
}

.text-box {
  background: rgba(255, 255, 255, 1);
  border-radius: 16rpx 48rpx 48rpx 48rpx;
  flex: 1 1 auto;
  margin-left: 24rpx;
  padding: 24rpx 32rpx;
  position: relative;

  text {
    color: rgba(0, 15, 26, 1);
    font-size: 32rpx;
  }
}

.is-user {
  .user-avatar {
    order: 2;
  }

  .text-box {
    border-radius: 48rpx 16rpx 48rpx 48rpx;
    margin-left: 0;
    margin-right: 24rpx;
    order: 1;
  }
}

.tooltip {
  align-items: center;
  background-color: rgba(38, 39, 42, 1);
  border-radius: 16rpx;
  bottom: calc(100% + 10px);
  display: flex;
  //min-width: 300rpx;
  flex-flow: row nowrap;
  height: 140rpx;
  justify-content: space-around;
  padding: 0 32rpx;
  position: relative;
  position: absolute;
  right: 32rpx;
  z-index: 10;

  .action-btn {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    width: 120rpx;
  }

  text {
    color: white;
    font-size: 24rpx;
  }

  &:after {
    border-left: 28rpx solid transparent;
    border-right: 28rpx solid transparent;
    border-top: 28rpx solid rgba(38, 39, 42, 1);
    bottom: -20rpx;
    content: "";
    height: 0;
    left: 50%;
    position: absolute;
    width: 0;
  }

  &.downward {
    top: calc(100% + 10px);

    &:after {
      bottom: auto;
      top: -20rpx;
      transform: rotate(180deg);
    }
  }
}
</style>
