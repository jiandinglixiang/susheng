<script setup>
import PopupIndex from "@/components/popup/index.vue"
import { HOME_AD_POPUP } from "@/components/popup/popupKeyMap"
import Carousel from "@/pages/home/components/Carousel.vue"
import NavBar from "@/pages/home/components/NavBar.vue"
import KongoDistrict from "@/pages/home/components/KongoDistrict.vue"
import SectionBar from "@/pages/home/components/SectionBar.vue"
import CountdownBar from "@/pages/home/components/CountdownBar.vue"
import LiveScrollX from "@/pages/home/components/LiveScrollX.vue"
import CourseGroupLine from "@/pages/home/components/CourseGroupLine.vue"
import CourseGroup from "@/pages/home/components/CourseGroup.vue"
import { AppAuditStatus } from "@/pinia/audit"
import { nextTick, ref } from "vue"
import { AD_POP_UP_IMPRESSION_HISTORY } from "@/utils/consts"
import dayjs from "dayjs"
import { onLoad } from "@dcloudio/uni-app"
const storeAppAuditStatus = { auditStatusBoolean: false } || AppAuditStatus()
const showAdPopup = ref(false)
const refAdPopup = ref()

onLoad(() => {
  const AdPopUpHistory = uni.getStorageSync(AD_POP_UP_IMPRESSION_HISTORY)
  if (!AdPopUpHistory || !dayjs().isSame(AdPopUpHistory.time, "day")) {
    showAdPopup.value = true
    nextTick(() => {
      refAdPopup.value.open()
      uni.setStorageSync(AD_POP_UP_IMPRESSION_HISTORY, {
        time: Date.now()
      })
    })
  }
})
</script>

<template>
  <nav-bar />
  <carousel />
  <kongo-district />
  <countdown-bar />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="最近直播" nav-url="/pages/live/liveList" />
    <live-scroll-x />
  </template>
  <section-bar left-text="精选课程" nav-url="/pages/course/courseList?type=video" />
  <course-group-line />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="系统课" nav-url="/pages/course/courseList?type=course" />
    <course-group />
  </template>
  <popup-index v-if="showAdPopup" ref="refAdPopup" :popup-key="HOME_AD_POPUP" />
</template>

<style></style>
