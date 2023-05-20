<script setup>
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <uni-nav-bar
    title="考试资讯"
    :fixed="true"
    left-icon="back"
    :border="false"
    @clickLeft="navigateBack"
    @clickRight="navigateBack"
    class="nav-bar"
  >
    <template v-slot:right>
      <image class="right-btn" src="/static/pdf/customer-service@2x.png"/>
    </template>
  </uni-nav-bar>
</template>

<style scoped lang="scss">
.nav-bar {
  :deep(.uni-nav-bar-text) {
    font-size: 36rpx;
    font-weight: 500;
  }
}
.right-btn {
  width: 48rpx;
  height: 48rpx;
}
</style>
