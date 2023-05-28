<script setup>
import PopupIndex from "@/components/popup/PopupIndex.vue"
import { HOME_AD_POPUP, LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import ImageCarousel from "@/pages/home/components/ImageCarousel.vue"
import NavBar from "@/pages/home/components/NavBar.vue"
import KongoDistrict from "@/pages/home/components/KongoDistrict.vue"
import SectionBar from "@/pages/home/components/SectionBar.vue"
import CountdownBar from "@/pages/home/components/CountdownBar.vue"
import LiveScrollX from "@/pages/home/components/LiveScrollX.vue"
import CourseGroupLine from "@/pages/home/components/CourseGroupLine.vue"
import CourseGroup from "@/pages/home/components/CourseGroup.vue"
import { AppAuditStatus } from "@/pinia/audit"
import { PopupStatus } from "@/pinia/popup"
import { nextTick, ref } from "vue"
import { AD_POP_UP_IMPRESSION_HISTORY, USER_TOKEN_DATA } from "@/utils/consts"
import dayjs from "dayjs"
import { onLoad } from "@dcloudio/uni-app"
const noLogin = !uni.getStorageSync(USER_TOKEN_DATA)?.token

const storeAppAuditStatus = { auditStatusBoolean: false } || AppAuditStatus()
const showAdPopup = ref(false)
const refAdPopup = ref()

onLoad(() => {
  const AdPopUpHistory = uni.getStorageSync(AD_POP_UP_IMPRESSION_HISTORY)
  if (!AdPopUpHistory || !dayjs().isSame(AdPopUpHistory, "day")) {
    showAdPopup.value = true
    nextTick(() => {
      refAdPopup.value.open()
      uni.setStorageSync(AD_POP_UP_IMPRESSION_HISTORY, Date.now())
    })
  }
})
</script>

<template>
  <nav-bar />
  <image-carousel />
  <kongo-district />
  <countdown-bar />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="最近直播" nav-url="/pages/live/liveList" />
    <live-scroll-x />
    <popup-index
      v-if="noLogin"
      :ref="(r) => PopupStatus().setPopupRef(LOGIN_TIPS_POPUP, r)"
      :popup-key="LOGIN_TIPS_POPUP"
    />
  </template>
  <section-bar left-text="精选课程" nav-url="/pages/video/videoList" />
  <course-group-line />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="系统课" nav-url="/pages/course/courseList" />
    <course-group />
  </template>
  <popup-index v-if="showAdPopup" ref="refAdPopup" :popup-key="HOME_AD_POPUP" />
</template>

<style></style>
