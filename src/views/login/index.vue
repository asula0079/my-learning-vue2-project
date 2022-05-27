<template>
  <div class="login">
    <!--
      1. :model="form"
      2. :rules="rules"
      3. ref="form"
    -->
    <el-form ref="form" :model="form" :rules="rules" class="login-form" label-position="top" label-width="80px">
      <!--
        1. prop 绑定rules中定义的属性
      -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- :loading="loading" 表单提交时，按钮禁用 -->
        <el-button :loading="loading" class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/service/user'

export default Vue.extend({
  name: 'loginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 定义校验规则
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号长度不正确',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不以能为空',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      try {
        // 等待校验结果
        await (this.$refs.form as Form).validate()
        // 提交请求
        const { data } = await login(this.form)

        if (data.state !== 1) {
          console.log(data)
          this.$message.error(data.message)
          this.loading = false
          return
        }
        // 保存登录状态
        this.$store.commit('setUser', data.content)
        // 跳转路由
        await this.$router.push(this.$route.query.redirect as string || '/')
        // 提示消息
        this.$message.success('登录成功')
        this.loading = false
      } catch (err) {
        this.$message.info('输入信息不正确')
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
