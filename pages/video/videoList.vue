<script setup>
import CourseLineCardItem from "@/components/course/CourseLineCardItem.vue"
import { NoticeStatus } from "@/pinia/notice"
import { PAGES_VIDEO_DETAIL } from "@/utils/consts"
import { openURL } from "@/utils/func"
import { httpRequest } from "@/utils/http"
import { POST_VIDEO_LIST } from "@/api"
import { onLoad } from "@dcloudio/uni-app"
import { ref } from "vue"
import LoadTips from "@/components/tips/load-tips.vue"
const list = ref([])
const loading = ref("")
const storeNotice = NoticeStatus()

onLoad(async () => {
  try {
    const res = await httpRequest(POST_VIDEO_LIST, "POST")
    list.value = res.data.map((item) => {
      return {
        ...item,
        src: item.file,
        title: item.title,
        number: item.star
      }
    })
    if (!list.value.length) {
      loading.value = "nodata"
    }
  } catch (e) {
    loading.value = e?.noNetwork ? "networkerror" : "error"
  }
})
function handleClick(item) {
  uni.setStorageSync(PAGES_VIDEO_DETAIL, item)
  uni.navigateTo({ url: "./detail" })
}
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <uni-nav-bar
    title="精选课程"
    fixed
    statusBar
    left-icon="back"
    :border="false"
    @clickLeft="navigateBack"
    @clickRight="openURL(storeNotice.onlineConsultation[0])"
    class="nav-bar"
  >
    <template v-slot:right>
      <image class="right-btn" src="/static/pdf/customer-service@2x.png" />
    </template>
  </uni-nav-bar>
  <view style="height: 16rpx"></view>
  <course-line-card-item
    v-for="item in list"
    :key="item.id"
    :item-data="item"
    @click="handleClick(item)"
    displayMode="video"
  />
  <load-tips v-if="loading" :loading="loading" />
</template>

<style scoped lang="scss">
.nav-bar {
  :deep(.uni-nav-bar-text) {
    font-size: 36rpx;
    font-weight: 500;
  }
}
.right-btn {
  width: 48rpx;
  height: 48rpx;
}
</style>
