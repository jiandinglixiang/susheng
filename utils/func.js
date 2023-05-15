export function findFormEnd(arr, func) {
  let target
  for (let i = arr.length - 1; i >= 0; i--) {
    if (func(arr[i], i, arr)) {
      target = arr[i]
      break
    }
  }
  return target
}

export function deepMergeObjects(obj1, obj2) {
  const merged = { ...obj1 } // 创建一个新的对象，初始值为 obj1 的拷贝

  // 遍历 obj2 的属性
  for (let key in obj2) {
    // 检查 obj2 的属性是否为对象类型
    if (typeof obj2[key] === "object" && obj2[key] !== null) {
      // 如果 merged 中没有对应的属性，则直接将 obj2 的属性赋值给 merged
      if (!merged.hasOwnProperty(key)) {
        merged[key] = obj2[key]
      } else {
        // 递归调用 deepMerge 函数进行深度合并，并将结果赋值给 merged 的对应属性
        merged[key] = deepMergeObjects(merged[key], obj2[key])
      }
    } else {
      // 直接将 obj2 的属性赋值给 merged
      merged[key] = obj2[key]
    }
  }

  return merged
}

export function getSystemInfoPromise() {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success: resolve,
      fail: reject
    })
  })
}

export function funcToPromise(func, options = {}) {
  return new Promise((resolve, reject) =>
    func({
      success: resolve,
      fail: reject,
      ...options
    })
  )
}
