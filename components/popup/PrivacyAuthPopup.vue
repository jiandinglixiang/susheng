<template>
  <view class="container">
    <scroll-view scroll-y class="scroll-Y">
      <uni-section title="感谢您使用我们的APP！" padding="16px">
        <text>
          我们非常重视您的个人信息和隐私保护。为了更好的保障您的权益，在您使用我们的产品前，请务必审慎阅读《用户服务协议》和《隐私保护政策》内所有的条款。在您点击“同意”的行为即表示您已阅读完毕并同意以上协议及隐私保护政策的全部内容。如您同意以上协议及隐私保护政策的内容，请点击“同意”，开始使用我们的产品服务。1.我们会遵循隐私政策收集、使用信息，但不会仅因同意本隐私政策而采用强制捆绑的方式收集信息:2.在仅浏览时，为保障服务防止崩溃所必需，我们会收集设备信息与日志信息用于APP优化;3.我们会调用您的摄像头、相册权限方便您上传头像，这些权限均不会默认开启，只有经过传头像，这些权限均不会默认开启，只有经过
        </text>
      </uni-section>
    </scroll-view>
    <view class="btn-group">
      <button class="quit" @click="emits('action', 'close')">退出App</button>
      <button class="agree" @click="emits('action', 'agree')">同意</button>
    </view>
  </view>
</template>
<script setup>
const emits = defineEmits(["action"])
</script>


<style scoped lang="scss">
.container {
  width: 648rpx;
  border-radius: 32rpx;
  background: #ffffff;
  overflow: hidden;
}
.scroll-Y {
  height: 45vh;
  max-height: 50vh;
}
.btn-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 152rpx;
  button {
    width: 252rpx;
    height: 88rpx;
    border-radius: 200rpx;
    line-height: 88rpx;
    font-size: 32rpx;
  }
  .quit {
    color: #999999;
    background-color: #ffffff;
    border: 1rpx solid #979797;
  }
  .agree {
    color: #ffffff;
    font-weight: 700;
    border: none;
    background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
  }
}
</style>
