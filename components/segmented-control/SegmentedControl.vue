<script setup>
import { ref } from "vue"
const props = defineProps({
  values: {
    type: Array,
    default() {
      return ["AAAAAsa", "AAA", "AAAAA"]
    }
  },
  current: Number
})
const emits = defineEmits(["change"])
const current = ref(props.current || 0)

function onChange(index) {
  current.value = index
  emits("change", index)
}
</script>

<template>
  <view class="segmented-control-list">
    <view
      v-for="(item, index) in props.values"
      class="segmented-control-item"
      :class="current === index && 'active'"
      @click="onChange(index)"
    >
      <text>{{ item }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.segmented-control-list {
  flex: 1;
  margin-bottom: 32rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 88rpx;
}
.segmented-control-item {
  flex: 1 0 auto;
  max-width: 33.33%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text {
    position: relative;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 32rpx;
    color: rgba(51, 51, 51, 1);
  }
  &.active text {
    font-size: 28rpx;
    font-weight: 700;
    line-height: 32rpx;
    color: rgba(48, 93, 218, 1);
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -20rpx;
      height: 8rpx;
      border-radius: 4rpx;
      background: #305dda;
    }
  }
}
</style>
