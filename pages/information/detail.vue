<script setup>
import PopupIndex from "@/components/popup/PopupIndex.vue"
import { LOGIN_TIPS_POPUP } from "@/components/popup/popupKeyMap"
import { PopupStatus } from "@/pinia/popup"
import parseHtml from "@/static/js/html-parser"
import { USER_TOKEN_DATA } from "@/utils/consts"
import { onLoad, onUnload } from "@dcloudio/uni-app"
import { httpRequest } from "@/utils/http"
import { GET_ARTICLE_DETAIL, POST_ARTICLE_COLLECT, POST_ARTICLE_COLLECT_STATUS } from "@/api"
import { computed, ref } from "vue"
import dayjs from "dayjs"
import { NoticeStatus } from "@/pinia/notice"
import { openURL, setTitleNViewButtonStyle } from "@/utils/func"

const noLogin = ref(!uni.getStorageSync(USER_TOKEN_DATA)?.token)
const storePopup = PopupStatus()
const storeNotice = NoticeStatus()
const detail = ref({
  keywords: "",
  arcurl: "",
  topid: 6,
  channel: 1,
  description: "",
  title: "",
  body: "",
  typeurl: "",
  typeid: 269,
  litpic: "",
  aid: -1,
  typename: "",
  pubdate: -1
})
const collect = ref(0)
uni.setNavigationBarTitle({ title: "" })

onLoad(async ({ id, domain }) => {
  httpRequest(
    GET_ARTICLE_DETAIL.replace("{id}", id),
    "GET",
    {},
    {
      baseUrl: "https://apigateway.pxo.cn",
      header: {
        g: encodeURIComponent(domain)
      }
    }
  ).then((res) => {
    detail.value = res.data
  })
  if (noLogin.value) {
    return
  }
  const res = await httpRequest(POST_ARTICLE_COLLECT_STATUS, "POST", { aid: id })
  collect.value = res.data.collect
})

const content = computed(() => parseHtml(detail.value.body))
async function handleCollect() {
  if (noLogin.value) {
    gotoLogin()
    return
  }
  const { aid, title, pubdate, litpic: pic } = detail.value
  await httpRequest(POST_ARTICLE_COLLECT, "POST", { aid, title, pubdate, pic })
  collect.value = collect.value ? 0 : 1
}
function gotoLogin() {
  storePopup[LOGIN_TIPS_POPUP]?.open({
    title: "提示",
    tips: "收藏功能需要您登录后，我们才能为您保存相应的收藏内容",
    buttonText: "去登录",
    handleClick(action) {
      if (action === "btn") {
        uni.navigateTo({ url: "/pages/login/index" })
      }
    }
  })
}
function pubdate(pubdate) {
  return dayjs(pubdate * 1000).format("YYYY-MM-DD")
}
</script>

<template>
  <view>
    <view class="information-title">{{ detail.title }}</view>
    <view class="desc">
      <text class="dec-info">来源：互联网</text>
      <text class="dec-info">小编：CPA</text>
      <text class="dec-info">{{ pubdate(detail.pubdate) }}</text>
    </view>
    <view class="rich-text-box">
      <rich-text :nodes="content"></rich-text>
    </view>
    <view class="fixed-bottom">
      <view class="fixed-bottom-content">
        <view class="collect" :class="collect && 'collected'" @click="handleCollect">收藏</view>
        <view
          class="free-information"
          @click="openURL(storeNotice.miniApp.find((i) => i.id === 7))"
        >
          免费资料
        </view>
        <view class="btn" @click="openURL(storeNotice.onlineConsultation[0])">在线咨询</view>
      </view>
    </view>
    <popup-index
      v-if="noLogin"
      :ref="(r) => PopupStatus().setPopupRef(LOGIN_TIPS_POPUP, r)"
      :popup-key="LOGIN_TIPS_POPUP"
    />
  </view>
</template>
<style scoped lang="scss">
.rich-text-box {
  width: 686rpx;
  display: flex;
  margin: 0 32rpx 48rpx;
  * {
    max-width: 100%;
    max-height: 100%;
  }
}
.information-title {
  margin: 16rpx 32rpx 0;
  font-size: 40rpx;
  font-weight: 500;
  line-height: 64rpx;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 32rpx;
}
.desc {
  margin-bottom: 32rpx;
}
.dec-info {
  display: inline-block;
  margin-left: 32rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 24rpx;
  color: rgba(153, 153, 153, 1);
}
.fixed-bottom {
  height: 98rpx;
}

.fixed-bottom-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 32rpx;
  background: #ffffff;
  .collect,
  .free-information {
    flex: 0 0 100rpx;
    font-size: 20rpx;
    line-height: 20rpx;
    color: rgba(102, 102, 102, 1);
    padding-top: 52rpx;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 44rpx 44rpx;
  }
  .collect {
    background-image: url("/static/information/collect2@2x.png");

    &.collected {
      background-image: url("/static/information/collect1@2x.png");
    }
  }
  .free-information {
    background-image: url("/static/information/icon_kczx@2x.png");
  }
  .btn {
    margin-left: auto;
    flex: 0 0 auto;
    width: 360rpx;
    height: 88rpx;
    border-radius: 200rpx;
    background: linear-gradient(135deg, rgba(97, 139, 255, 1) 0%, rgba(48, 93, 217, 1) 100%);
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    line-height: 88rpx;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
