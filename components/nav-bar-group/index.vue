<template>
  <view>
    <uni-nav-bar :border="false" fixed statusBar>
      <template #default>
        <view class="nav-title">泰科熊</view>
      </template>
      <template #right>
        <view class="nav-right" @click="onClick('rightClick')">
          <uni-icons size="28" type="contact-filled"></uni-icons>
          <text class="name">家长</text>
        </view>
      </template>
    </uni-nav-bar>
    <view class="sub-nav-bar">
      <view class="sub-nav-bar-1">
        <view class="left-list">
          <view
            v-for="(tab, index) in tabList"
            :key="tab"
            :class="['item-text-btn', props.tabs[0] === index && 'item-active']"
            :style="index === 0 && 'margin-left: 8rpx'"
            @click="onClick('tabClick0', index)"
          >
            <text>{{ tab }}</text>
          </view>
        </view>
        <view
          v-show="props.tabs[0] !== 1"
          class="right-btn"
          plain
          type="primary"
          @click="onClick('openMore')"
        >
          <uni-icons size="20" type="bars"></uni-icons>
          <text>{{ types[props.tabs[1]] }}</text>
        </view>
      </view>
      <view v-show="showMore" class="more-box">
        <text class="more-title">类型</text>
        <view class="list-box">
          <text
            v-for="(name, index) in types"
            :key="name"
            :class="['item-type-btn', index === props.tabs[1] && 'item-active']"
            @click="onClick('tabClick1', index)"
          >
            {{ name }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, toRaw } from "vue"
import { useDebounceFn } from "@vueuse/core"
const props = defineProps({
  tabs: {
    type: Array,
    default() {
      return []
    }
  }
})
const emits = defineEmits(["typeChange"])

const tabList = ["社区", "关注", "收藏", "我的"]
const types = ["全部", "故事", "画画", "百科"]

const showMore = ref(false)

const onClick = (type, index) => {
  switch (type) {
    case "tabClick0":
      showMore.value = false
      emits("typeChange", [index, 0])
      break
    case "tabClick1":
      showMore.value = false
      emits("typeChange", [props.tabs[0], index])
      break
    case "rightClick":
      uni.navigateTo({ url: "/pages/user/index" })
      break
    default:
      showMore.value = !showMore.value
  }
}
</script>
<style lang="scss" scoped>
.nav-title {
  color: rgba(38, 39, 42, 1);
  flex: 1 1 auto;
  font-size: 36rpx;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 44px;
  text-align: center;
  vertical-align: top;
}

.nav-right {
  align-items: center;
  color: rgba(38, 39, 42, 1);
  display: flex;
  flex-flow: row nowrap;
  font-size: 28rpx;
}

.sub-nav-bar-1 {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  height: 96rpx;

  .left-list {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    flex-flow: row nowrap;
  }

  .item-text-btn {
    color: rgba(34, 40, 49, 1);
    font-size: 28rpx;
    letter-spacing: 0;
    padding: 0 24rpx;
    position: relative;
  }

  .item-active:after {
    background: url("/static/home/item-active.png") no-repeat center center;
    background-size: 100% 100%;
    bottom: -10px;
    content: "";
    height: 11rpx;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 32rpx;
  }

  .right-btn {
    align-items: center;
    background: #f0f3fc;
    border-radius: 32rpx;
    color: rgba(38, 39, 42, 1);
    display: flex;
    flex: 0 0 auto;
    flex-flow: row nowrap;
    font-size: 24rpx;
    height: 64rpx;
    justify-content: center;
    width: 180rpx;

    text {
      margin-left: 4rpx;
    }
  }
}

.more-box {
  background: #ffffff;
  border-radius: 0 0 16rpx 16rpx;
  box-shadow: 0 18rpx 16rpx -6rpx #9da3ad;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100rpx;
  padding-bottom: 20rpx;
  padding-top: 32rpx;

  .more-title {
    color: rgba(0, 0, 0, 1);
    font-size: 28rpx;
    font-weight: 500;
    height: 44rpx;
    line-height: 44rpx;
    margin-bottom: 20rpx;
    margin-left: 32rpx;
  }

  .list-box {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding-left: 3rpx;
  }

  .item-type-btn {
    background: #eff2f9;
    border-radius: 32rpx;
    color: rgba(33, 40, 49, 1);
    font-size: 24rpx;
    font-weight: 400;
    height: 64rpx;
    line-height: 64rpx;
    margin-bottom: 20rpx;
    margin-left: 13rpx;
    text-align: center;
    width: 212rpx;
  }

  .item-active {
    background: rgba(255, 127, 0, 0.1);
    color: #ff7f00;
  }
}
</style>
