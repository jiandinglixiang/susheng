<script setup>
import { POST_LIVE_SUBSCRIBE } from "@/api"
import { LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import { NoticeStatus } from "@/pinia/notice"
import { PopupStatus } from "@/pinia/popup"
import { USER_TOKEN_DATA } from "@/utils/consts"
import { openURL } from "@/utils/func"
import { httpRequest } from "@/utils/http"
import dayjs from "dayjs"
import { computed, ref } from "vue"

const noLogin = !uni.getStorageSync(USER_TOKEN_DATA)?.token
const storeNotice = NoticeStatus()
const storePopup = PopupStatus()

const props = defineProps({
  isLineCard: Boolean,
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
          openURL(storeNotice.miniApp.find((i) => i.id === 7))
        }
      }
    case 4:
      return {
        btn: "回放资料",
        style: "watch-replay",
        style2: "",
        handleClick() {
          openURL(storeNotice.miniApp.find((i) => i.id === 7))
        }
      }
    case 2:
      return {
        btn: "领取讲义",
        style: "reserved",
        style2: "",
        handleClick() {
          openURL(storeNotice.miniApp.find((i) => i.id === 7))
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
          if (noLogin) {
            gotoLogin()
            return
          }
          await httpRequest(POST_LIVE_SUBSCRIBE, "POST", { liveid: props.itemData.id, type: 1 })
          uni.showToast({ title: "预约成功", icon: "none" })
          enable.value = 1
        }
      }
  }
})

function gotoLogin() {
  storePopup[LOGIN_TIPS_POPUP]?.open({
    title: "提示",
    tips: "直播预约功能需要您登录后，我们才可通知您开课信息",
    buttonText: "去登录",
    handleClick(action) {
      if (action === "btn") {
        uni.navigateTo({ url: "/pages/login/index" })
      }
    }
  })
}

function navigateTo() {
  uni.navigateTo({ url: "/pages/live/detail?id=" + props.itemData.id })
}
</script>

<template>
  <view class="live-line-card-item" @click="navigateTo">
    <image :src="itemData.pic" class="live-img" />
    <view class="right-content">
      <text class="name">
        {{ itemData.title }}
      </text>
      <view class="bottom-time">{{ date }}</view>
    </view>
    <view :class="status.style" class="live-status">
      <!--已预约-->
    </view>
    <view :class="status.style2" class="receive-handouts" @click.stop="status.handleClick">
      {{ status.btn }}
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
