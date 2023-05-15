<script setup>
import PopupIndex from "@/components/popup/index.vue"
import { AGREE_AUTH_POPUP } from "@/components/popup/popupKeyMap"
import { nextTick, ref, reactive } from "vue"
import { onLoad, onUnload } from "@dcloudio/uni-app"
import univerify from "./univerify.js"
import { config, httpRequest } from "@/utils/http"
import { POST_PHONE_AND_SMS_LOGIN, POST_PHONE_SMS } from "@/api/user"
import { USER_TOKEN_DATA } from "@/utils/consts"

const agreePopup = ref()
const showPage = ref(false)
// nextTick(() => {
//   agreePopup.value.open()
// })
onLoad(async () => {
  //#ifdef APP-PLUS
  await univerify(
    (e) => {
      console.log(e)
    },
    (e) => {
      console.log(e)
    }
  )
  //#endif
  showPage.value = true
})

const formRef = ref(null)
const statusData = reactive({
  loading: false,
  countDown: 30
})
const formData = reactive({
  phone: "",
  code: ""
})
const rules = {
  phone: {
    rules: [
      {
        required: true,
        errorMessage: "手机号不能为空"
      },
      {
        pattern: "^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$",
        errorMessage: "手机号格式错误"
      }
    ]
  },
  code: {
    rules: [
      {
        required: true,
        errorMessage: "验证码不能为空"
      },
      {
        minLength: 6,
        maxLength: 6,
        errorMessage: "验证码长度不对"
      }
    ]
  }
}

let time = null

onUnload(() => {
  clearTimeout(time)
})

function countDownFunc() {
  if (statusData.countDown) {
    statusData.countDown--
    time = setTimeout(countDownFunc, 1000)
  } else {
    statusData.countDown = 30
  }
}
function clearPhone() {
  Object.assign(formData, {
    phone: "",
    code: ""
  })
  formRef.value.clearValidate() // 移除表单的校验结果
}
function getSmsCode() {
  formRef.value.validateField(["phone"]).then(async () => {
    // 成功返回，res 为对应表单数据
    // 其他逻辑处理
    const res = await httpRequest(POST_PHONE_SMS, "POST", {
      phoneSecret: formData.phone,
      areacode: 86
    })
    console.log(res)
    // if (process.env.NODE_ENV === "development") {
    formData.code = res.data.tk
    // }
    countDownFunc()
  })
}

async function submitForm() {
  try {
    statusData.loading = true
    await formRef.value.validate()
    const res = await httpRequest(POST_PHONE_AND_SMS_LOGIN, "POST", {
      areacode: 86,
      phoneSecret: formData.phone,
      pcode: formData.code,
      tk: ""
    })
    config.header.token = res.data.token
    uni.setStorageSync(USER_TOKEN_DATA, res.data)
    uni.reLaunch({ url: "/pages/home/index" })
    console.log(res, "res")
  } catch (e) {
    uni.showToast({ title: e?.msg ?? "Error", icon: "none" })
  } finally {
    statusData.loading = false
  }
}
</script>
<template>
  <view v-if="showPage" class="container">
    <uni-forms
      ref="formRef"
      :modelValue="formData"
      :rules="rules"
      label-position="line"
      class="form-box"
    >
      <uni-forms-item label="手机号" name="phone" required>
        <uni-easyinput
          v-model="formData.phone"
          confirmType="next"
          focus
          inputBorder
          maxlength="11"
          placeholder="请输入手机号"
          trim="all"
          type="number"
          @clear="clearPhone"
        />
      </uni-forms-item>
      <uni-forms-item label="验证码" name="code" required>
        <view class="code-box">
          <uni-easyinput
            class="code-input"
            v-model="formData.code"
            confirmType="done"
            inputBorder
            minlength="6"
            maxlength="6"
            placeholder="验证码"
            trim="all"
            type="number"
            @confirm="submitForm"
          />
          <button
            :disabled="statusData.countDown !== 30"
            class="code-btn"
            size="mini"
            type="primary"
            @click="getSmsCode"
          >
            {{ statusData.countDown !== 30 ? statusData.countDown : "获取验证码" }}
          </button>
        </view>
      </uni-forms-item>
      <button :disabled="statusData.loading" form-type="submit" @click="submitForm"></button>
    </uni-forms>
    <view class="phone-item">
      <image src="/static/login/Icon_phone@2x.png"></image>
      <input class="uni-input" placeholder="带清除按钮的输入框" />
      <uni-icons class="icon" type="clear" size="16" color="#D8D8D8"></uni-icons>
    </view>

    <button class="submit-btn" hover-class="none">快速登录</button>
    <view class="auth-text">
      <uni-icons class="check-icon" type="checkbox-filled" size="16" color="#36C26E"></uni-icons>
      <text>
        我已阅读并同意
        <text class="highlight">《用户服务协议》</text>
        与
        <text class="highlight">《隐私政策》</text>
      </text>
    </view>
    <button class="btn-tourist" plain hover-class="none">游客模式</button>
  </view>
  <popup-index ref="agreePopup" :popup-key="AGREE_AUTH_POPUP"></popup-index>
</template>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 600rpx);
  background-image: url("/static/login/background_text@2x.png"),
    url("/static/login/material@2x.png"), url("/static/login/background@2x.png");
  background-position: 60rpx 364rpx, 404rpx 320rpx, left top;
  background-repeat: no-repeat;
  background-size: 352rpx 120rpx, 297rpx 210rpx, 100% auto;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 600rpx;
}

.auth-text {
  padding-top: 72rpx;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
  .check-icon {
    padding: 0 20rpx;
  }
  .highlight {
    color: #305dda;
  }
}

.phone-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 200rpx;
  border: 1rpx solid #cccccc;
  height: 100rpx;
  width: 630rpx;
  image {
    padding-left: 30rpx;
    flex: 0 0 40rpx;
    width: 40rpx;
    height: 48rpx;
  }
  .uni-input {
      height: 80rpx;
      line-height: 80rpx;
    flex: 1 1 auto;
    font-size: 28rpx;
    font-weight: 500;
    color: #999999;
    margin-left: 24rpx;
  }
  .icon {
    flex: 0 0 auto;
    margin-right: 30rpx;
  }
}

.submit-btn {
  width: 520rpx;
  height: 88rpx;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #618bff 0%, #305dd9 100%);
  font-size: 32rpx;
  font-weight: 700;
  line-height: 88rpx;
  color: #ffffff;
  text-align: center;
}

.form-box {
  width: 80vw;
}
.code-box {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.code-input {
  flex: 1 1 auto;
}
.code-btn {
  margin-left: 10px;
  flex: 0 0 auto;
  width: 100px;
}

.btn-tourist {
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  font-size: 28rpx;
  line-height: 36rpx;
  color: #333333;
}
</style>
