<script setup>
import { POST_CLIENT_USER_LOGOUT } from "@/api"
import { userInfo } from "@/pinia/user"
import { USER_TOKEN_DATA } from "@/utils/consts"
import { config, httpRequest } from "@/utils/http"
import { ref } from "vue"

const checkData = [
  "需要解绑手机号、邮箱",
  "注销后注册新的账号",
  "安全及隐私顾虑",
  "这是多余的账号",
  "该账号不是自己注册的",
  "发表帖子、口碑困难",
  "其他（请注明原因）"
]
const selected = ref(-1)
const showStep = ref(1)
const isReadContent = ref(false)

function handleSelected(index) {
  selected.value = index
}

function submitCancel() {
  userInfo().loginOutClean()
  uni.reLaunch({ url: "/pages/login/index" })
}

function next(value) {
  if (value === 2 && selected.value === -1) {
    uni.showToast({ title: "请选择注销原因", icon: "none" })
    return
  }
  if (value === 3 && !isReadContent.value) {
    uni.showToast({ title: "请勾选", icon: "none" })
    return
  }
  showStep.value = value
}
</script>

<template>
  <view v-if="showStep === 1" class="cancel-step1">
    <view class="why">请选择注销原因</view>
    <view v-for="(text, index) in checkData" class="checkbox-custom" @click="handleSelected(index)">
      <view :class="selected === index ? 'selected' : 'unselected'" />
      <text class="name">{{ text }}</text>
    </view>
    <uni-easyinput v-show="selected === 6" placeholder="请输入内容" type="textarea"></uni-easyinput>
    <view class="warn">
      <image src="/static/setting/Icon_my_remind@2x.png"></image>
      <text>账号注销将清除当前用户使用数据，请谨慎操作</text>
    </view>
    <button class="btn-next" @click="next(2)">下一步</button>
  </view>
  <view v-else-if="showStep === 2" class="cancel-step2">
    <view class="title">高顿账号注销协议</view>
    <view class="content">
      <text>
        1、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议2、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协3、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议4、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协5、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议6、这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协议内容这个是协
      </text>
    </view>
    <view class="checkbox-custom" @click="isReadContent = true">
      <view :class="isReadContent ? 'selected' : 'unselected'" class="check-icon" />
      <text class="name">我已认真阅读以上须知，确认注销账户。</text>
    </view>
    <button class="btn-next cancel-btn" @click="next(3)">注销</button>
  </view>
  <view v-else-if="showStep === 3" class="cancel-step3">
    <view class="icon-con">
      <uni-icons class="ok-icon" color="#ffffff" size="50" type="checkmarkempty"></uni-icons>
    </view>
    <text class="dec">注销成功！</text>
    <button class="btn-next" @click="submitCancel">确定</button>
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #ffffff;
}

.cancel-step1 {
  padding: 50rpx 32rpx 0;
}

.why {
  font-size: 32rpx;
  font-weight: 500;
  line-height: 56rpx;
  color: rgba(51, 51, 51, 1);
}

.warn {
  font-size: 24rpx;
  font-weight: 400;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin-top: 32rpx;
  color: rgba(235, 61, 61, 1);

  image {
    width: 28rpx;
    height: 28rpx;
    margin-right: 16rpx;
  }
}

.checkbox-custom {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 80rpx;

  .name {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 50rpx;
    flex: 1 1 auto;
    margin-left: 16rpx;
    color: rgba(51, 51, 51, 1);
  }

  .unselected {
    width: 48rpx;
    height: 48rpx;
    background: url("/static/setting/unselected.png") no-repeat left top;
    background-size: 100% auto;
  }

  .selected {
    width: 48rpx;
    height: 48rpx;
    background: url("/static/setting/selected.png") no-repeat left top;
    background-size: 100% auto;
  }
}

.btn-next {
  font-size: 32rpx;
  font-weight: 500;
  line-height: 88rpx;
  position: fixed;
  bottom: 78rpx;
  left: 50%;
  width: 520rpx;
  height: 88rpx;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
}
</style>
<style lang="scss" scoped>
.cancel-step2 {
  padding: 0 32rpx;

  .title {
    font-size: 32rpx;
    font-weight: 500;
    line-height: 56rpx;
    padding: 32rpx;
    text-align: center;
    color: rgba(51, 51, 51, 1);
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
    color: rgba(51, 51, 51, 1);
  }

  .checkbox-custom {
    .check-icon {
      width: 36rpx;
      height: 36rpx;
    }

    .name {
      color: rgba(235, 61, 61, 1);
    }
  }

  .cancel-btn {
    background: linear-gradient(90deg, rgba(237, 116, 116, 1) 0%, rgba(235, 61, 61, 1) 100%);
  }
}
</style>
<style lang="scss" scoped>
.cancel-step3 {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100vh;

  .icon-con {
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-flow: column nowrap;
    justify-content: center;
    width: 164rpx;
    height: 164rpx;
    margin-bottom: 42rpx;
    border-radius: 50%;
    background-color: rgba(22, 195, 124, 1);
  }

  .dec {
    font-size: 36rpx;
    font-weight: 500;
    line-height: 50.4rpx;
    margin-bottom: 98rpx;
    color: rgba(51, 51, 51, 1);
  }

  .btn-next {
    position: static;
    left: 0;
    transform: translateX(0);
  }
}
</style>
