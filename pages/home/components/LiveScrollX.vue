<script setup>
import { GET_LIVE_LIST } from "@/api/home"
import LiveCardItem from "@/components/live/LiveCardItem.vue"
import { httpRequest } from "@/utils/http"
import { onMounted, ref } from "vue"

const list = ref([])
onMounted(async () => {
  const res = await httpRequest(GET_LIVE_LIST, "POST", { type: 1 })
  list.value = res.data.result
})

function gotoDetails(id) {
  uni.navigateTo({
    url: `/pages/live/detail?id=${id}`
  })
}
</script>

<template>
  <scroll-view
    class="scroll-view"
    :scroll-x="true"
    scroll-left="120"
    :show-scrollbar="false"
    :enable-flex="true"
  >
    <view class="scroll-view-content" id="id-scroll-home">
      <live-card-item
        v-for="item in list"
        :key="item.id"
        :item-data="item"
        @click="gotoDetails(item.id)"
      />
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
