<script setup>
import dayjs from "dayjs"
import { onMounted, onUnmounted, ref, watch } from "vue"
import { NoticeStatus } from "@/pinia/notice"
import { openURL } from "@/utils/func"
const storeNotice = NoticeStatus()
const current = ref({
  index: 0,
  name: "考试",
  value: "0"
})
let list = []
let time = 0
const stopWatch = watch(
  () => storeNotice.countDown,
  (countDown) => {
    list = countDown.map((item, index) => {
      return {
        ...item,
        index,
        value: dayjs(item.value * 1000)
          .diff(Date.now(), "day")
          .toString()
      }
    })
    if (!list.length) {
      return
    }
    interval()
    if (list.length === 1) {
      return
    }
    clearInterval(time)
    time = setInterval(interval, 2000)
  },
  {
    immediate: true
  }
)

function interval() {
  let index = current.value.index + 1
  if (index >= list.length) {
    index = 0
  }
  current.value = list[index]
}
onUnmounted(() => {
  clearInterval(time)
  stopWatch()
})
</script>

<template>
  <view class="countdown-bar">
    <view class="left-g">
      <text>距离下次</text>
      <text class="highlight">{{ current.name }}</text>
    </view>
    <view class="number" v-for="i in current.value">{{ i }}</view>
    <text class="days">DAYS</text>
    <button class="btn" @click="openURL(storeNotice.onlineConsultation[0])">报考规划</button>
  </view>
</template>

<style scoped lang="scss">
.countdown-bar {
  box-sizing: border-box;
  margin: 0 32rpx 42rpx;
  height: 112rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.06);
  padding: 24rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: flex-start;
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
  .left-g {
    margin-right: 12rpx;
    flex: 0 0 auto;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    font-size: 24rpx;
    font-weight: 700;
    line-height: 24rpx;
    color: rgba(51, 51, 51, 1);
  }

  .number {
    flex: 0 0 auto;
    width: 40rpx;
    height: 64rpx;
    border-radius: 12rpx;
    background: url("/static/home/timeBg@2x.png") no-repeat left top;
    background-size: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
    font-weight: 700;
    line-height: 44rpx;
    color: rgba(255, 255, 255, 1);
    margin-right: 8rpx;
  }
  .days {
    flex: 1 1 auto;
    font-size: 24rpx;
    font-weight: 700;
    line-height: 24rpx;
    color: rgba(51, 51, 51, 1);
    padding-left: 4rpx;
  }
  .btn {
    width: 160rpx;
    height: 64rpx;
    border-radius: 200rpx;
    background: rgba(48, 93, 218, 0.08);
    border: 1rpx solid rgba(48, 93, 218, 1);
    font-size: 24rpx;
    font-weight: 700;
    line-height: 64rpx;
    color: rgba(48, 93, 218, 1);
  }
}
</style>
