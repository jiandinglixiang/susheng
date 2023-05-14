<template>
  <view
    :class="['card-container', !item.projectPublishName && 'display-mode1']"
    class="card-container"
  >
    <view v-if="item.projectPublishName" class="title-box" @click="emits('action', 'detail', item)">
      <text class="main-title">{{ item.projectPublishName }}</text>
      <text v-if="item.recommend" class="sub-title">{{ props.recommend }}</text>
    </view>
    <image
      src="http://placekitten.com/200/200"
      class="cover-img"
      mode="widthFix"
      @click="emits('action', 'detail', item)"
    ></image>
    <view class="user-action">
      <image
        :src="item.authorHeadfaceImageUrl"
        class="avatar"
        @click="emits('action', 'user', item)"
      ></image>
      <text class="username" @click="emits('action', 'user', item)">{{ item.authorNickName }}</text>
      <image
        :src="item.collectFlag ? collect2Icon : collectIcon"
        class="collect"
        @click="emits('action', 'collect', item)"
      ></image>
      <image
        :src="item.starFlag ? like2Icon : likeIcon"
        class="like"
        @click="emits('action', 'like', item)"
      ></image>
    </view>
  </view>
</template>
<script setup>
import likeIcon from "@/static/home/like.png"
import like2Icon from "@/static/home/like2.png"
import collectIcon from "@/static/home/collect.png"
import collect2Icon from "@/static/home/collect2.png"
import { computed } from "vue"

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})
const item = computed(() => props.item)
const emits = defineEmits(["action"])
</script>
<style lang="scss" scoped>
.card-container {
  background: rgba(255, 255, 255, 1);
  border-radius: 16rpx;
  box-shadow: 0 4rpx 40rpx 0 rgba(221, 225, 234, 0.6);
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
  margin: 32rpx;
  overflow: hidden;
  padding: 0 32rpx;
}

.display-mode1 {
  padding: 0;

  .user-action {
    margin: 24rpx 32rpx 40rpx 32rpx;
  }

  .cover-img {
    border-radius: 0;
  }
}

.title-box {
  display: flex;
  flex-flow: column nowrap;

  .main-title {
    color: rgba(0, 15, 26, 1);
    font-size: 32rpx;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 44rpx;
    margin: 48rpx 0 16rpx 0;
    text-align: left;
    vertical-align: top;
  }

  .sub-title {
    color: rgba(102, 111, 118, 1);
    font-size: 28rpx;
    letter-spacing: 0;
    line-height: 44rpx;
    margin-bottom: 32rpx;
    text-align: left;
    vertical-align: top;
  }
}

.cover-img {
  border-radius: 8rpx;
  flex: 1 1 auto;
  overflow: hidden;
  width: 100%;
}

.user-action {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 40rpx;
  margin-top: 24rpx;

  .avatar {
    border-radius: 50%;
    flex: 0 0 64rpx;
    height: 64rpx;
    overflow: hidden;
  }

  .username {
    color: rgba(38, 39, 42, 1);
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 44rpx;
    margin-left: 16rpx;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: top;
    white-space: nowrap;
  }

  .collect,
  .like {
    flex: 0 0 44rpx;
    height: 44rpx;
    margin: 0 32rpx;
  }
}
</style>
