<script setup>
import { userInfo } from "@/pinia/user"
import LoadTips from "@/components/tips/load-tips.vue"
import PopupIndex from "@/components/popup/index.vue"
import { LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import { nextTick, ref } from "vue"
const popup = ref()
const storeUserInfo = userInfo()
storeUserInfo.getUserInfo()
nextTick(() => {
  popup.value.open({
    title: "提示",
    buttonText: "去登录",
    tips: `<text>asfasfasfas<text style="color:red">asfasfasfas</text><text>asfasfasfas</text></text>`
  })
})
</script>
<template>
  <view class="top-container">
    <view class="signin">
      <image src="/static/user/signin1.png"></image>
      <text>签到</text>
    </view>
    <image class="setting-btn" src="/static/user/setting-btn.png"></image>

    <view class="user-card">
      <image class="head-portrait" src="/static/user/setting-btn.png"></image>
      <view v-if="1" class="user-info">
        <view class="name">
          <text>我是周小杰</text>
          <view class="leve">Lv7</view>
        </view>
        <text class="user-work-title">注册会计师备考</text>
      </view>
      <view v-else class="login-text">登录/注册</view>
      <view class="user-teacher">
        <image class="teacher-bg" src="/static/user/user-teacher.png"></image>
        <text>专属助教</text>
      </view>
    </view>

    <view class="diamond-region">
      <view class="top-box">
        <text>偷偷告诉你，完善资料后，方便与老师沟通哦~</text>
        <image src="/static/user/arrows@2x.png"></image>
      </view>
      <view v-for="i in 8" class="region-item">
        <image src="/static/user/diamond-collect.png"></image>
        <text>推荐给好友</text>
      </view>
    </view>

    <view v-for="i in 4" class="list-item">
      <image class="left-icon" src="/static/user/arrows@2x.png"></image>
      <text class="name">备考规划</text>
      <text class="sub-name">24小时在线</text>
      <image class="arrows" src="/static/user/arrows@2x.png"></image>
    </view>
    {{ storeUserInfo.phone }}
    <load-tips type="loadError" />
  </view>
  <popup-index ref="popup" :popup-key="LOGIN_TIPS_POPUP" />
</template>

<style lang="scss" scoped>
.top-container {
  background: url("/static/user/bg@2x.png") no-repeat left top;
  background-size: 100% auto;
}
.signin {
  width: 128rpx;
  height: 56rpx;
  border-radius: 34rpx;
  background: linear-gradient(130.38deg, #ffc75c 0%, #ff962f 100%);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text {
    font-size: 24rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 24rpx;
  }
  image {
    width: 36rpx;
    height: 38rpx;
    margin-right: 8rpx;
  }
}
.setting-btn {
  width: 44rpx;
  height: 44rpx;
}
.user-card {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 252rpx;
  .head-portrait {
    width: 156rpx;
    height: 156rpx;
  }
  .user-info {
    display: flex;
    flex-flow: column nowrap;
    .leve {
      width: 64rpx;
      height: 28rpx;
      background: url("/static/user/level-bg.png") no-repeat left top;
      background-size: 100%;
    }
  }
  .user-teacher {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    border-radius: 32rpx 0rpx, 0rpx, 32rpx;
    background: linear-gradient(180deg, #626262 0%, #1c1c1c 100%);
    .teacher-bg {
      width: 32rpx;
      height: 38rpx;
    }
  }
}
.diamond-region {
  //width: 686rpx;
  margin: 0 32rpx 32rpx;
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 32rpx;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
  .top-box {
    height: 72rpx;
    flex: 1 1 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
    image {
      width: 14rpx;
      height: 20rpx;
    }
  }
  .region-item {
    flex: 1 1 25%;
    height: 128rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-end;
    image {
      width: 56rpx;
      height: 56rpx;
    }
  }
}
.list-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .name {
    flex: 1 1 auto;
  }
  .sub-name {
    flex: 0 0 auto;
  }
  .left-icon {
    flex: 0 0 auto;
  }
  .arrows {
    flex: 0 0 auto;
  }
  image {
    width: 32rpx;
    height: 32rpx;
  }
}
</style>
