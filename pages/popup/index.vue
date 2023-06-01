<template>
  <view class="popup-container">
    <privacy-auth-popup
      v-if="popupKey === PRIVACY_AUTH_POPUP"
      :popup-data="params"
      @action="handleAction"
    />
    <agree-auth-popup
      v-else-if="popupKey === AGREE_AUTH_POPUP"
      :popup-data="params"
      @action="handleAction"
    />
    <login-tips-popup
      v-else-if="popupKey === LOGIN_TIPS_POPUP"
      :popup-data="params"
      @action="handleAction"
    />
    <home-ad-popup
      v-else-if="popupKey === HOME_AD_POPUP"
      :popup-data="params"
      @action="handleAction"
    />
  </view>
</template>

<script setup>
import { onBackPress, onLoad, onUnload } from "@dcloudio/uni-app"
import { ref } from "vue"
import PrivacyAuthPopup from "@/components/popup/PrivacyAuthPopup.vue"
import {
  AGREE_AUTH_POPUP,
  HOME_AD_POPUP,
  LOGIN_TIPS_POPUP,
  PRIVACY_AUTH_POPUP
} from "@/components/popup/popupKeyMap"
import AgreeAuthPopup from "@/components/popup/AgreeAuthPopup.vue"
import LoginTipsPopup from "@/components/popup/LoginTipsPopup.vue"
import HomeAdPopup from "@/components/popup/HomeAdPopup.vue"
import { PAGES_POPUP_INDEX } from "@/utils/consts"

const popupKey = ref("")
const params = ref(undefined)
onBackPress(({ from }) => from !== "navigateBack")

onLoad((query = { popupKey: "" }) => {
  console.log(query)
  popupKey.value = query.popupKey
  const par = uni.getStorageSync(PAGES_POPUP_INDEX)
  params.value = par ?? undefined
})

function handleAction(...par) {
  uni.$emit(popupKey.value, ...par)
}
onUnload(() => {
  uni.$off(popupKey.value)
})
</script>

<style scoped lang="scss">
.popup-container {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: transparent;
}
</style>
<style>
page {
  flex: 1;
  height: 100%;
  background-color: rgba(204, 204, 204, 0.5);
}
</style>
