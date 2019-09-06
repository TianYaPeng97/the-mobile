<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- 文本输入框 -->
    <van-cell-group>
      <van-field
      v-model="user.mobile"
      placeholder="请输入手机号码"
      v-validate="'required|digits:11'"
      name="mobile"
      clearable
      left-icon="phone-o"
      :error-message="errors.first('mobile')"
      ></van-field>
      <van-field
      v-model="user.code"
      placeholder="请输入验证码"
      v-validate="'required|digits:6'"
      name="code"
       :error-message="errors.first('code')"
       left-icon="star-o"
      >
        <van-button slot="button" type="default" size="mini">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button 
      class="btn"
        @click="handleLogin" 
        :loading="loading"
        type="info"
        loading-text="加载中..."
        loading-type="spinner">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user.js";
import { mapMutations } from 'vuex'
export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      loading:false
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击按钮 处理登录
    async handleLogin() {
      this.loading = true
      try {
        const valid = await this.$validator.validate()
        if(!valid){
          this.loading = false
          return
        }

         const data = await login(this.user);
        //eslint-disable-next-line
        // console.log(data)

        // 存储登录状态 在仓库store中完成
        // 1.将数据保存在vuex中  可以共享  刷新会消失 所以还需要存在本地
        // this.$store.commit('setUser',data) 
        this.setUser(data) //简写
        // 2.将数据保存在本地存储中

        //操作的是文件，比较慢
        // 登录成功跳转到首页
        this.$toast.success('登录成功')
        this.$router.push('/')

       
      } catch (err) {
        //   console.log(err)
        this.$toast.fail('登录失败')
        this.loading = false
      }
    }
  },
  created(){
    // 配置VeeValidate的自定义验证信息
    const dict = {
      custom:{
        // 验证的文本框 name
        mobile:{
          // y验证文本框规则失败之后的提示信息
          required:'请输入手机号码',
          digits:'手机号码必须是11位的数字'
        },
        code:{
          required:'请输入验证码',
          digits:'验证码必须是6位数字'
        }
      }
    }

    this.$validator.localize('custom',dict)
  }
};
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>