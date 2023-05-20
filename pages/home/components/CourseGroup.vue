<script setup>
import CourseCardItem from "@/components/course/CourseCardItem.vue"
</script>

<template>
  <view class="course-group">
    <course-card-item />
    <course-card-item />
    <course-card-item />
    <course-card-item />
    <course-card-item />
  </view>
</template>

<style scoped lang="scss">
.course-group {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 32rpx;
}
</style>
