<script setup>
import CourseLineCardItem from "@/components/course/CourseLineCardItem.vue"
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { usePageList } from "@/hooks/usePageList"
import { GET_VCOURSE_LIST } from "@/api"
import LoadTips from "@/components/tips/load-tips.vue"

const { list, getList, loading, loadMore, refresh } = usePageList({ requestFunc })

onLoad((options) => {
  getList()
})
onPullDownRefresh(async () => {
  await refresh()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 500)
})
onReachBottom(() => {
  loadMore()
})

function requestFunc(params) {
  return httpRequest(GET_VCOURSE_LIST, "POST", { ...params, type: 0 }).then((res) => {
    res.data.result = res.data.result?.map((item) => {
      return {
        ...item,
        src: item.thumb,
        title: item.name,
        number: item.price
      }
    })
    return res
  })
}
function handleClick(item) {
  uni.navigateTo({
    url: "./detail?id=" + item.id
  })
}
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <uni-nav-bar
    title="系统课"
    :fixed="true"
    left-icon="back"
    :border="false"
    @clickLeft="navigateBack"
    @clickRight="navigateBack"
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
    displayMode="course"
  />
  <load-tips :loading="loading" />
</template>

<style scoped lang="scss">
.list-loading {
  text-align: center;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 33.6rpx;
  color: rgba(153, 153, 153, 1);
}
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
