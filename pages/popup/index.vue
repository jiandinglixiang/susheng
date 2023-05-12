<template>
  <view class="popup-container">
    <create-story-popup
      v-if="qy.popupKey === CREATE_STORY_POPUP"
      :popup-data="qy.params"
      @action="handleAction"
    />
  </view>
</template>

<script setup>
import { onLoad, onUnload } from "@dcloudio/uni-app"
import { ref } from "vue"
import { CREATE_STORY_POPUP } from "@/components/popup/popupKeyMap"
import CreateStoryPopup from "@/components/popup/CreateStoryPopup.vue"

const qy = ref({ popupKey: "", params: null })

onLoad((query = { popupKey: "", params: null }) => {
  qy.value = {
    popupKey: query.popupKey,
    params: query.params ? JSON.parse(decodeURIComponent(query.params)) : null
  }
})

function handleAction(...params) {
  uni.$emit(qy.value.popupKey, ...params)
}
onUnload(() => {
  uni.$off(qy.value.popupKey)
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
