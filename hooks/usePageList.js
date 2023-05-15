import { onUnload } from "@dcloudio/uni-app"
import { onUnmounted, ref } from "vue"

export function usePageList({ pageSize = 20, requestFunc }) {
  const loading = ref("")
  const list = ref([])

  return {
    key: "",
    loading,
    list,
    getList() {
      return getList({ loading, list, requestFunc, pageSize })
    },
    loadMore() {
      if (loading.value !== "more") {
        return
      }
      return getList({ loading, list, requestFunc, pageSize })
    },
    refresh() {
      list.value = []
      loading.value = ""
      return getList({ loading, list, requestFunc, pageSize })
    }
  }
}
async function getList({ loading, list, requestFunc, pageSize }) {
  loading.value = "加载中..."
  try {
    const currentPage = list.value.length / pageSize + 1
    const res = await requestFunc({ currentPage, pageSize, loading, list })
    const { data } = res
    const nList = list.value.concat(data.list)
    list.value = nList
    const len = data.list.length
    if (!nList.length) {
      loading.value = "没有更多了"
    } else {
      loading.value = len && Number.isInteger(len / pageSize) ? "more" : "没有更多了"
    }
  } catch (err) {
    loading.value = loading.value === "加载中..." ? "没有更多了" : "加载错误"
    console.error(err)
    throw err
  }
}

export function useTimeCount(second) {
  const time = ref(second || 60)
  let endCallback
  let t
  const start = () => {
    if (time.value === 0) {
      endCallback?.()
      reset()
      return
    }
    t = setTimeout(() => {
      time.value--
      start()
    }, 1000)
  }
  const reset = () => {
    time.value = second
    clearTimeout(t)
  }
  onUnmounted(() => {
    clearTimeout(t)
  })
  onUnload(() => {
    clearTimeout(t)
  })
  return {
    time,
    start,
    reset,
    endCallback(func) {
      endCallback = func
    }
  }
}
