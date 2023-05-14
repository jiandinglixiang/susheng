<template>
  <view class="content">
    <view class="avatar-container">
      <view class="file-picker" @click="avatarClick">
        <uni-file-picker
          limit="1"
          :del-icon="false"
          disable-preview
          :imageStyles="imageStyles"
          file-mediatype="image"
          file-extname="png,jpg,jpeg"
          return-type="object"
          v-model="avatar"
          @select="select"
        >
          头像
        </uni-file-picker>
      </view>
    </view>
    <uni-list class="info-list">
      <uni-list-item :rightText="userInfoStore.age || '未知'" title="宝贝年龄" />
      <uni-list-item :rightText="userInfoStore.nickName" title="宝贝昵称" />
      <uni-list-item rightText="查看" title="图库" link="navigateTo" to="/pages/user/photos" />
      <uni-list-item
        rightText="查看详情"
        title="计费说明"
        link="navigateTo"
        to="/pages/user/billingSpecification"
      />
      <uni-list-item
        rightText="查看详情"
        title="账单"
        link="navigateTo"
        to="/pages/user/expenseBill"
      />

      <uni-list-item title="账户余额">
        <template v-slot:footer>
          <view class="account">
            <text class="balance">{{ userInfoStore.available }}金币</text>
            <text>点击充值</text>
          </view>
        </template>
      </uni-list-item>
      <uni-list-item
        rightText="查看详情"
        title="故事创作"
        link="navigateTo"
        to="/pages/user/storyList"
      />
    </uni-list>
    <button class="login-out" type="warn" @click="loginOut">退出</button>
  </view>
</template>

<script setup>
import { computed } from "vue"
import { config, httpRequest, uploadOSSFile } from "@/utils/http"
import { USER_TOKEN_DATA } from "@/utils/store"
import { GET_USER_LOGOUT } from "@/api/login"
import { onLoad } from "@dcloudio/uni-app"
import { userInfoStates } from "@/stores/user"
import { GET_OSS_POST_PARAMS } from "@/api/user"

const imageStyles = {
  width: 100,
  height: 100,
  border: {
    width: "0px",
    radius: "50%"
  }
}
const isLogin = Boolean(config.header?.token)
const userInfoStore = userInfoStates()
const avatar = computed(() => ({
  url: userInfoStore.headerImageUrl,
  extname: "avatar",
  name: "avatar"
}))
onLoad(() => {
  isLogin && userInfoStore.getUserInfo()
})

function avatarClick(e) {
  console.log("选择文件：", e, avatar)
}
async function select(e) {
  console.log(e)
  try {
    const { extname } = e.tempFiles[0]
    //  获取上传地址
    const { data } = await httpRequest(GET_OSS_POST_PARAMS, "GET", {
      uploadFileTypeMenu: "HEADER_IMAGE"
    })
    const key = `${data.dir}head.${extname}`
    await uploadOSSFile(data.host, {
      formData: {
        key,
        policy: data.policy,
        OSSAccessKeyId: data.accessKeyId,
        signature: data.signature,
        success_action_status: "200"
      },
      tempFilePaths: e.tempFilePaths
    })
    await userInfoStore.updateUserInfo({
      headerImageUrl: `${data.host}/${key}`
    })
    uni.showToast({ title: "更新头像成功" })
  } catch (e) {
    console.log(e)
    uni.showToast({ title: "Error" })
  }
}

function loginOut() {
  uni.showModal({
    title: "提示",
    content: "账号退出确认",
    async success({ confirm }) {
      if (confirm) {
        await httpRequest(GET_USER_LOGOUT, "GET")
        userInfoStore.$reset()
        config.header.token = ""
        uni.removeStorageSync(USER_TOKEN_DATA)
        uni.reLaunch({ url: "/pages/login/login" })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.avatar-container {
  align-items: center;
  background-color: #f8f8f8;
  display: flex;
  flex-flow: column nowrap;
  height: 50vw;
  justify-content: center;
  width: 100%;
  .file-picker {
    width: 100px;
    height: 100px;
    background-color: #ddd;
    border-radius: 50%;
    :deep(.uni-file-picker__container) {
      margin: 0;
    }
    :deep(.file-picker__box-content) {
      margin: 0;
    }
  }
}

.info-list {
  width: 100vw;
}

.account {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
}

.balance {
  color: #999;
  font-size: 12px;
  margin-right: 10px;
}
.login-out {
  margin-top: 40px;
  width: 300rpx;
}
</style>
