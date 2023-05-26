<script setup>
import { GET_LIVE_LIST } from "@/api"
import LiveCardItem from "@/components/live/LiveCardItem.vue"
import { httpRequest } from "@/utils/http"
import { onMounted, ref } from "vue"
import { onShow } from "@dcloudio/uni-app"
const scrollId = ref("")
const list = ref([])
onMounted(async () => {
  const res = await httpRequest(GET_LIVE_LIST, "POST", { type: 1 })
  list.value = res.data.result
})
onShow(() => {
  setTimeout(() => {
    scrollId.value = "id-scroll-home"
    setTimeout(() => {
      scrollId.value = ""
    }, 1000)
  }, 300)
})
</script>

<template>
  <scroll-view
    class="scroll-view"
    :scroll-x="true"
    scroll-left="120"
    :show-scrollbar="false"
    :enable-flex="true"
    :scroll-into-view="scrollId"
  >
    <view class="scroll-view-content" id="id-scroll-home">
      <live-card-item v-for="item in list" :key="item.id" :item-data="item" />
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.scroll-view {
  height: 444rpx;
}
.scroll-view-content {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
</style>
