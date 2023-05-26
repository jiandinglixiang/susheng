<script setup>
import { POST_LIVE_SUBSCRIBE } from "@/api/index"
import { formatNumber } from "@/utils/func"
import { httpRequest } from "@/utils/http"
import dayjs from "dayjs"
import { computed, ref } from "vue"

const props = defineProps({
  itemData: {
    type: Object,
    default() {
      return {}
    }
  }
})
const enable = ref(props.itemData.enable)

const date = computed(() => {
  const { starttime, endtime } = props.itemData
  return `${dayjs(starttime).format("M月D日 HH:mm")}-${dayjs(endtime).format("HH:mm")}`
})

const people = computed(() => formatNumber(props.itemData.reservation))

const status = computed(() => {
  switch (enable.value) {
    case 3:
      return {
        btn: "去上课",
        style: "watching-live",
        style2: "",
        handleClick() {
          //   跳转微信助教
        }
      }
    case 4:
      return {
        btn: "回放资料",
        style: "watch-replay",
        style2: "reserved",
        handleClick() {
          //   跳转微信助教
        }
      }
    case 2:
      return {
        btn: "领取讲义",
        style: "",
        style2: "reserved",
        handleClick() {
          //
        }
      }
    default:
      // 1
      return {
        btn: "预约",
        style: "",
        style2: "reservation-now",
        async handleClick() {
          if (enable.value) {
            return
          }
          await httpRequest(POST_LIVE_SUBSCRIBE, "POST", { liveid: props.itemData.id, type: 1 })
          uni.showToast({ title: "预约成功", icon: "none" })
          enable.value = 1
        }
      }
  }
})
function navigateTo() {
  uni.navigateTo({ url: "/pages/live/detail?id=" + props.itemData.id })
}
</script>

<template>
  <view class="live-card-item">
    <view class="live-status" :class="status.style">
      <!--直播中-->
    </view>
    <image class="live-img" :src="itemData.pic" @click="navigateTo" />
    <text class="name">{{ itemData.title }}</text>
    <text class="time">{{ date }}</text>
    <view class="bottom-box">
      <text class="people">{{ people }}</text>
      <view class="btn" :class="status.style2" @click="status.handleClick">
        <!--预约-->
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.live-card-item {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  margin-left: 32rpx;
  height: 380rpx;
  border-radius: 0rpx 0rpx 8rpx 8rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-img {
    flex: 0 0 auto;
    width: 312rpx;
    height: 176rpx;
    border-radius: 8rpx 8rpx 0rpx 0rpx;
    margin-bottom: 16rpx;
  }
  .name {
    flex: 0 0 auto;
    margin: 0 16rpx 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
    text-align: justify;
    max-height: 72rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time {
    flex: 1 0 auto;
    margin: 0 16rpx 16rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
  }
  .bottom-box {
    width: 100%;
    flex: 0 0 auto;
    align-self: flex-end;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .people {
    flex: 1 1 auto;
    height: 24rpx;
    margin-left: 16rpx;
    padding-left: 28rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
    background: url("/static/home/numberOfPeople@2x.png") no-repeat left center;
    background-size: 20rpx 24rpx;
    overflow: hidden;
  }
  .btn {
    flex: 0 0 auto;
    width: 148rpx;
    height: 56rpx;
    border-radius: 16rpx 0rpx 8rpx 0rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;

    &:after {
      content: "去上课";
      font-size: 24rpx;
      font-weight: 500;
      line-height: 56rpx;
      color: rgba(255, 255, 255, 1);
    }
    &.reservation-now {
      background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 100%);
      &:after {
        content: "立即预约";
      }
    }
    &.reserved {
      opacity: 0.4;
      background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 40%);
      &:after {
        content: "已预约";
      }
    }
  }
}
.live-status {
  position: absolute;
  left: 0;
  top: 0;
  padding: 8rpx;
  border-radius: 8rpx 0rpx 16rpx 0rpx;
  background: linear-gradient(130.38deg, rgba(255, 186, 59, 1) 0%, rgba(255, 139, 23, 1) 100%);
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  &:after {
    content: "未开始";
    scale: 0.8;
    font-size: 20rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  &.watching-live {
    background: linear-gradient(139.19deg, rgba(49, 227, 179, 1) 0%, rgba(22, 195, 124, 1) 100%);
    &:after {
      content: "直播中";
    }
  }
  &.watch-replay {
    background: linear-gradient(135deg, rgba(202, 148, 255, 1) 0%, rgba(154, 91, 255, 1) 100%);
    &:after {
      content: "看回放";
    }
  }
}
</style>
