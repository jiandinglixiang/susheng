<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { POST_LIVE_DETATILS } from "@/api"
import { setTitleNViewButtonStyle } from "@/utils/func"
import { onUnmounted } from "vue"

let stopRightButtonListener

onLoad((options) => {
  httpRequest(POST_LIVE_DETATILS, "POST", { id: options.id })
  stopRightButtonListener = setTitleNViewButtonStyle(
    { text: "\ue688", color: "#333333" },
    rightButton
  )
})
onUnmounted(() => {
  stopRightButtonListener?.()
})

function rightButton() {
  s++
  console.log(s)
  setTitleNViewButtonStyle({
    text: s % 2 ? "\ue688" : "\ue68f",
    color: s % 2 ? "#333333" : "#305DDA"
  })
}
</script>

<template>
  <view class="live-top">
    <image class="ad-img" src="https://img.js.design/assets/img/62314251882e8c6600acde3c.png" />
    <view class="content">
      <text class="distance">距直播开始还有</text>
      <view v-if="0" class="time">
        <text class="card">88</text>
        <text>天</text>
        <text class="card">88</text>
        <text>秒</text>
        <text class="card">88</text>
        <text>分</text>
      </view>
      <view v-else class="receive-btn">领取回放资料</view>
    </view>
  </view>
  <view class="person-info">
    <text class="live-name">这些单词让职场英语纯正又流利</text>
    <image
      class="avatar"
      src="https://img.js.design/assets/smartFill/img341164da748e08.jpg"
    ></image>
    <view class="box-info">
      <text class="name">Jesse</text>
      <view class="line-box">
        <text class="date">7月28日 19:00-20:30</text>
        <text class="booking">666人已预约</text>
      </view>
    </view>
  </view>

  <view class="line-title">老师简介</view>
  <view class="teacher-profile" v-for="i in 5">
    先后毕业于哈工大和莫纳什大学，金融学、计算机学双硕士
    在海内外顶尖金融机构工作超15年，曾任高级投资总监、高级风控总监等职位
    曾参与《中国互联网投资基金》设立，并与阿里巴巴集团共同设立投资基金
  </view>
  <view class="line-title">课程详情</view>

  <view class="fixed-bottom">
    <view class="fixed-bottom-content">
      <view class="teacher">
        <image src="/static/course/icon_banjiqun@2x.png"></image>
        <text>学管老师</text>
      </view>
      <view class="btn btn-done">
        <!--立即预约-->
        已预约 领取直播讲义
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
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
  justify-content: space-between;
  padding: 0 24rpx;
  background: #ffffff;
  .teacher {
    flex: 0 0 auto;
    width: 326rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 44rpx;
    color: rgba(51, 51, 51, 1);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    image {
      width: 44rpx;
      height: 44rpx;
      margin-right: 10rpx;
    }
  }
  .btn {
    flex: 0 0 auto;
    width: 368rpx;
    height: 76rpx;
    border-radius: 200rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;
    font-size: 28rpx;
    font-weight: 700;
    line-height: 76rpx;
    color: rgba(255, 255, 255, 1);
  }
  .btn-done {
    color: rgba(48, 93, 218, 1);
    border: 2rpx solid rgba(48, 93, 218, 1);
    background: #ffffff;
  }
}
.line-title {
  font-size: 28rpx;
  font-weight: 700;
  line-height: 28rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 16rpx;
  margin-left: 32rpx;
}
.teacher-profile {
  font-size: 28rpx;
  font-weight: 400;
  line-height: 39.2rpx;
  color: rgba(102, 102, 102, 1);
  margin: 0 32rpx 48rpx;
}
.person-info {
  display: flex;
  flex-flow: row wrap;
  padding: 32rpx;
  margin-bottom: 48rpx;
  box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-name {
    width: 100%;
    flex: 1 1 auto;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 48rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 32rpx;
  }
  .avatar {
    flex: 0 0 auto;
    width: 64rpx;
    height: 64rpx;
    margin-right: 6rpx;
    border-radius: 50%;
    overflow: hidden;
  }
  .box-info {
    width: calc(100% - 70rpx);
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
  }
  .name {
    word-break: break-all;
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
  }
  .line-box {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .date {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(48, 93, 218, 1);
  }
  .booking {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(48, 93, 218, 1);
  }
}
.live-top {
  position: relative;
  width: 750rpx;
  height: 422rpx;
  .ad-img {
    width: 750rpx;
    height: 422rpx;
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 422rpx;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    .distance {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 44.8rpx;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 14rpx;
    }
    .time {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 28rpx;
      font-weight: 700;
      line-height: 39.2rpx;
      color: rgba(255, 255, 255, 1);
      text {
        flex: 0 0 auto;
        margin-right: 8rpx;
      }
    }
    .card {
      width: 44rpx;
      line-height: 56rpx;
      border-radius: 8rpx;
      background: rgba(255, 255, 255, 1);
      color: rgba(48, 93, 218, 1);
      text-align: center;
    }
    .receive-btn {
      margin-top: 18rpx;
      width: 232rpx;
      height: 64rpx;
      border-radius: 200rpx;
      background: rgba(255, 255, 255, 1);
      font-size: 28rpx;
      font-weight: 700;
      line-height: 64rpx;
      color: rgba(48, 93, 218, 1);
      text-align: center;
    }
  }
}
</style>
