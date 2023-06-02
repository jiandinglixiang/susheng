<template>
  <view class="container">
    <view class="guide-page">
      <image class="guide-image" src="/static/logo.png"></image>
      <text class="guide-text">注册会计师App</text>
    </view>
    <popup-index
      v-if="!ConfirmAuthorization"
      ref="privacyPopup"
      @action="handleAction"
      :popup-key="PRIVACY_AUTH_POPUP"
    />
  </view>
</template>

<script setup>
import { PRIVACY_AUTH_POPUP } from "@/components/popup/popupKeyMap"
import PopupIndex from "@/components/popup/PopupIndex.vue"
import { userInfo } from "@/pinia/user"
import { CONFIRM_AUTHORIZATION } from "@/utils/consts"
import { onLoad } from "@dcloudio/uni-app"
import { nextTick, ref } from "vue"
import { AppAuditStatus } from "@/pinia/audit"

// 是否授权
const ConfirmAuthorization = uni.getStorageSync(CONFIRM_AUTHORIZATION)
const privacyPopup = ref()
const auditStatus = AppAuditStatus().getAppAuditStatus()

onLoad(async () => {
  //#ifdef APP-PLUS
  // plus.navigator.setFullscreen(true)
  plus.navigator.closeSplashscreen() // 关闭启动页
  //#endif
  await nextTick()
  if (ConfirmAuthorization) {
    goNext()
  } else {
    privacyPopup.value.open()
  }
})

async function goNext() {
  try {
    const { auditStatusBoolean } = await auditStatus
    if (auditStatusBoolean) {
      uni.reLaunch({ url: "/pages/home/index" })
    } else if (await userInfo().getUserInfo()) {
      uni.reLaunch({ url: `/pages/user/index` })
    } else {
      uni.reLaunch({ url: `/pages/login/index` })
    }
  } catch (err) {
    console.log(err)
    uni.reLaunch({ url: `/pages/login/index` })
  }
}

function handleAction(action) {
  if (action === "agree") {
    privacyPopup.value.close()
    goNext()
  } else {
    // #ifdef APP-PLUS
    if (plus.os.name.toLowerCase() === "android") {
      plus.runtime.quit()
    } else {
      const threadClass = plus.ios.importClass("NSThread")
      const mainThread = plus.ios.invoke(threadClass, "mainThread")
      plus.ios.invoke(mainThread, "exit")
    }
    // #endif
    // #ifdef H5
    window.location.href = "/"
    // #endif
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  position: relative;
}
.guide-page {
  position: absolute;
  bottom: trpx(88);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.guide-text {
  font-size: trpx(32);
  line-height: trpx(32);
  color: #333333;
}

.guide-image {
  width: trpx(108);
  height: trpx(108);
  margin-bottom: trpx(24);
}
</style>
