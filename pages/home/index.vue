<script setup>
import PopupIndex from "@/components/popup/index.vue"
import { HOME_AD_POPUP } from "@/components/popup/popupKeyMap"
import Carousel from "@/pages/home/components/Carousel.vue"
import NavBar from "@/pages/home/components/NavBar.vue"
import KongoDistrict from "@/pages/home/components/KongoDistrict.vue"
import NoticeBar from "@/components/notice-bar/NoticeBar.vue"
import SectionBar from "@/pages/home/components/SectionBar.vue"
import CountdownBar from "@/pages/home/components/CountdownBar.vue"
import LiveScrollX from "@/pages/home/components/LiveScrollX.vue"
import CourseGroupLine from "@/pages/home/components/CourseGroupLine.vue"
import CourseGroup from "@/pages/home/components/CourseGroup.vue"
import { AppAuditStatus } from "@/pinia/audit"
import { nextTick, ref } from "vue"
const storeAppAuditStatus = { auditStatusBoolean: false } || AppAuditStatus()
const refAdPopup = ref()
nextTick(() => {
  refAdPopup.value.open()
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
  <section-bar left-text="精选课程" nav-url="/pages/course/courseList" />
  <course-group-line />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="系统课" nav-url="/pages/live/courseList" />
    <course-group />
  </template>
  <popup-index ref="refAdPopup" :popup-key="HOME_AD_POPUP" />
</template>

<style></style>
