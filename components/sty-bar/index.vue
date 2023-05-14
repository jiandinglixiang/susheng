<template>
  <view class="sty-bar">
    <text class="sty-title">风格</text>
    <scroll-view lower-threshold="0" scroll-x @touchmove.stop>
      <view class="scroll-view-content">
        <view
          class="image-item"
          v-for="{ code, name } in props.listStyles"
          :key="code"
          @click="emits('selected', code)"
        >
          <image src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" />
          <text>{{ name }}</text>
        </view>
      </view>
    </scroll-view>
    <!--    <text class="sty-title">艺术家</text>-->
    <!--    <scroll-view lower-threshold="0" scroll-x @touchmove.stop>-->
    <!--      <view class="scroll-view-content">-->
    <!--        <view class="person-item" v-for="i in 20">-->
    <!--          <image src="https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" />-->
    <!--          <text>插画</text>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--    </scroll-view>-->
  </view>
</template>
<script setup>
const props = defineProps({
  listStyles: {
    type: Array,
    default() {
      return []
    }
  }
})
const emits = defineEmits(["selected"])
</script>
<style lang="scss" scoped>
.sty-bar {
  background-color: white;
  border-radius: 16rpx 16rpx 0 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 -4rpx 8rpx 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column nowrap;
  padding: 16rpx 0 48rpx 0;
}
.sty-title {
  font-size: 24rpx;
  color: rgba(0, 0, 0, 1);
  margin-left: 24rpx;
  margin-bottom: 12rpx;
}
.scroll-view-content {
  padding-left: 24rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.image-item,
.person-item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: rgba(0, 0, 0, 1);
  padding-right: 14rpx;
  text {
    line-height: 40rpx;
  }
}
.image-item image {
  width: 174rpx;
  height: 124rpx;
  border-radius: 16rpx;
}
.person-item image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
}
</style>
