import { defineStore } from "pinia"
import { httpRequest } from "@/utils/http"
import { GET_USER_INFO, POST_UPDATE_LOGIN_USER_INFO } from "@/api"

export const userInfo = defineStore("userInfo", {
  // 也可以这样定义
  state: () => ({
    allotName: "",
    allotStatus: -1,
    allotUserid: "",
    appid: -1,
    avatar: "",
    balance: -1,
    id: -1,
    integral: -1,
    originphone: "",
    phone: "",
    secretphone: "",
    signin: false
  }),
  actions: {
    async getUserInfo() {
      const res = await httpRequest(GET_USER_INFO, "POST")
      this.$patch(res.data)
      return res.data
    }
  },
  unistorage: true // 数据持久化
})
