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
