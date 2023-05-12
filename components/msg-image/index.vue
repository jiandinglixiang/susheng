<template>
  <view
    :class="['image-container', props.msgData.role !== 'system' && 'is-user']"
  >
    <image class="user-avatar" src="/static/logo.png"></image>
    <view class="image-box">
      <view class="tooltip" v-show="popupShow">
        <view class="action-btn" @click.stop="handleActionBtn('delete')">
          <uni-icons type="trash" size="30" color="white" />
          <text>删除</text>
        </view>
        <view
          v-if="props.msgData.role === 'system'"
          class="action-btn"
          @click.stop="handleActionBtn('publish')"
        >
          <uni-icons type="upload" size="30" color="white" />
          <text>发布</text>
        </view>
        <view class="action-btn" @click.stop="handleActionBtn('tryAgain')">
          <uni-icons type="font" size="30" color="white" />
          <text>{{
            props.msgData.role === "system" ? "再来一张" : "生成图片"
          }}</text>
        </view>
      </view>
      <view @="{...longPressListening}">
        <image :src="props.msgData.filePath" lazy-load mode="widthFix"></image>
      </view>
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
  if (popupShow.value) {
    popupShow.value = false;
    return;
  }
  uni.previewImage({
    urls: [props.msgData.filePath],
  });
}
</script>
<style lang="scss" scoped>
.image-container {
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

.image-box {
  position: relative;
  flex: 1 1 auto;
  margin-left: 24rpx;

  image {
    border-radius: 16rpx;
    flex: 1 1 auto;
    overflow: hidden;
    width: 100%;
  }
}

.is-user {
  .user-avatar {
    order: 2;
  }

  .image-box {
    margin-left: 0;
    margin-right: 24rpx;
    order: 1;
  }
}
.tooltip {
  position: relative;
  z-index: 10;
  position: absolute;
  bottom: calc(100% + 10px);
  right: 32rpx;
  //min-width: 300rpx;
  padding: 0 32rpx;
  height: 140rpx;
  background-color: rgba(38, 39, 42, 1);
  border-radius: 16rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  .action-btn {
    width: 120rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  text {
    color: white;
    font-size: 24rpx;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -20rpx;
    left: 50%;
    width: 0;
    height: 0;
    border-top: 28rpx solid rgba(38, 39, 42, 1);
    border-right: 28rpx solid transparent;
    border-left: 28rpx solid transparent;
  }
}
</style>
