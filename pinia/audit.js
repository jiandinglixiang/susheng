import { defineStore } from "pinia"
import { httpRequest } from "@/utils/http"
import { GET_USER_CLIENT_VERSION, GET_USER_INFO, POST_UPDATE_LOGIN_USER_INFO } from "@/api/user"
import { getSystemInfoPromise } from "@/utils/func"

export const AppAuditStatus = defineStore("AppAuditStatus", {
  // 也可以这样定义
  state: () => ({
    auditStatus: 1 // 状态(1审核2发布)
  }),
  actions: {
    async getAppAuditStatus() {
      const sys = await getSystemInfoPromise()
      console.log(sys)
      const res = await httpRequest(GET_USER_CLIENT_VERSION, "POST", {
        type: sys.osName === "ios" ? 1 : 2
      })
      if (res?.data?.status) {
        this.auditStatus = res.data.status
      }
      return this.auditStatus
    }
  }
})
