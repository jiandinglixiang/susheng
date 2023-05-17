<template>
  <view class="container">
      {{ storeUserInfo.phone }}
      <load-tips type="loadError"/>
      <popup-index ref="popup" :popup-key="LOGIN_TIPS_POPUP" />
  </view>
</template>

<script setup>
import { userInfo } from "@/pinia/user"
import LoadTips from '@/components/tips/load-tips.vue'
import PopupIndex from '@/components/popup/index.vue'
import {LOGIN_TIPS_POPUP} from '@/components/popup/popupKeyMap'
import {nextTick, ref} from 'vue'
const popup = ref()
const storeUserInfo = userInfo()
storeUserInfo.getUserInfo()
nextTick(()=>{
    popup.value.open({
        title:"提示",
        tips:`<text>asfasfasfas<text style="color:red">asfasfasfas</text><text>asfasfasfas</text></text>  `
    })
})
</script>

<style lang="scss" scoped>
.container{
  height: 200vh;
}
</style>
