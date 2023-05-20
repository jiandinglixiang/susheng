<script setup>
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
const storeAppAuditStatus = { auditStatusBoolean: false } || AppAuditStatus()
</script>

<template>
  <nav-bar />
  <carousel />
  <notice-bar />
  <kongo-district />
  <countdown-bar />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="最近直播" nav-url="/" />
    <live-scroll-x />
  </template>
  <section-bar left-text="精选课程" />
  <course-group-line />
  <template v-if="!storeAppAuditStatus.auditStatusBoolean">
    <section-bar left-text="系统课" />
    <course-group />
  </template>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
