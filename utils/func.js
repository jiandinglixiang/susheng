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
  let result = {}
  for (let key in obj1) {
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      result[key] = deepMergeObjects(obj1[key], obj2[key])
    } else {
      if (key in obj2) {
        result[key] = obj2[key]
      } else {
        result[key] = obj1[key]
      }
    }
  }
  for (let key in obj2) {
    if (!(key in obj1)) {
      result[key] = obj2[key]
    }
  }
  return result
}
