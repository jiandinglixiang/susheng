<template>
  <web-view class="webView" :src="link" :webview-styles="webviewStyles" />
</template>

<script setup>
import { onBackPress, onLoad } from "@dcloudio/uni-app"
import { ref } from "vue"
const system = uni.getSystemInfoSync()
const webviewStyles = {
  height: `${system.windowHeight}px`,
  width: `${system.screenWidth}px`
}
const link = ref("")

onLoad((options) => {
  link.value = decodeURIComponent(options.link)

  if (options.title) {
    setTimeout(() => {
      uni.setNavigationBarTitle({
        title: options.title
      })
    }, 1000)
  }
})
onBackPress(() => {
  // eslint-disable-next-line no-undef
  if (getCurrentPages?.()?.length === 1) {
    // 当前页面是页面栈唯一页面
    uni.reLaunch({ url: "" })
    return true
  }
})
</script>
<style>
.webView {
  flex: 1;
}
</style>
