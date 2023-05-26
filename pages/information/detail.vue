<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { GET_ARTICLE_DETAIL } from "@/api/index"

onLoad((option) => {
  httpRequest(
    GET_ARTICLE_DETAIL.replace("{id}", option.id),
    "GET",
    {},
    {
      baseUrl: "https://apigateway.pxo.cn",
      header: {
        g: option.domain
      }
    }
  )
})
</script>

<template>
  <view class="information-title">2023年注会《税法》成史上争议最大一科！难度两重天。</view>
  <view>
    <text class="dec-info">来源：互联网</text>
    <text class="dec-info">小编：阿清</text>
    <text class="dec-info">2023-01-30</text>
  </view>
  <view class="fixed-bottom">
    <view class="fixed-bottom-content">
      <view class="collect collected">收藏</view>
      <view class="free-information">免费资料</view>
      <view class="btn">在线咨询</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.information-title {
  margin: 16rpx 32rpx 0;
  font-size: 40rpx;
  font-weight: 500;
  line-height: 64rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 32rpx;
}
.dec-info {
  display: inline-block;
  margin-left: 32rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 24rpx;
  color: rgba(153, 153, 153, 1);
}
.fixed-bottom {
  height: 98rpx;
}

.fixed-bottom-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 32rpx;
  background: #ffffff;
  .collect,
  .free-information {
    flex: 0 0 100rpx;
    font-size: 20rpx;
    line-height: 20rpx;
    color: rgba(102, 102, 102, 1);
    padding-top: 52rpx;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 44rpx 44rpx;
  }
  .collect {
    background-image: url("/static/information/collect2@2x.png");

    &.collected {
      background-image: url("/static/information/collect1@2x.png");
    }
  }
  .free-information {
    background-image: url("/static/information/icon_kczx@2x.png");
  }
  .btn {
    margin-left: auto;
    flex: 0 0 auto;
    width: 360rpx;
    height: 88rpx;
    border-radius: 200rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 88rpx;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
