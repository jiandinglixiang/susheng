<template>
  <view class="main-list oBorder">
    <!-- 文本框 -->
    <input
        :focus="_focus"
        :maxlength="maxlength"
        :password="type==='password'&&!showPassword"
        :placeholder="placeholder"
        :type="_type"
        :value="value"
        class="main-input"

        @blur="$emit('blur', $event)"
        @click="$emit('click', $event)"
        @confirm="$emit('confirm', $event)"
        @focus="$emit('focus', $event)"
        @input="$emit('update:modelValue', $event.detail.value)"
        @longpress="$emit('longpress', $event)"
        @longtap="$emit('longtap', $event)"
        @touchcancel="$emit('touchcancel', $event)"
        @touchend="$emit('touchend', $event)"
        @touchmove="$emit('touchmove', $event)"
        @touchstart="$emit('touchstart', $event)"
    />
    <!-- 是否可见密码 -->
    <image
        v-if="_isShowPass&&type==='password'&&!_isShowCode"
        :class="showPassword?'cuIcon-attention':'cuIcon-attentionforbid'"
        class="img cuIcon"
        @tap="showPass"
    ></image>
    <!-- 倒计时 -->
    <view
        v-if="_isShowCode&&!_isShowPass"
        :class="['vercode',{'vercode-run': second>0}]"
        @click="setCode"
    >{{ getVerCodeSecond }}
    </view>

  </view>
</template>

<script setup>
import {defineEmits, defineProps, computed, onMounted, ref} from 'vue'

let countDown = false
const props = defineProps({
  type: String, //类型
  value: String, //值
  placeholder: String, //框内提示
  maxlength: {
    //最大长度
    type: [Number, String],
    default: 20
  },
  isShowPass: {
    //是否显示密码图标（二选一）
    type: [Boolean, String],
    default: false
  },
  isShowCode: {
    //是否显示获取验证码（二选一）
    type: [Boolean, String],
    default: false
  },
  codeText: {
    type: String,
    default: '获取验证码'
  },
  setTime: {
    //倒计时时间设置
    type: [Number, String],
    default: 60
  },
  focus: {
    //是否聚焦
    type: [Boolean, String],
    default: false
  }
})
const emit = defineEmits([
  'blur',
  'click',
  'confirm',
  'focus',
  'longpress',
  'longtap',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'modelValue'
])
const showPassword = ref(false) //是否显示明文
const second = ref(0) //倒计时
const isRunCode = ref(false) //是否开始倒计时


const _type = computed(() => {
  //处理值
  const type = props.type
  return type == 'password' ? 'text' : type
})
const _isShowPass = computed(() => {
  //处理值
  return String(props.isShowPass) !== 'false'
})
const _isShowCode = computed(() => {
  //处理值
  return String(props.isShowCode) !== 'false'
})
const _setTime = computed(() => {
  //处理值
  const setTime = Number(props.setTime)
  return setTime > 0 ? setTime : 60
})
const _focus = computed(() => {
  //处理值
  return String(props.focus) !== 'false'
})
const getVerCodeSecond = computed(() => {
  //验证码倒计时计算
  if (second.value <= 0) {
    return props.codeText
  } else {
    if (second.value < 10) {
      return '0' + second.value
    } else {
      return second.value
    }
  }

})


onMounted(() => {
  clearInterval(countDown)//先清理一次循环，避免缓存
})

function showPass() {
  //是否显示密码
  showPassword.value = !showPassword.value
}

function setCode() {
  //设置获取验证码的事件
  if (isRunCode.value) {
    //判断是否开始倒计时，避免重复点击
    return false
  }
  emit('setCode')
}

function runCode(val) {
  //开始倒计时
  if (String(val) == '0') {

    //判断是否需要终止循环
    second.value = 0 //初始倒计时
    clearInterval(countDown)//清理循环
    isRunCode.value = false //关闭循环状态
    return false
  }
  if (isRunCode.value) {
    //判断是否开始倒计时，避免重复点击
    return false
  }
  isRunCode.value = true
  second.value = _setTime.value //倒数秒数

  countDown = setInterval( ()=> {
    second.value--
    if (second.value === 0) {
      isRunCode.value = false
      clearInterval(countDown)
    }
  }, 1000)
}

</script>

<style>
@import url("./css/icon.css");

.main-list {
  align-items: center;
  color: #333333;
  display: flex;
  flex-direction: row;
  /* height: 36rpx; */ /* Input 高度 */
  justify-content: space-between;
  margin: 32rpx 0;
  padding: 40rpx 32rpx;
}

.img {
  font-size: 32rpx;
  height: 32rpx;
  width: 32rpx;
}

.main-input {
  flex: 1;
  font-size: 28rpx;
  margin-left: 20rpx;
  /* line-height: 100rpx; */
  padding-right: 10rpx;
  text-align: left;
}

.vercode {
  color: rgba(0, 0, 0, 0.7);
  font-size: 24rpx;
  /* line-height: 100rpx; */
}

.vercode-run {
  color: rgba(0, 0, 0, 0.4) !important;
}

.oBorder {
  border: none;
  border-radius: 2.5rem;
  -webkit-box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, .1);
  box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, .1);
}
</style>
