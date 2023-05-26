<script setup>
import PopupIndex from "@/components/popup/index.vue"
import { AGREE_AUTH_POPUP } from "@/components/popup/popupKeyMap"
import { useTimeCount } from "@/hooks/usePageList"
import { AppAuditStatus } from "@/pinia/audit"
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import univerify from "./univerify.js"
import { config, httpRequest } from "@/utils/http"
import { POST_PHONE_AND_SMS_LOGIN, POST_PHONE_SMS } from "@/api/index"
import { USER_TOKEN_DATA } from "@/utils/consts"

const audit = AppAuditStatus()

const agreePopup = ref() // 隐私弹窗
const showPage = ref(audit.auditStatusBoolean) // 非审核状态直接显示
const agreeCheck = ref(false)
const formData = ref({
  loading: false,
  phone: "",
  code: "",
  tk: ""
})

onLoad(async () => {
  //#ifdef APP-PLUS
  if (!audit.auditStatusBoolean) {
    // 非审核状态 打开一键登录
    await univerify(
      (data) => {
        loginSave(data)
        console.log(data)
      },
      (e) => {
        console.log(e)
      }
    )
  }
  //#endif
  showPage.value = true
})

const { time, start } = useTimeCount(60)

async function countdownStart() {
  if (time.value !== 60) {
    return
  }
  if (!validate(true)) {
    return
  }
  if (!agreeCheck.value) {
    agreePopup.value.open()
    return
  }
  start()
  const res = await httpRequest(POST_PHONE_SMS, "POST", {
    phoneSecret: formData.value.phone,
    areacode: 86
  })
  console.log(res)
  formData.value.tk = res.data.tk
}

async function submitForm() {
  try {
    if (!validate()) {
      return
    }
    if (!agreeCheck.value) {
      agreePopup.value.open()
      return
    }
    formData.value.loading = true
    const res = await httpRequest(POST_PHONE_AND_SMS_LOGIN, "POST", {
      areacode: 86,
      phoneSecret: formData.value.phone,
      pcode: formData.value.code,
      tk: formData.value.tk
    })
    loginSave(res.data)
    console.log(res, "res")
  } catch (e) {
    uni.showToast({ title: e?.msg ?? "Error", icon: "none" })
  } finally {
    formData.value.loading = false
  }
}

function loginSave(data) {
  config.header.token = data.token
  uni.setStorageSync(USER_TOKEN_DATA, data)
  uni.reLaunch({ url: "/pages/home/index" })
}

function handleAction(action) {
  console.log(action)
  if (action === "agree") {
    agreeCheck.value = true
    agreePopup.value.close()
  }
}

function clearPhone() {
  formData.value.phone = ""
}

function validate(phone) {
  const okPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
    formData.value.phone
  )
  if (!okPhone) {
    uni.showToast({ title: "手机号格式不正确", icon: "none" })
    return false
  }
  if (phone) {
    return okPhone
  }
  if (/^\d{6}$/.test(formData.value.code)) {
    return true
  }
  uni.showToast({ title: "验证码格式不正确", icon: "none" })

  return false
}
</script>
<template>
  <view v-if="showPage" class="container">
    <view class="input-item">
      <image src="/static/login/Icon_phone@2x.png"></image>
      <input type="number" class="uni-input" v-model="formData.phone" placeholder="请输入手机号" />
      <uni-icons
        v-show="formData.phone"
        @click="clearPhone"
        class="icon"
        type="clear"
        size="28"
        color="#D8D8D8"
      ></uni-icons>
    </view>
    <view class="input-item">
      <image src="/static/login/Icon_verification@2x.png"></image>
      <input type="number" class="uni-input" v-model="formData.code" placeholder="请输入验证码" />
      <text class="code-sms" @click="countdownStart">{{ time === 60 ? "获取验证码" : time }}</text>
    </view>

    <button class="submit-btn" hover-class="none" @click="submitForm" :disabled="formData.loading">
      快速登录
    </button>
    <view class="auth-text">
      <uni-icons
        class="check-icon"
        type="checkbox-filled"
        size="28"
        :color="agreeCheck ? '#36C26E' : '#999'"
        @click="agreeCheck = !agreeCheck"
      ></uni-icons>
      <text>
        我已阅读并同意
        <text class="highlight">《用户服务协议》</text>
        与
        <text class="highlight">《隐私政策》</text>
      </text>
    </view>
    <navigator
      v-if="audit.auditStatusBoolean"
      url="/pages/home/index"
      open-type="reLaunch"
      hover-class="none"
    >
      <button class="btn-tourist" plain hover-class="none">游客模式</button>
    </navigator>
  </view>
  <popup-index ref="agreePopup" :popup-key="AGREE_AUTH_POPUP" @action="handleAction"></popup-index>
</template>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 600rpx);
  background-image: url("/static/login/background_text@2x.png"),
    url("/static/login/material@2x.png"), url("/static/login/background@2x.png");
  background-position: 60rpx 364rpx, 404rpx 320rpx, left top;
  background-repeat: no-repeat;
  background-size: 352rpx 120rpx, 297rpx 210rpx, 100% auto;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 600rpx;
}

.auth-text {
  margin-top: 36rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
  .check-icon {
    padding: 0 20rpx;
  }
  .highlight {
    color: #305dda;
  }
}

.input-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 200rpx;
  border: 1rpx solid #cccccc;
  height: 100rpx;
  padding: 0 30rpx;
  width: 570rpx;
  margin-bottom: 16rpx;
  image {
    flex: 0 0 40rpx;
    width: 40rpx;
    height: 48rpx;
  }
  .uni-input {
    height: 80rpx;
    line-height: 80rpx;
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
    margin: 0 24rpx;
  }
  .uni-input::placeholder {
    color: #999999;
  }
  .icon {
    flex: 0 0 auto;
  }
  .code-sms {
    flex: 0 0 auto;
    font-size: 28rpx;
    font-weight: 500;
    color: #305dda;
  }
}

.submit-btn {
  margin-top: 40rpx;
  width: 520rpx;
  height: 88rpx;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
  font-size: 32rpx;
  font-weight: 700;
  line-height: 88rpx;
  color: #ffffff;
  text-align: center;
}

.btn-tourist {
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  font-size: 28rpx;
  line-height: 36rpx;
  color: #333333;
}
</style>
