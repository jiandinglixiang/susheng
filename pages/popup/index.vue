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
  </view>
</template>

<script setup>
import { onBackPress, onLoad, onUnload } from "@dcloudio/uni-app"
import { ref } from "vue"
import PrivacyAuthPopup from "@/components/popup/PrivacyAuthPopup.vue"
import { AGREE_AUTH_POPUP, PRIVACY_AUTH_POPUP } from "@/components/popup/popupKeyMap"
import AgreeAuthPopup from "@/components/popup/AgreeAuthPopup.vue"

const popupKey = ref("")
const params = ref(null)
onBackPress(({ from }) => from !== "navigateBack")

onLoad((query = { popupKey: "", params: null }) => {
  popupKey.value = query.popupKey
  params.value = query.params ? JSON.parse(decodeURIComponent(query.params)) : null
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
