<script setup>
const props = defineProps({
  type: String
})
</script>

<template>
  <image
    v-if="props.type === 'teaching'"
    class="fixed-fab"
    src="/static/information/teaching-materials.png"
  />
  <image
    v-else-if="props.type === 'information'"
    class="fixed-fab"
    src="/static/information/information-spree.png"
  />
  <image v-else class="fixed-fab2" src="/static/information/add-group.png" />
</template>

<style scoped lang="scss">
.fixed-fab {
  position: fixed;
  top: 800rpx;
  right: 0;
  width: 156rpx;
  height: 140rpx;
  z-index: 3;
}
.fixed-fab2 {
  position: fixed;
  top: 800rpx;
  right: -32rpx;
  width: 220rpx;
  height: 148rpx;
  z-index: 3;
}
</style>
