<script setup>
import { GET_ARTICLE_LIST, POST_VIDEO_LIST } from "@/api"
import CourseLineCardItem from "@/components/course/CourseLineCardItem.vue"
import InformationItem from "@/components/information/InformationItem.vue"
import SegmentedControl from "@/components/segmented-control/SegmentedControl.vue"
import LoadTips from "@/components/tips/load-tips.vue"
import { usePageList } from "@/hooks/usePageList"
import { findFormEnd } from "@/utils/func"
import { httpRequest } from "@/utils/http"
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app"
import { computed, markRaw, ref } from "vue"
import {NoticeStatus} from '@/pinia/notice'


const storeNotice = NoticeStatus()
const controlList = ["精选课程", "资讯"]
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

function requestFunc(tab, { page, rows: pageSize }) {
  if (tab) {
    return httpRequest(
      GET_ARTICLE_LIST,
      "GET",
      {
        page,
        pageSize,
        typeid: 269
      },
      {
        baseUrl: "https://apigateway.pxo.cn",
        header: {
          g: `m.gaodun.com`
        }
      }
    ).then((res) => {
      return { ...res, data: { result: res.data } }
    })
  }
  return httpRequest(POST_VIDEO_LIST, "POST").then((res) => {
    return {
      ...res,
      data: {
        result: res.data.map((item) => {
          return {
            ...item,
            src: item.file,
            title: item.title,
            number: item.star
          }
        })
      }
    }
  })
}
function tabChange(tab) {
  let currentData = findFormEnd(listData.value, (i) => i.key === tab)
  if (!currentData) {
    currentData = usePageList({
      requestFunc: requestFunc.bind(this, tab)
    })
    currentData.component = markRaw(tab ? InformationItem : CourseLineCardItem)
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
  <segmented-control fixed :list="controlList" @change="tabChange" />
  <view v-for="page in listData" :key="page.key" v-show="currentTab === page.key">
    <component
      v-for="item in page.list"
      :key="item.id"
      :is="page.component"
      :item-data="item"
    ></component>
    <load-tips :loading="page.loading" />
  </view>
</template>

<style scoped lang="scss"></style>
