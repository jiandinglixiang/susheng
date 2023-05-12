<template>
  <view class="container" v-if="list.length">
    <view class="title-box" v-if="typeList === 'mylist'">
      <text>达人榜</text>
      <navigator url="/pages/peoplelist/index?type=hotlist" hover-class="none">
        <text>达人列表</text>
      </navigator>
    </view>
    <view class="title-box" v-else>
      <text>我的关注</text>
      <navigator url="/pages/peoplelist/index?type=mylist" hover-class="none">
        <text>关注列表</text>
      </navigator>
    </view>
    <scroll-view lower-threshold="0" scroll-x @touchmove.stop>
      <view class="scroll-inside-list">
        <view v-for="item in list" class="scroll-inside-item" :key="item.id">
          <image class="user-avatar" :src="item.headerImageUrl"></image>
          <text>{{ item.nickName }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { httpRequest } from "@/utils/http";
import { FOLLOW_THE_TALENT_LIST_QUERY, MY_CONCERN_QUERY } from "@/api/home";
const list = ref([]);

const props = defineProps({
  typeList: {
    type: String,
    default: "mylist",
  }, // mylist||hotlist
});
onMounted(() => {
  getList();
});
async function getList() {
  let res;
  if (props.typeList === "mylist") {
    res = await httpRequest(MY_CONCERN_QUERY, "POST");
  } else {
    res = await httpRequest(FOLLOW_THE_TALENT_LIST_QUERY, "GET");
  }
  list.value = res?.data || [];
}
</script>

<style lang="scss" scoped>
.container {
  background: #f8f9fd;
  padding: 18rpx 0;
}

.title-box {
  font-size: 24rpx;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 32rpx 24rpx 32rpx;
  color: rgba(0, 0, 0, 1);
}

.scroll-inside-list {
  flex: 1;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding-left: 32rpx;
}

.scroll-inside-item {
  flex: 0 0 104rpx;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: center;
  padding-right: 32rpx;

  image {
    width: 104rpx;
    height: 104rpx;
    margin-bottom: 4rpx;
    border-radius: 50%;
  }

  text {
    line-height: 34rpx;
    font-size: 24rpx;
    flex: 1;
    text-align: center;
    color: rgba(0, 0, 0, 1);
    max-width: 104rpx;
  }
}
</style>
