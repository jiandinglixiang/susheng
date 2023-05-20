<script setup>
import CourseLineCardItem from "@/components/course/CourseLineCardItem.vue"
import InformationItem from "@/components/information/InformationItem.vue"
import SegmentedControl from "@/components/segmented-control/SegmentedControl.vue"
</script>

<template>
  <segmented-control :values="['AAAAAsa', 'AAAAA']" />
  <view>
    <course-line-card-item />
    <course-line-card-item />
    <course-line-card-item />
    <information-item/>
    <information-item/>
    <information-item/>

  </view>
</template>

<style scoped lang="scss"></style>
