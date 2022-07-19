<template>
  <div class="login">
    <div class="login__box">
      <h1 class="login__box_title">登录</h1>
      <ElForm
        :model="loginForm"
        :rules="loginRules"
        :show-message="true"
        status-icon
        class="login__box_form"
        ref="loginFormRef"
      >
        <ElFormItem prop="loginName">
          <ElInput
            v-model="loginForm.loginName"
            placeholder="用户名"
          >
            <template #prefix>
              <ElIcon>
                <User />
              </ElIcon>
            </template>
          </ElInput>
          <template #error="{ error }">
            <span class="error">{{ error }}</span>
          </template>
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            autocomplete="new-password"
            show-password
          >
            <template #prefix>
              <ElIcon>
                <Unlock />
              </ElIcon>
            </template>
          </ElInput>

          <template #error="{ error }">
            <span class="error">{{ error }}</span>
          </template>
        </ElFormItem>
      </ElForm>
      <div class="login__box_btns">
        <ElButton type="primary" round class="submit" @click="handleLogin">登录</ElButton>
        <p class="link">
          <ElButton type="primary" link>忘记密码？</ElButton>
          <ElButton type="primary" link>去注册</ElButton>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElForm, ElFormItem, ElInput, ElIcon } from 'element-plus'

import { useActions } from '@/use/useVuexMap'
import { useForm } from '@/use/useForm'

export default defineComponent({
  props: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElIcon
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { login } = useActions('user', ['login'])

    const { formRef: loginFormRef, formData: loginForm, formRules: loginRules, validate } = useForm(
      {
        loginName: '',
        password: ''
      },
      {
        loginName: [
          { required: true, message: '请输入用户名/手机号/邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    )

    // 登录
    const handleLogin = async () => {
      try {
        await validate()
        await login(loginForm.value)

        router.push({
          path: route.query.id as string || '/'
        })
      } catch (e) {}
    }

    return {
      loginFormRef,
      loginRules,
      loginForm,
      handleLogin
    }
  }
})
</script>

<style lang="stylus" scoped>
.login
  position relative
  width 100vw
  height 100vh
  &__box
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    display flex
    flex-direction column
    justify-content space-between
    box-sizing border-box
    width 400px
    height 300px
    padding 20px 30px
    border-radius 10px
    box-shadow 0 0 5px 0 rgba(0,0,0,.2)
    &_title
      text-align center
      font-size 20px
      font-weight bold
    &_form
      /deep/
        .el-input__wrapper
          height 30px
          padding 1px 20px
          border-radius 30px
          background #eee
          box-shadow none
        .error
          position absolute
          right 40px
          color #f56c6c
    &_btns
      .submit
        width 100%
        height 35px
      .link
        display flex
        justify-content space-between
        margin-top 10px
</style>
