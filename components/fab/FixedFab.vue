<script setup>
const props = defineProps({
  type: String
})
</script>

<template>
  <movable-area class="movable-area">
    <movable-view direction="vertical" class="movable-view" y="350">
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
    </movable-view>
  </movable-area>
</template>

<style scoped lang="scss">
.movable-area {
  position: fixed;
  top: 700rpx;
  right: 0;
  width: 188rpx;
  height: 450rpx;
  z-index: 3;
  pointer-events: none;
}
.movable-view {
  pointer-events: auto;
}
.fixed-fab {
  width: 156rpx;
  height: 140rpx;
}
.fixed-fab2 {
  width: 188rpx;
  height: 147rpx;
}
</style>
