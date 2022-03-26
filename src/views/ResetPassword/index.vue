<template>
  <!-- 登入 -->
  <el-form
    label-width="120px"
    class="container"
    :rules="ResetPasswordUser"
  >
    <el-form-item label="邮箱" prop="password">
      <el-input placeholder="请输入你的新密码"
        type="password"
        v-model="ResetPasswordUser.password" />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit_btn"
        @click="handleForgotPassword()"
        >重置密码</el-button
      >
    </el-form-item>
    
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import {useRouter, useRoute} from 'vue-router';
import {ResetpasswordQuest} from '../../axios/index';
import {alterMessage} from '../../Hook/hook';
export default defineComponent({
  name: "LoginForm",

  setup() {
    /**
     * 触发登入方法
     */
    //@ts-ignore // 忽略这个类型检测
    const { proxy }: any = getCurrentInstance(); // getCurrentInstance 相当于可以返回this实例
    const $router = useRouter()
    const route = useRoute()
    const token = route.params.id
    const ResetPasswordUser = reactive({
        password: ''
    })

    const handleForgotPassword = ()=>{
        ResetpasswordQuest(ResetPasswordUser, token).then(
            response => {
                alterMessage('状态', '重置密码成功!', 'Success')
                console.log(response);
            },
            error => {
                alterMessage('状态', '重置密码失败!', 'Warning')
                console.log(error);
            }
        )
    }
    return {
        ResetPasswordUser,
        handleForgotPassword
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