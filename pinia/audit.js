import { defineStore } from "pinia"
import { httpRequest } from "@/utils/http"
import { GET_USER_CLIENT_VERSION, GET_USER_INFO, POST_UPDATE_LOGIN_USER_INFO } from "@/api"
import { getSystemInfoPromise } from "@/utils/func"

export const AppAuditStatus = defineStore("AppAuditStatus", {
  // 也可以这样定义
  state: () => ({
    auditStatus: 1, // 状态(1审核2发布)
    auditStatusBoolean: !import.meta.env.DEV
  }),
  actions: {
    async getAppAuditStatus() {
      const system = await getSystemInfoPromise()
      console.log(system)
      const res = await httpRequest(GET_USER_CLIENT_VERSION, "POST", {
        type: system.osName === "ios" ? 1 : 2
      })
      if (res?.data?.status) {
        this.auditStatus = res.data.status
        this.auditStatusBoolean = res.data.status === 1
      }
      return {
        auditStatus: this.auditStatus, // 状态(1审核2发布)
        auditStatusBoolean: this.auditStatusBoolean
      }
    }
  }
})
