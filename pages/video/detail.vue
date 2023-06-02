<script setup>
import { LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import { PopupStatus } from "@/pinia/popup"
import { PAGES_VIDEO_DETAIL, USER_TOKEN_DATA } from "@/utils/consts"
import { openURL, setTitleNViewButtonStyle } from "@/utils/func"
import FixedFab from "@/components/fab/FixedFab.vue"
import { httpRequest } from "@/utils/http"
import { POST_VIDEO_COLLECT, POST_VIDEO_LIST_CLASSHOUR, POST_VIDEO_PLAY_LOG } from "@/api"
import { onLoad, onUnload } from "@dcloudio/uni-app"
import dayjs from "dayjs"
import { nextTick, ref } from "vue"
import { NoticeStatus } from "@/pinia/notice"
import PopupIndex from "@/components/popup/PopupIndex.vue"

const noLogin = ref(!uni.getStorageSync(USER_TOKEN_DATA)?.token)
const options = uni.getStorageSync(PAGES_VIDEO_DETAIL)
const directory = ref([])
const displayTab = ref(false)
const videoItem = ref({})

const storePopup = PopupStatus()
const storeNotice = NoticeStatus()
let stopRightButtonListener

onLoad(async () => {
  getDirectory()
  await nextTick()
  uni.setNavigationBarTitle({ title: options.title })
  setTimeout(() => {
    stopRightButtonListener = setTitleNViewButtonStyle(
      options.collect ? { text: "\ue68f", color: "#305DDA" } : { text: "\ue688", color: "#333" },
      rightButton
    )
    uni.pageScrollTo(0)
  }, 100)
})

onUnload(() => {
  stopRightButtonListener?.()
})
let videoContext
let lastCurrentTime = 0 // 上次

const videoHandle = {
  play(event) {
    console.log(event)
  },
  ended(event) {
    console.log(event)
    httpRequest(POST_VIDEO_PLAY_LOG, "POST", {
      cid: videoItem.value.id,
      play_time: 0,
      status: 2
    }).finally(() => {
      getDirectory()
      console.log("ended")
    })
  },
  timeupdate(event) {
    const { currentTime, duration } = event.detail
    if (currentTime > lastCurrentTime + 5&& !noLogin.value) {
      //  5s上报一次
      lastCurrentTime = currentTime
      const end = currentTime + 5 > duration // 和结束时间差5秒内
      httpRequest(POST_VIDEO_PLAY_LOG, "POST", {
        cid: videoItem.value.id,
        play_time: currentTime,
        status: end ? 2 : 1
      }).finally(() => {
        if (end) {
          getDirectory()
          console.log("ended")
        }
      })

      console.log(event)
    }
  }
}
function handleClickDirectory(item) {
  if (item.try_see === 2) {
    uni.showToast({ title: "试看被关闭", icon: "none" })
    return
  }
  videoItem.value = item
  console.log(item)
  nextTick(() => {
    videoContext = uni.createVideoContext("myVideo")
    videoContext.play()
  })
}

async function getDirectory() {
  const res = await httpRequest(POST_VIDEO_LIST_CLASSHOUR, "POST", { id: options.id })
  // res.data[0].children.push({
  //   id: 4507,
  //   pid: 4506,
  //   title: "CPA职业发展规划",
  //   url: "https://v-emkt.gaodun.com/video/22805c7-179c1f7558b-0000-0000-013-921e0.mp4",
  //   try_see: 1,
  //   children: []
  // })
  directory.value = res.data.map((item) => {
    return {
      ...item,
      children: item.children.map((item2) => {
        return { ...item2, play_time: (item2.play_time / 60).toFixed(2) }
      })
    }
  })
}
async function rightButton() {
  if (noLogin.value) {
    gotoLogin()
    return
  }
  await httpRequest(POST_VIDEO_COLLECT, "POST", { vid: options.id })
  options.collect = options.collect ? 0 : 1
  uni.setStorageSync(PAGES_VIDEO_DETAIL, options)
  setTitleNViewButtonStyle(
    options.collect ? { text: "\ue68f", color: "#305DDA" } : { text: "\ue688", color: "#333333" }
  )
  uni.$emit("/pages/video/detail", "collect", options)
}

function gotoLogin() {
  storePopup[LOGIN_TIPS_POPUP]?.open({
    title: "提示",
    tips: "收藏功能需要您登录后，我们才能为您保存相应的收藏内容",
    buttonText: "去登录",
    handleClick(action) {
      if (action === "btn") {
        uni.navigateTo({ url: "/pages/login/index" })
      }
    }
  })
}
</script>

<template>
  <view>
    <popup-index
      v-if="noLogin"
      :ref="(r) => PopupStatus().setPopupRef(LOGIN_TIPS_POPUP, r)"
      :popup-key="LOGIN_TIPS_POPUP"
    />
    <fixed-fab
      type="teaching"
      @handleClick="openURL(storeNotice.miniApp.find((i) => i.id === 4))"
    />
    <view class="header-container">
      <video
        v-if="videoItem.id"
        id="myVideo"
        class="full-box"
        :autoplay="true"
        :loop="true"
        :src="videoItem.url"
        :enable-progress-gesture="false"
        :show-mute-btn="true"
        :initial-time="0"
        @play="videoHandle.play"
        @ended="videoHandle.ended"
        @timeupdate="videoHandle.timeupdate"
      ></video>
      <image v-else class="full-box" :src="options.file" />
    </view>
    <view
      class="receive-information-card"
      @click="openURL(storeNotice.miniApp.find((i) => i.id === 7))"
    >
      <text class="name">{{ options.title }}</text>
      <view class="box-below">
        <text class="highlight">领取资料</text>
        <text>点击添加学管领取课程资料</text>
      </view>
    </view>
    <view class="detailed-catalog">
      <text :class="!displayTab && 'highlight'" @click="displayTab = !displayTab">课程详情</text>
      <text :class="displayTab && 'highlight'" @click="displayTab = !displayTab">课程目录</text>
    </view>
    <view class="sub-box" v-show="!displayTab">
      <view class="sub-name">- 课程内容 -</view>
      <image class="sub-img" :src="options.detail_img" mode="widthFix"></image>
      <!-- <view class="sub-name">- 配套材料 -</view>
      <image class="sub-img" :src="options.src" mode="widthFix"></image> -->
    </view>
    <uni-collapse v-show="displayTab">
      <uni-collapse-item
        :border="false"
        class="collapse-item"
        :title="item.title"
        title-border="none"
        v-for="(item, index) in directory"
        :key="item.id"
        :open="index === 0"
      >
        <view
          class="collapse-content-item"
          :class="item.children.length !== index2 + 1 && 'bottom-border'"
          v-for="(item2, index2) in item.children"
          :key="item2.id"
        >
          <view class="box-left">
            <view class="name" :class="videoItem.id === item2.id && 'highlight'">
              <image
                v-if="videoItem.id === item2.id"
                class="playing"
                src="/static/course/playing@2x.png"
              ></image>
              {{ item2.title }}
            </view>
            <view class="time-people">
              <image class="time" src="/static/course/time-icon@2x.png"></image>
              <text class="time-text">{{ item2.play_time }}</text>
              <!-- <image class="people" src="/static/course/people-number@2x.png"></image>
              <text class="people-text">666人</text> -->
            </view>
          </view>
          <view
            class="box-right"
            :class="[
              item2.try_see === 1 &&
                ((videoItem.id === item2.id && 'status-ing') ||
                  (item2.status === 2 && 'status-end'))
            ]"
            @click="handleClickDirectory(item2)"
          >
            <!--待学习-->
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<style scoped lang="scss">
.header-container {
  position: relative;
  width: 750rpx;
  height: 412rpx;
}

.full-box {
  width: 100%;
  height: 100%;
}

.videoHide {
  position: absolute;
  width: 1px;
  height: 1px;
}

.sub-box {
  margin: 0 32rpx;
}
.sub-img {
  width: 100%;
}
.sub-name {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 24rpx;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  margin-bottom: 20rpx;
}
.course-price {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 104rpx;
  padding: 0 32rpx;
  border-radius: 0rpx 0rpx 16rpx 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  .rmb {
    font-size: 32rpx;
  }
  .price {
    flex: 1 1 auto;
    font-size: 48rpx;
    font-weight: 700;
    line-height: 48rpx;
    color: rgba(235, 61, 61, 1);
  }
  .date-text {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
    margin-right: 8rpx;
  }
  .date {
    flex: 0 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(235, 61, 61, 1);
  }
}
.receive-information-card {
  margin: 32rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-flow: column nowrap;
  .box-below {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(51, 51, 51, 1);
    background: url("/static/home/arrow@2x.png") no-repeat right center;
    background-size: 14rpx 20rpx;
  }
  .name {
    font-size: 32rpx;
    font-weight: 700;
    line-height: 32rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 32rpx;
  }
  .highlight {
    margin-right: 12rpx;
    padding: 6rpx 8rpx;
    color: rgba(48, 93, 218, 1);
    border-radius: 4rpx;
    background: rgba(48, 93, 218, 0.1);
  }
}
.detailed-catalog {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin: 0 32rpx 32rpx;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 28rpx;
  color: rgba(153, 153, 153, 1);
  text {
    height: 42rpx;
    position: relative;
    margin-right: 32rpx;
  }
  .highlight {
    color: rgba(51, 51, 51, 1);
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32rpx;
      height: 6rpx;
      border-radius: 4rpx;
      background: rgba(48, 93, 218, 1);
    }
  }
}
.collapse-item {
  overflow: hidden;
  margin: 0 32rpx 16rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.07);
  :deep(.uni-collapse-item__wrap-content) {
    padding-bottom: 24rpx;
  }
  :deep(.uni-collapse-item__title-text) {
    font-size: 32rpx;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }
  :deep(.uni-collapse-item__title-arrow) {
    uni-text {
      display: none;
    }
    background: url("/static/home/arrow@2x.png") no-repeat center center;
    background-size: 14rpx 20rpx;
    &.uni-collapse-item__title-arrow-active {
      transform: rotate(90deg);
    }
  }
}
.collapse-content-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  box-sizing: border-box;
  height: 120rpx;
  margin: 0 32rpx;
  padding: 24rpx 0;
  &.bottom-border {
    border-bottom: 4rpx solid rgba(238, 238, 238, 1);
  }
  .box-left {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
  }
  .playing {
    display: inline-block;
    width: 20rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }
  .name {
    min-width: 500rpx;
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 16rpx;
  }
  .highlight {
    color: rgba(48, 93, 218, 1);
  }
  .time-people {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
  .time {
    flex: 0 0 auto;
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
  }
  .time-text,
  people-text {
    flex: 0 0 auto;
    margin-right: 18rpx;
  }
  .people {
    flex: 0 0 auto;
    width: 20rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }

  .box-right {
    flex: 0 0 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(255, 139, 23, 1);
    padding-left: 48rpx;
    height: 40rpx;
    background: url("/static/course/play-with-learning@2x.png") no-repeat left center;
    background-size: 40rpx 40rpx;
    &:after {
      content: "待学习";
    }
    &.status-end {
      color: rgba(204, 204, 204, 1);
      background-image: url("/static/course/video-play3.png");
      &:after {
        content: "已学完";
      }
    }
    &.status-ing {
      color: rgba(48, 93, 218, 1);
      background-image: url("/static/course/video-play@2x.png");
      &:after {
        content: "学习中";
      }
    }
  }
}
</style>
