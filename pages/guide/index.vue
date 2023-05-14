<template>
  <view class="guide-page">
    <image class="guide-image" src="/static/logo.png"></image>
    <text class="guide-text">注册会计师App</text>
  </view>
  <popup-index
    ref="privacyPopup"
    @action="handleAction"
    :popup-key="PRIVACY_AUTH_POPUP"
  ></popup-index>
</template>

<script setup>
import { PRIVACY_AUTH_POPUP } from "@/components/popup/popupKeyMap"
import PopupIndex from "@/components/popup/index.vue"
import { onLoad, onUnload } from "@dcloudio/uni-app"
import { nextTick, ref } from "vue"
const privacyPopup = ref()

function goNext() {
  if (0) {
    uni.redirectTo({ url: "/pages/home/index" })
  } else {
    uni.redirectTo({ url: `/pages/login/index` })
  }
}

function handleAction(action, params) {
  console.log(action, params)
  if (action === "agree") {
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
  }
}

onLoad(() => {
  //#ifdef APP-PLUS
  plus.navigator.setFullscreen(true)
  plus.navigator.closeSplashscreen() // 关闭启动页
  nextTick(() => {
    privacyPopup.value.open()
  })
  //#endif
  //#ifndef APP-PLUS
  goNext()
  //#endif
})

//#ifdef APP-PLUS
onUnload(() => {
  plus.navigator.setFullscreen(false)
})
//#endif
</script>

<style scoped lang="scss">
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
