<template>
  <!--向外抛出popupKey操作-->
  <!--接收popupKey close-->
  <view class="container">
    <view class="title"><text>选择声音</text></view>
    <uni-section title="基础用法" padding="10px">
      <uni-data-checkbox
        mode="button"
        multiple
        :localdata="[
          {
            text: '足球',
            value: 0
          },
          {
            text: '篮球',
            value: 1
          },
          {
            text: '游泳',
            value: 2
          }
        ]"
      ></uni-data-checkbox>
    </uni-section>
    <view class="btn-group">
      <button size="mini" type="warn" @click="emits('action', 'close')">取消</button>
      <button size="mini" type="primary" @click="emits('action', 'save')">存草稿</button>
      <button size="mini" type="primary" @click="emits('action', 'publish')">发布</button>
    </view>
  </view>
</template>
<script setup>
const emits = defineEmits(["action"])
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 622rpx;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0rpx 8rpx 8rpx 0rpx #000000;
}
.title {
  line-height: 80rpx;
  text-align: center;
}
.btn-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 40rpx 0;
}
</style>
