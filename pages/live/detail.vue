<script setup>
import parseHtml from "@/static/js/html-parser"
import { onLoad } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { POST_LIVE_DETATILS } from "@/api"
import dayjs from "dayjs"
import { computed, ref } from "vue"
const detail = ref({
  id: -1,
  title: "",
  teachername: "",
  teacher_pic: "",
  teacher_introduction: "",
  pic: "",
  starttime: -1,
  endtime: -1,
  playback_url: "",
  classurl: "",
  reservation: -1,
  enable: -1,
  subscribe: -1,
  watch: -1
})

onLoad(async (options) => {
  const res = await httpRequest(POST_LIVE_DETATILS, "POST", { id: options.id })
  detail.value = res.data
})

const date = computed(() => {
  const { starttime, endtime } = detail.value
  return `${dayjs(starttime).format("M月D日 HH:mm")}-${dayjs(endtime).format("HH:mm")}`
})
const content = computed(() => parseHtml(detail.value.classurl))

function transformDate(diff) {
  diff = dayjs(diff).diff(Date.now())
  console.log(diff)
  if (diff > 0) {
    // 计算剩余的天数、小时、分钟、秒数
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return [days, hours, minutes, seconds]
  }
  return []
}
const status = computed(() => {
  const { enable, starttime } = detail.value

  switch (enable) {
    case 3:
      return {
        topText: "正在直播中",
        countdown: [],
        btnText: "看直播",
        btnStyle: "btn-done"
      }
    case 4:
      return {
        topText: "直播已结束！",
        countdown: [],
        btnText: "领取回放资料",
        btnStyle: "btn-done"
      }
    case 2:
      return {
        topText: "距直播开始还有",
        countdown: transformDate(starttime * 1000),
        btnText: "已预约 领取直播讲义",
        btnStyle: "btn-done"
      }
    default:
      // 1
      return {
        topText: "距直播开始还有",
        countdown: transformDate(starttime * 1000),
        btnText: "立即预约"
      }
  }
})
</script>

<template>
  <view>
    <view class="live-top">
      <image class="ad-img" :src="detail.pic" />
      <view class="content">
        <text class="distance">{{ status.topText }}</text>
        <uni-countdown
          class="countdown-time"
          v-if="status.countdown.length"
          :day="status.countdown[0]"
          :hour="status.countdown[1]"
          :minute="status.countdown[2]"
          :second="status.countdown[3]"
          :show-colon="false"
          color="#305DDA"
          splitor-color="#ffffff"
          background-color="#ffffff"
        />
        <view v-else-if="status.btnText === '领取回放资料'" class="receive-btn">领取回放资料</view>
      </view>
    </view>
    <view class="person-info">
      <text class="live-name">{{ detail.title }}</text>
      <image class="avatar" :src="detail.teacher_pic"></image>
      <view class="box-info">
        <text class="name">{{ detail.teachername }}</text>
        <view class="line-box">
          <text class="date">{{ date }}</text>
          <text class="booking">{{ detail.reservation }}人已预约</text>
        </view>
      </view>
    </view>
    <view class="line-title">老师简介</view>
    <view class="teacher-profile">
      {{ detail.teacher_introduction }}
    </view>
    <view class="line-title">课程详情</view>
    <view class="rich-text-box">
      <rich-text :nodes="content"></rich-text>
    </view>
    <view class="fixed-bottom">
      <view class="fixed-bottom-content">
        <view class="teacher">
          <image src="/static/course/icon_banjiqun@2x.png"></image>
          <text>学管老师</text>
        </view>
        <view class="btn" :class="status.btnStyle">
          <!--立即预约-->
          {{ status.btnText }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.fixed-bottom {
  height: 98rpx;
}
.rich-text-box {
  width: 686rpx;
  display: flex;
  margin: 0 32rpx 48rpx;
  * {
    max-width: 100%;
    max-height: 100%;
  }
}
.fixed-bottom-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  background: #ffffff;
  .teacher {
    flex: 0 0 auto;
    width: 326rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 44rpx;
    color: rgba(51, 51, 51, 1);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    image {
      width: 44rpx;
      height: 44rpx;
      margin-right: 10rpx;
    }
  }
  .btn {
    flex: 0 0 auto;
    width: 368rpx;
    height: 76rpx;
    border-radius: 200rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;
    font-size: 28rpx;
    font-weight: 700;
    line-height: 76rpx;
    color: rgba(255, 255, 255, 1);
  }
  .btn-done {
    color: rgba(48, 93, 218, 1);
    border: 2rpx solid rgba(48, 93, 218, 1);
    background: #ffffff;
  }
}
.line-title {
  font-size: 28rpx;
  font-weight: 700;
  line-height: 28rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 16rpx;
  margin-left: 32rpx;
}
.teacher-profile {
  font-size: 28rpx;
  font-weight: 400;
  line-height: 39.2rpx;
  color: rgba(102, 102, 102, 1);
  margin: 0 32rpx 48rpx;
}
.person-info {
  display: flex;
  flex-flow: row wrap;
  padding: 32rpx;
  margin-bottom: 48rpx;
  box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.06);
  .live-name {
    width: 100%;
    flex: 1 1 auto;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 48rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 32rpx;
  }
  .avatar {
    flex: 0 0 auto;
    width: 64rpx;
    height: 64rpx;
    margin-right: 6rpx;
    border-radius: 50%;
    overflow: hidden;
  }
  .box-info {
    width: calc(100% - 70rpx);
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
  }
  .name {
    word-break: break-all;
    width: 100%;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
  }
  .line-box {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
  .date {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(48, 93, 218, 1);
  }
  .booking {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(48, 93, 218, 1);
  }
}
.live-top {
  position: relative;
  width: 750rpx;
  height: 422rpx;
  .ad-img {
    width: 750rpx;
    height: 422rpx;
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 422rpx;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    .distance {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 44.8rpx;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 14rpx;
    }

    .receive-btn {
      margin-top: 18rpx;
      width: 232rpx;
      height: 64rpx;
      border-radius: 200rpx;
      background: rgba(255, 255, 255, 1);
      font-size: 28rpx;
      font-weight: 700;
      line-height: 64rpx;
      color: rgba(48, 93, 218, 1);
      text-align: center;
    }
  }
}
.countdown-time {
  :deep(.uni-countdown__number) {
    font-size: 28rpx !important;
    font-weight: 700;
    height: 56rpx;
    line-height: 56rpx !important;
  }
  :deep(.uni-countdown__splitor) {
    font-size: 28rpx !important;
    font-weight: 700;
  }
}
.card {
  width: 44rpx;
  line-height: 56rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 1);
  color: rgba(48, 93, 218, 1);
  text-align: center;
}
</style>
