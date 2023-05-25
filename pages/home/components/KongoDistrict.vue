<script setup>
function navigateTo(url) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="kongo-district">
    <view class="list-item" @click="navigateTo('/pages/video/videoList')">
      <image src="/static/home/video-lesson@2x.png"></image>
      <text>视频课</text>
    </view>
    <view class="list-item" @click="navigateTo('/pages/live/liveList')">
      <image src="/static/home/live-lesson@2x.png"></image>
      <text>直播课</text>
    </view>
    <view class="list-item" @click="navigateTo('/pages/pdf/pdfList')">
      <image src="/static/home/informationCenter@2x.png"></image>
      <text>资料中心</text>
    </view>
    <view class="list-item disable">
      <image src="/static/home/onlineMockTest@2x.png"></image>
      <text>模考大赛</text>
    </view>
    <view class="list-item" @click="navigateTo('/pages/information/informationList')">
      <image src="/static/home/examConsultation@2x.png"></image>
      <text>考试资讯</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.kongo-district {
  height: 212rpx;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 0 32rpx;
  .list-item {
    flex: 0 0 20%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  image {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 12rpx;
  }
  text {
    font-size: 24rpx;
    font-weight: 500;
    line-height: 24rpx;
    color: rgba(51, 51, 51, 1);
  }
}
.disable {
  filter: grayscale(100%);
}
</style>
