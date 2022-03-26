<template>
  <!-- 登入 -->
  <el-form
    label-width="120px"
    class="container"
    :rules="ForgotPasswordUser"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input placeholder="请输入你的邮箱"
        type="email"
        v-model="ForgotPasswordUser.email" />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit_btn"
        @click="handleForgotPassword()"
        >找回密码</el-button
      >
    </el-form-item>
    
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import {useRouter} from 'vue-router';
import {EmailQuest} from '../../axios/index';
import { alterMessage } from "../../Hook/hook";

export default defineComponent({
  name: "LoginForm",

  setup() {
    /**
     * 触发登入方法
     */
    //@ts-ignore // 忽略这个类型检测
    const { proxy }: any = getCurrentInstance(); // getCurrentInstance 相当于可以返回this实例
    const $router = useRouter()
    const ForgotPasswordUser = reactive({
        email: ''
    })
    const handleForgotPassword = ()=>{
        if(ForgotPasswordUser.email){
            EmailQuest(ForgotPasswordUser).then(
                (response: any) =>{
                    if(response.data.success){
                        alterMessage('状态', '邮件发送成功, 请在邮箱中继续重置密码!', 'Success')
                    }
                },
                (error: string) =>{
                    alterMessage('状态', '邮件发送失败!', 'Warning')
                    console.log(error);
                }
             )
        }else{
            console.log('邮箱不能为空');
        }
    }

    return {
        handleForgotPassword,
        ForgotPasswordUser
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

.container{
    width: 50%;
    margin: 200px auto;
}
</style>