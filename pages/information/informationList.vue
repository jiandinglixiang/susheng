<script setup>
import InformationItem from "@/components/information/InformationItem.vue"
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { GET_ARTICLE_LIST, POST_ARTICLE_TYPE } from "@/api/article"
import { usePageList } from "@/hooks/usePageList"
import LoadTips from "@/components/tips/load-tips.vue"
let targetType
const { list, getList, loading, loadMore, refresh } = usePageList({ requestFunc })

onLoad(async () => {
  const res = await httpRequest(POST_ARTICLE_TYPE, "POST")
  targetType = res.data.find((item) => item.id === 12)
  targetType && getList()
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

function requestFunc({ page, rows: pageSize }) {
  return httpRequest(
    GET_ARTICLE_LIST,
    "GET",
    {
      page,
      pageSize,
      typeid: targetType.typeid
    },
    {
      baseUrl: "https://apigateway.pxo.cn",
      header: {
        g: targetType.domain
      }
    }
  ).then((res) => {
    return { ...res, data: { result: res.data } }
  })
}

function navigateBack() {
  uni.navigateBack()
}
function gotoDetail(item) {
  uni.navigateTo({ url: "/pages/information/detail?id=" + item.id })
}
</script>

<template>
  <uni-nav-bar
    title="考试资讯"
    :fixed="true"
    left-icon="back"
    :border="false"
    right-width="164rpx"
    @clickLeft="navigateBack"
    @clickRight="navigateBack"
    class="nav-bar"
  >
    <template v-slot:right>
      <view class="right-btn">在线考友</view>
    </template>
  </uni-nav-bar>
  <view style="height: 16rpx" />
  <information-item v-for="item in list" :item-data="item" :key="item.id" @click="gotoDetail" />
  <load-tips :loading="loading" />
</template>

<style scoped lang="scss">
.nav-bar {
  :deep(.uni-nav-bar-text) {
    font-size: 36rpx;
    font-weight: 500;
  }
}
.right-btn {
  box-sizing: border-box;
  width: 164rpx;
  height: 56rpx;
  border-radius: 200rpx;
  border: 1rpx solid rgba(48, 93, 218, 1);
  font-size: 24rpx;
  font-weight: 500;
  line-height: 56rpx;
  color: rgba(48, 93, 218, 1);
  padding-left: 52rpx;
  background: url("/static/information/test-friend@2x.png") rgba(48, 93, 218, 0.08) no-repeat 16rpx
    center;
  background-size: 32rpx 32rpx;
}
</style>
