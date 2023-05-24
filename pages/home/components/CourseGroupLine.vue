<script setup>
import CourseLineCardItem from "@/components/course/CourseLineCardItem.vue"
import { onMounted, ref } from "vue"
import { httpRequest } from "@/utils/http"
import { POST_VIDEO_LIST } from "@/api/home"
const list = ref([])

onMounted(async () => {
  const res = await httpRequest(POST_VIDEO_LIST, "POST")
  list.value = res.data
})
</script>

<template>
  <course-line-card-item v-for="item in list" :key="item.id" :item-data="item" />
  <view style="height: 32rpx"></view>
</template>

<style scoped lang="scss"></style>
