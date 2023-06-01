<script setup>
import { userInfo } from "@/pinia/user"
import { USER_TOKEN_DATA } from "@/utils/consts"
import { config } from "@/utils/http"
import { onLoad } from "@dcloudio/uni-app"
import { ref } from "vue"
const isLogin = ref(!!uni.getStorageSync(USER_TOKEN_DATA)?.token)
const storeUserInfo = userInfo()

onLoad(async () => {
  isLogin.value = !!(await storeUserInfo.getUserInfo())
})
function loginOut() {
  userInfo().$reset()
  config.header.token = ""
  uni.removeStorageSync(USER_TOKEN_DATA)
  uni.reLaunch({ url: "/pages/login/index" })
}
</script>

<template>
  <view class="mt16"></view>
  <navigator url="/pages/setting/feedback" hover-class="none">
    <view class="list-item line-bottom">
      <text class="name">意见反馈</text>
      <image class="arrows" src="/static/user/arrows@2x.png"></image>
    </view>
  </navigator>

  <view class="list-item">
    <text class="name">给我们点个赞</text>
    <image class="arrows" src="/static/user/arrows@2x.png"></image>
  </view>

  <view class="mt16"></view>
  <navigator v-if="isLogin" url="/pages/setting/cancelAccount" hover-class="none">
    <view class="list-item line-bottom">
      <text class="name">注销账户</text>
      <image class="arrows" src="/static/user/arrows@2x.png"></image>
    </view>
  </navigator>
  <view class="list-item">
    <text class="name">版本号</text>
    <text class="sub-name">v1.0.0</text>
  </view>

  <view class="login-out">
    <view class="privacy">
      <text class="highlight">《高顿用户协议》</text>
      与
      <text class="highlight">《隐私政策》</text>
    </view>
    <button v-if="isLogin" @click="loginOut">退出登录</button>
  </view>
</template>

<style scoped lang="scss">
page {
  background-color: #f9f9f9;
}
.mt16 {
  height: 16rpx;
}
.line-bottom {
  &:after {
    content: "";
    position: absolute;
    left: 32rpx;
    right: 32rpx;
    bottom: 0;
    height: 2rpx;
    background-color: rgba(241, 241, 241, 1);
  }
}
.list-item {
  position: relative;
  padding: 0 32rpx;
  height: 112rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background: #ffffff;

  .name {
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: rgba(51, 51, 51, 1);
  }
  .sub-name {
    flex: 0 0 auto;
    font-size: 24 rpx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .left-icon {
    flex: 0 0 auto;
    width: 36rpx;
    height: 36rpx;
    margin: 0 18rpx;
  }
  .arrows {
    margin-left: 16rpx;
    flex: 0 0 auto;
    width: 14rpx;
    height: 20rpx;
  }
  image {
    width: 32rpx;
    height: 32rpx;
  }
}

.login-out {
  position: fixed;
  bottom: 78rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  .privacy {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 33.6rpx;
    color: #333333;
    margin-bottom: 32rpx;
    white-space: nowrap;
  }
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
  button {
    width: 520rpx;
    height: 88rpx;
    border-radius: 50rpx;
    background: #ffffff;
    border: 1rpx solid #cccccc;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 88rpx;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
