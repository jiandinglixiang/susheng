<template>
  {{ storeUserInfo.phone }}
</template>

<script setup>
import { userInfo } from "@/pinia/user"

const storeUserInfo = userInfo()
storeUserInfo.getUserInfo()
</script>

<style lang="scss" scoped></style>
