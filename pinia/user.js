import { defineStore } from "pinia"
import { httpRequest } from "@/utils/http"
import { GET_USER_INFO, POST_UPDATE_LOGIN_USER_INFO } from "@/api/user"

export const userInfoStates = defineStore("userInfoStates", {
  // 也可以这样定义
  state: () => ({
    age: 0,
    available: 0,
    balance: 0,
    birthday: "",
    createTime: "",
    email: "",
    freeze: 0,
    gender: 0,
    headerImageUrl: "",
    id: 0,
    nickName: "",
    openId: "",
    phone: "",
    realName: ""
  }),
  actions: {
    async getUserInfo() {
      const res = await httpRequest(GET_USER_INFO, "GET")
      this.$patch(res.data)
      return res.data
    },
    async updateUserInfo(data = {}) {
      const res = await httpRequest(POST_UPDATE_LOGIN_USER_INFO, "POST", data)
      this.$patch(data)
      return res.data
    }
  },
  unistorage: true // 数据持久化
})
