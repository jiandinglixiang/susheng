<script setup>
import LiveCardItem from "@/components/live/LiveCardItem.vue"
</script>

<template>
  <scroll-view
    class="scroll-view"
    :scroll-x="true"
    scroll-left="120"
    :show-scrollbar="false"
    :enable-flex="true"
  >
    <view class="scroll-view-content">
      <live-card-item v-for="i in 6" :id="i + 'id-scroll-home'" />
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
