<template>
  <uni-list ref="list" :virtual-list="true" :load-more="loadMore" :refresh="refresh" @load-more-status-change="loadMoreStatusChange">
    <uni-list-item v-for="(item, index) in listData" :key="item.id">{{ item.title }}</uni-list-item>
  </uni-list>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'MyList',
  props: {
    pageSize: {
      type: Number,
      default: 20
    },
    api: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // 初始化数据
    const listData = ref([])
    // 加载更多状态
    const loadMoreStatus = ref('loading')
    // 列表总数
    const total = ref(0)
    // 当前页码
    const currentPage = ref(1)
    // 下拉刷新
    const refresh = ref(true)

    // 加载更多数据
    const loadMore = () => {
      if (listData.value.length >= total.value) {
        // 数据已全部加载完毕
        loadMoreStatus.value = 'noMore'
        return
      }

      // 发起API请求
      props.api(currentPage.value + 1, props.pageSize).then(res => {
        // 将新数据添加到列表中
        listData.value = [...listData.value, ...res.data]
        // 更新总数
        total.value = res.total
        // 更新当前页码
        currentPage.value++
        // 更新加载更多状态
        loadMoreStatus.value = 'more'
      }).catch(() => {
        // 请求失败，更新加载更多状态
        loadMoreStatus.value = 'fail'
      })
    }

    // 刷新数据
    const refreshData = () => {
      // 发起API请求
      props.api(1, props.pageSize).then(res => {
        // 将新数据替换原有数据
        listData.value = res.data
        // 更新总数
        total.value = res.total
        // 更新当前页码
        currentPage.value = 1
        // 结束下拉刷新
        refresh.value = false
        // 更新加载更多状态
        loadMoreStatus.value = 'more'
      }).catch(() => {
        // 请求失败，结束下拉刷新
        refresh.value = false
      })
    }

    // 监听加载更多状态变化
    const loadMoreStatusChange = (status) => {
      loadMoreStatus.value = status
    }

    // 初始化数据
    refreshData()

    // 返回组件配置
    return {
      listData,
      loadMore,
      refresh,
      loadMoreStatus,
      loadMoreStatusChange
    }
  }
}
</script>
