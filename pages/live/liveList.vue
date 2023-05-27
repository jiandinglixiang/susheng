<script setup>
import PopupIndex from "@/components/popup/index.vue"
import LiveLineCardItem from "@/components/live/LiveLineCardItem.vue"
import { LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import SegmentedControl from "@/components/segmented-control/SegmentedControl.vue"
import { PopupStatus } from "@/pinia/popup"
import { USER_TOKEN_DATA } from "@/utils/consts"
import { computed, ref } from "vue"
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { findFormEnd } from "@/utils/func"
import { httpRequest } from "@/utils/http"
import { GET_LIVE_LIST } from "@/api"
import { usePageList } from "@/hooks/usePageList"
import LoadTips from "@/components/tips/load-tips.vue"

const noLogin = !uni.getStorageSync(USER_TOKEN_DATA)?.token

const controlList = ["全部", "近期直播", "直播回放"]
const currentTab = ref(0)
const listData = ref([])

const currentPageData = computed(() =>
  findFormEnd(listData.value, (i) => i.key === currentTab.value)
)
onLoad(() => {
  tabChange(0)
})

onPullDownRefresh(() => {
  currentPageData.value?.refresh().finally(() => {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 500)
  })
})

onReachBottom(() => {
  currentPageData.value?.loadMore()
})

function tabChange(tab) {
  let currentData = findFormEnd(listData.value, (i) => i.key === tab)
  if (!currentData) {
    currentData = usePageList({
      requestFunc({ page, rows }) {
        return httpRequest(GET_LIVE_LIST, "POST", {
          page,
          rows,
          enable: tab
        })
      }
    })
    currentData.key = tab
    listData.value.push(currentData)
    currentData.getList()
  } else {
    !currentData.list.length && currentData.refresh()
  }

  if (currentTab.value === tab) {
    console.log("相同selectIndex")
    return
  }
  currentTab.value = tab
  setTimeout(() => {
    uni.pageScrollTo({ scrollTop: 1, duration: 0 })
  }, 100)
}
</script>

<template>
  <popup-index
    v-if="noLogin"
    :ref="(r) => PopupStatus().setPopupRef(LOGIN_TIPS_POPUP, r)"
    :popup-key="LOGIN_TIPS_POPUP"
  />
  <segmented-control fixed :list="controlList" @change="tabChange" />
  <view v-for="page in listData" :key="page.key" v-show="currentTab === page.key">
    <live-line-card-item v-for="item in page.list" :item-data="item" :key="item.id" />
    <load-tips :loading="page.loading" />
  </view>
</template>

<style scoped lang="scss"></style>
