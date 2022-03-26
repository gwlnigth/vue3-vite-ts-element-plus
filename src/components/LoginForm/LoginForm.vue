<template>
  <!-- 登入 -->
  <el-form
    ref="registerForm"
    :rules="rules"
    label-width="120px"
    class="registerForm sign-in-form"
    :model="loginUser"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input placeholder="请输入你的邮箱" v-model="loginUser.email" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="loginUser.password"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit_btn"
        @click="submitForm('registerForm')"
        >提交</el-button
      >
    </el-form-item>
    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码? <a href="#" @click.prevent="handleForgot">立即找回</a></p>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import {LoginQuest} from '../../axios/index';
import {alterMessage} from '../../Hook/hook';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: "LoginForm",
  props: {
    rules: {
      required: true,
      type: Object,
    },
    loginUser: {
      type: Object,
      required: true,
    },
    submitForm: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    /**
     * 触发登入方法
     */
    //@ts-ignore // 忽略这个类型检测
    const { proxy }: any = getCurrentInstance(); // getCurrentInstance 相当于可以返回this实例
     
    const $router = useRouter()

    const submitForm = (refFomr: string) => {
     
      proxy.$refs[refFomr].validate((valid: boolean) => {
        if (valid) {
            LoginQuest(props.loginUser).then(
                (response: any) =>{
                    if(response.data.success){
                        alterMessage('用户登入', '用户登入成功', 'Success')
                        const token = response.data.token
                        localStorage.setItem('msToken', token)
                        $router.replace({name: 'Home'})
                    }else{
                        console.log(response);
                        alterMessage('用户登入', '用户登入超时', 'Warning')
                    }
                },
                (error:string) =>{
                    alterMessage('用户登入', '用户登入失败', 'Warning')
                    console.log(error);

                }
            )
          
        } else {

          return false;
        }
      });
    };

      const handleForgot = ()=>{
         $router.push('/forgotpassword')
      }

    return {
      submitForm,
      handleForgot
    };
  },
});
</script>


<style scoped>
.tiparea{
    float: right;
    font-size: 15px;
}
.submit_btn {
  width: 100%;
}
</style>