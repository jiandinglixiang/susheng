<script setup>
import { setTitleNViewButtonStyle } from "@/utils/func"
import { nextTick, onMounted, onUnmounted } from "vue"
let stopRightButtonListener

onMounted(() => {
  stopRightButtonListener = setTitleNViewButtonStyle(
    { text: "\ue688", color: "#333333" },
    rightButton
  )
})
onUnmounted(() => {
  stopRightButtonListener?.()
})

let s = 0

function rightButton() {
  s++
  console.log(s)
  setTitleNViewButtonStyle({
    text: s % 2 ? "\ue688" : "\ue68f",
    color: s % 2 ? "#333333" : "#305DDA"
  })
}
</script>

<template></template>

<style scoped lang="scss">
.uni-page-head {
}
</style>
