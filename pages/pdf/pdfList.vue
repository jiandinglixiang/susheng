<script setup>
import FixedFab from "@/components/fab/FixedFab.vue"
import NoticeBar from "@/components/notice-bar/NoticeBar.vue"
import { usePageList } from "@/hooks/usePageList"
import { NoticeStatus } from "@/pinia/notice"
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { POST_LIST_NOTICE, POST_LIST_OF_MATERIALS } from "@/api"
import LoadTips from "@/components/tips/load-tips.vue"
import { formatNumber, openURL } from "@/utils/func"
import { computed, ref } from "vue"

const storeNotice = NoticeStatus()
const { list, getList, loading, loadMore, refresh } = usePageList({ requestFunc })
const noticeData = ref([])
const noticeList = computed(() => {
  const pdf = list.value
  return noticeData.value.map(({ nickname }, index) => {
    return {
      title: `用户 ${nickname} 下载了 ${pdf[index]?.name || "CPA《考试必背概念》"}`
    }
  })
})

onLoad(() => {
  getList()
  httpRequest(POST_LIST_NOTICE, "POST").then((res) => {
    noticeData.value = res.data
  })
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

function requestFunc({ page, rows }) {
  return httpRequest(POST_LIST_OF_MATERIALS, "POST", { page, rows })
}
function star(star, num) {
  star = +star
  return star >= num ? "star-filled" : star === num - 0.5 ? "starhalf" : "star"
}
function iconUrl(url) {
  return `/static/pdf/${url.toUpperCase().slice(-3)}@2x.png`
}
function tagList(tag) {
  return tag?.split?.(",") ?? []
}
function navigateBack() {
  uni.navigateBack()
}
function handleDownload(item) {
  const link = `https://stark.pxo.cn/pdfjs-3.0.279-dist/web/viewer.html?file=${encodeURI(item.uploadResource)}`
  uni.navigateTo({
    url: `/pages/webview/index?noDecodeLinkQuery=1&title=${encodeURIComponent(item.name)}&link=${encodeURIComponent(link)}`
  })
}
</script>

<template>
  <uni-nav-bar title="资料列表" fixed statusBar left-icon="back" :border="false" @clickLeft="navigateBack"
    @clickRight="openURL(storeNotice.onlineConsultation[0])" class="nav-bar">
    <template v-slot:right>
      <image class="right-btn" src="/static/pdf/customer-service@2x.png" />
    </template>
  </uni-nav-bar>
  <view class="fixed-box">
    <notice-bar fixed :list="noticeList" />
  </view>
  <view class="pdf-list-item" v-for="item in list" :key="item.id">
    <view class="box-top">
      <image class="file-icon" :src="iconUrl(item.uploadResource)" />
      <view class="middle-box">
        <text class="file-name">{{ item.name }}</text>
        <text class="keyword" v-for="item2 in tagList(item.tag)">{{ item2 }}</text>
      </view>
      <view class="download" @click="handleDownload(item)">下载</view>
    </view>
    <view class="box-below">
      <view class="star">
        <uni-icons v-for="num in 5" class="staff" color="#FFC800" :type="star(item.star, num)" size="12"></uni-icons>
        <!--        <uni-icons class="staff" color="#FFC800" type="star-filled" size="12"></uni-icons>-->
        <!--        <uni-icons class="staff" color="#FFC800" type="starhalf" size="12"></uni-icons>-->
        <!--        <uni-icons class="staff" color="#FFC800" type="star" size="12"></uni-icons>-->
        <!--        <uni-icons class="staff" color="#FFC800" type="star" size="12"></uni-icons>-->
        <text class="staff">{{ item.star }}</text>
      </view>
      <text class="info">点击量:{{ formatNumber(item.receiveNum) }}</text>
      <text class="info">下载量:{{ formatNumber(item.viewsNum) }}</text>
      <text class="info">{{ item.updateDate }}</text>
    </view>
  </view>
  <load-tips :loading="loading" />
  <fixed-fab type="information" @handleClick="openURL(storeNotice.miniApp.find((i) => i.id === 4))" />
</template>

<style scoped lang="scss">
.fixed-box {
  height: 116rpx;
}

.pdf-list-item {
  margin: 0 32rpx 16rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 16rpx 0rpx rgba(0, 0, 0, 0.08);

  .box-top {
    margin: 0 16rpx;
    padding: 16rpx 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 2rpx solid rgba(238, 238, 238, 1);
  }

  .file-icon {
    flex: 0 0 auto;
    width: 84rpx;
    height: 84rpx;
    margin-right: 16rpx;
  }

  .middle-box {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
    margin-right: 16rpx;
  }

  .file-name {
    flex: 1 1 auto;
    width: 100%;
    margin-bottom: 12rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
  }

  .keyword {
    margin: 0 8rpx 8rpx 0;
    flex: 0 0 auto;
    border-radius: 8rpx;
    background: rgba(48, 93, 218, 0.1);
    padding: 6rpx 12rpx 6rpx 12rpx;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(48, 93, 218, 1);
  }

  .download {
    margin: 0;
    flex: 0 0 auto;
    width: 100rpx;
    height: 56rpx;
    text-align: center;
    border-radius: 446rpx 430rpx 446rpx 430rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    font-size: 24rpx;
    font-weight: 700;
    line-height: 56rpx;
    color: rgba(255, 255, 255, 1);
  }

  .box-below {
    padding: 16rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
  }

  .star {
    flex: 1 1 auto;
    align-self: flex-start;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(227, 178, 0, 1);

    .staff {
      margin-right: 4rpx;
    }
  }

  .info {
    flex: 0 0 auto;
    font-size: 20rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
    margin-left: 16rpx;
  }
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
