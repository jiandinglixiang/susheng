<script setup>
import { computed, ref } from "vue"
import dayjs from "dayjs"
import { httpRequest } from "@/utils/http"
import { POST_LIVE_SUBSCRIBE } from "@/api"

const props = defineProps({
  itemData: {
    type: Object,
    default() {
      return {
        enable: 1,
        endtime: 0,
        id: 1,
        pic: "",
        playback_url: "",
        reservation: 0,
        starttime: 0,
        subscribe: 0,
        teacher_introduction: "",
        teacher_pic: "",
        teachername: "",
        title: "",
        watch: 0
      }
    }
  }
})
const enable = ref(props.itemData.enable)

const date = computed(() => {
  const { starttime, endtime } = props.itemData
  return `${dayjs(starttime).format("M月D日 HH:mm")}-${dayjs(endtime).format("HH:mm")}`
})

const status = computed(() => {
  switch (enable.value) {
    case 3:
      return {
        btn: "看直播",
        style2: "living",
        style: "watching-live",
        handleClick() {
          //   跳转微信助教
        }
      }
    case 4:
      return {
        btn: "回放资料",
        style: "watch-replay",
        style2: "",
        handleClick() {
          //   跳转微信助教
        }
      }
    case 2:
      return {
        btn: "领取讲义",
        style: "reserved",
        style2: "",
        handleClick() {
          //
        }
      }
    default:
      // 1
      return {
        btn: "预约",
        style: "",
        style2: "",
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
  <view class="live-line-card-item">
    <image @click="navigateTo" class="live-img" :src="itemData.pic" />
    <view class="right-content">
      <text class="name">
        {{ itemData.title }}
      </text>
      <view class="bottom-time">{{ date }}</view>
    </view>
    <view class="live-status" :class="status.style">
      <!--已预约-->
    </view>
    <view class="receive-handouts" :class="status.style2" @click="status.handleClick">
      {{ status.btn }}
    </view>
  </view>
</template>

<style scoped lang="scss">
.live-line-card-item {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 32rpx 32rpx;
  padding: 16rpx 0 16rpx 16rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-img {
    flex: 0 0 auto;
    width: 254rpx;
    height: 140rpx;
    border-radius: 4rpx;
    margin-right: 20rpx;
  }
  .right-content {
    flex: 1 1 auto;
    min-height: 140rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: space-between;
    margin-right: 20rpx;
  }
  .name {
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 36rpx;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    max-height: 72rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .bottom-time {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 32rpx;
    color: rgba(48, 93, 218, 1);
    padding-right: 128rpx;
  }
}
.receive-handouts {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 128rpx;
  height: 60rpx;
  border-radius: 8rpx 0rpx 8rpx 0rpx;
  background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
  font-size: 24rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  &.living:before {
    content: "";
    display: inline-block;
    width: 20rpx;
    height: 20rpx;
    background: url("/static/live/btniconliving.png") no-repeat left center;
    background-size: 100% auto;
    margin-right: 4rpx;
  }
}
.live-status {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: 4rpx;
  border-radius: 8rpx 0rpx 8rpx 0rpx;
  background: rgba(255, 243, 230, 1);

  &:after {
    content: "待开始";
    scale: 0.75;
    font-size: 24rpx;
    font-weight: 700;
    color: rgba(255, 142, 13, 1);
    vertical-align: top;
  }
  &.watching-live {
    background: rgba(231, 241, 255, 1);
    &:after {
      content: "直播中";
      color: rgba(15, 115, 255, 1);
    }
  }
  &.reserved {
    background: rgba(237, 237, 237, 1);
    &:after {
      content: "已预约";
      color: rgba(138, 138, 138, 1);
    }
  }
  &.watch-replay {
    background: rgba(230, 247, 237, 1);
    &:after {
      content: "回放中";
      color: rgba(9, 179, 77, 1);
    }
  }
}
</style>
