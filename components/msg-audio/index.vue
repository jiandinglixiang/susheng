<template>
  <view
    :class="['audio-container', props.msgData.role !== 'system' && 'is-user']"
  >
    <image class="user-avatar" src="/static/logo.png"></image>
    <view class="box-container">
      <view class="tooltip" v-show="popupShow">
        <!--        <view class="action-btn" @click="handleActionBtn('transformToText')">-->
        <!--          <uni-icons type="trash" size="30" color="white" />-->
        <!--          <text>转换文字</text>-->
        <!--        </view>-->
        <view class="action-btn" @click.stop="handleActionBtn('delete')">
          <uni-icons type="upload" size="30" color="white" />
          <text>删除</text>
        </view>
      </view>
      <view class="audio-box" @="{...longPressListening}">
        <view class="play-btn">
          <uni-icons color="#fff" size="25" type="sound-filled" />
        </view>
        <text class="time">{{ props.msgData.voiceTime }}'</text>
        <view class="progress"></view>
      </view>
      <text v-if="props.msgData.content" class="audio-text">{{
        props.msgData.content
      }}</text>
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
const innerAudioContext = uni.createInnerAudioContext();
function onClick() {
  //  播放音频
  innerAudioContext.src = props.msgData.filePath;
  innerAudioContext.play();
  popupShow.value = false;
}
</script>
<style lang="scss" scoped>
.audio-container {
  display: flex;
  flex: 1 1 auto;
  flex-flow: row nowrap;
  margin-top: 32rpx;
}

.user-avatar {
  flex: 0 0 80rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.box-container {
  position: relative;
  max-width: 428rpx;
}
.audio-text {
  word-break: break-all;
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

.audio-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-flow: row nowrap;
  margin-left: 24rpx;
  padding: 24rpx 32rpx;
  border-radius: 200rpx 200rpx 16rpx 200rpx;
  background: rgba(255, 255, 255, 1);

  .play-btn {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-flow: row;
    justify-content: center;
    width: 80rpx;
    height: 80rpx;
    margin-right: 10rpx;
    border-radius: 50%;
    background-color: rgba(58, 137, 255, 1);
  }

  text {
    font-size: 32rpx;
    flex: 0 0 auto;
    margin-right: 10rpx;
    color: rgba(0, 15, 26, 1);
  }

  .progress {
    flex: 0 0 auto;
    width: 212rpx;
    height: 66rpx;
    margin-left: 10rpx;
    background: url("/static/chat/progress.png") no-repeat left center;
    background-size: 212rpx 66rpx;
  }

  .progress-on {
  }
}

.is-user {
  justify-content: flex-end;

  .user-avatar {
    order: 2;
  }

  .audio-box {
    order: 1;
    margin-right: 24rpx;
    margin-left: 0;
    border-radius: 200rpx 200rpx 200rpx 16rpx;
  }
}
</style>
