<template>
  <view class="drag-sort-container" :style="styles.areaStyle">
    <movable-area :style="styles.areaStyle">
      <movable-view
        class="drag-sort-item"
        v-for="(item, index) in sortedItems"
        :key="item.id"
        :x="location[index].x"
        :y="location[index].y"
        direction="all"
        @change="onItemChange(index, $event)"
        @touchend="onTouchEnd(index)"
        :style="{
          zIndex: item.zIndex,
          ...styles.viewStyle
        }"
      >
        <view class="movable-view-content">
          <image
            class="cover-img"
            :style="styles.viewStyle"
            src="/static/logo.png"
            mode="aspectFill"
          ></image>
        </view>
      </movable-view>
    </movable-area>
  </view>
</template>

<script setup>
import { computed, onMounted, reactive, ref, nextTick, toRef } from "vue"
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const viewWidth = uni.upx2px(174)
const viewHeight = uni.upx2px(118)
const areaWidth = uni.upx2px(600)
const spaceW = uni.upx2px(12)

const emits = defineEmits(["update:items"])

const location = reactive(
  props.items.map((value, index, arr) => {
    // 计算出初始位置
    const len = arr.length > 3 ? 3 : arr.length
    const yS = Math.floor(index / 3) // 列
    const xS = Math.floor(index % 3) // 行
    const startX = (areaWidth - viewWidth * len) / (len < 2 ? 2 : len)

    const oX = startX + viewWidth * xS + spaceW * xS
    const oY = viewHeight * yS + spaceW * yS
    return {
      width: viewWidth,
      height: viewHeight,
      x: oX,
      y: oY
    }
  })
)
const sortedItems = reactive(
  props.items.map((value, index) => {
    return {
      ...value,
      rY: location[index].y,
      rX: location[index].x,
      zIndex: 0
    }
  })
)
const styles = computed(() => {
  const len = Math.ceil(props.items.length / 3)
  return {
    viewStyle: {
      height: `${viewHeight}px`,
      width: `${viewWidth}px`
    },
    areaStyle: `height:${viewHeight * len + spaceW * len}px;width:${areaWidth}px;`
  }
})

function onItemChange(index, { detail }) {
  sortedItems[index].rX = detail.x
  sortedItems[index].rY = detail.y
  sortedItems[index].zIndex = detail.source ? 10 : 1
}

async function onTouchEnd(index) {
  const { rX, rY } = sortedItems[index]
  const targetIndex = findNearestRectangle(location, rX, rY, viewWidth, viewHeight)
  location[index].x++
  await nextTick2(100)
  location[index].x-- // 回到原位
  if (targetIndex === -1) {
    return
  }
  sortedItems.splice(targetIndex, 0, sortedItems.splice(index, 1)[0])
  emits("update:items", sortedItems)
  console.log([...sortedItems])
}

function findNearestRectangle(rectangles, x, y, width, height) {
  // 找出匹配矩形
  let minDistance = Number.MAX_SAFE_INTEGER
  let nearestIndex = -1

  for (let i = 0; i < rectangles.length; i++) {
    const rectangle = rectangles[i]
    const distance = Math.sqrt(Math.pow(x - rectangle.x, 2) + Math.pow(y - rectangle.y, 2))

    if (distance < minDistance && rectangle.width >= width && rectangle.height >= height) {
      minDistance = distance
      nearestIndex = i
    }
  }

  return nearestIndex
}

function nextTick2(time = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      nextTick(resolve)
    }, time)
  })
}
</script>

<style>
.drag-sort-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin: 40rpx;
}

.drag-sort-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.movable-view-content {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-img {
  border: 2px solid rgba(153, 153, 153, 1);
  border-radius: 16rpx;
}
</style>
