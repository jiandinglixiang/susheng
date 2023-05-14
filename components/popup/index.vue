<template>
  <!--#ifdef H5-->
  <uni-popup class="max-index" ref="popup" type="center">
    <privacy-auth-popup
      v-if="popupKey === PRIVACY_AUTH_POPUP"
      :popup-data="params"
      @action="handleAction"
    />
  </uni-popup>
  <!--#endif-->
</template>

<script setup>
// 根据环境接收 并emits出事件
// 接收popupKey
import { onUnmounted, ref } from "vue"
import { PRIVACY_AUTH_POPUP } from "./popupKeyMap"
import PrivacyAuthPopup from "./PrivacyAuthPopup.vue"

const { popupKey } = defineProps({
  popupKey: String
})
const emits = defineEmits(["action"])
const popup = ref()
const params = ref(null)

onUnmounted(() => {
  uni.$off(popupKey)
})

function handleAction(...params) {
  if (params[0] === "close") {
    close()
  }
  emits("action", ...params)
}
function open(par) {
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
