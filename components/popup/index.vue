<template>
  <!--#ifdef H5-->
  <uni-popup class="max-index" ref="popup" type="center" :is-mask-click="false">
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
  </uni-popup>
  <!--#endif-->
</template>
<script>
export default {
  name: "PopupIndex"
}
</script>
<script setup>
import { deepMergeObjects } from "@/utils/func"

// 根据环境接收 并emits出事件
// 接收popupKey
import { onUnmounted, ref } from "vue"
import { AGREE_AUTH_POPUP, LOGIN_TIPS_POPUP, PRIVACY_AUTH_POPUP } from "./popupKeyMap"
import PrivacyAuthPopup from "./PrivacyAuthPopup.vue"
import AgreeAuthPopup from "@/components/popup/AgreeAuthPopup.vue"
import LoginTipsPopup from "@/components/popup/LoginTipsPopup.vue"

const {
  popupKey,
  autoClose,
  params: propsParams
} = defineProps({
  params: Object,
  popupKey: String,
  autoClose: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(["action"])
const popup = ref()
const params = ref(null)

onUnmounted(() => {
  uni.$off(popupKey)
})

function handleAction(...params) {
  if (autoClose && params[0] === "close") {
    close()
  }
  emits("action", ...params)
}
function open(par) {
  if (propsParams && par) {
    par = deepMergeObjects(par, propsParams)
  }

  // #ifndef H5
  uni.$on(popupKey, handleAction)
  uni.navigateTo({
    url:
      `/pages/popup/index?popupKey=${popupKey}&` +
      (par ? encodeURIComponent(JSON.stringify(par)) : "")
  })
  // #endif
  // #ifdef H5
  params.value = par
  popup.value.open()
  // #endif
}
function close() {
  // #ifndef H5
  uni.navigateBack()
  // #endif
  // #ifdef H5
  popup.value.close()
  // #endif
}
defineExpose({
  open,
  close
})
</script>
<style lang="scss" scoped>
.max-index {
  z-index: 10000000;
}
</style>
