<template>
  <el-form
    ref="HandleregisterForm"
    :rules="registerRules"
    label-width="120px"
    class="registerForm sign-up-form"
    :model="registerUser"
  >
    <el-form-item label="用户名" prop="name">
      <el-input placeholder="请输入你的用户名" v-model="registerUser.name" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input placeholder="请输入你的邮箱" v-model="registerUser.email" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="registerUser.password"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="registerUser.password2"
      />
    </el-form-item>
    <el-form-item label="选择身份">
      <el-select v-model="registerUser.role" placeholder="请选择身份">
        <el-option label="管理员" value="admin"> admin </el-option>
        <el-option label="用户" value="user"> user </el-option>
        <el-option label="游客" value="vistor"> vistor </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit_btn"
        @click="handleRegister('HandleregisterForm')"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { RegisterQuest } from "../../axios/index";
import {alterMessage} from '../../Hook/hook';
export default defineComponent({
  name: "RegisterForm",
  props: {
    registerRules: {
      type: Object,
      required: true,
    },
    registerUser: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { proxy }: any = getCurrentInstance();
    const handleRegister = (refForm: string) => {
      proxy.$refs[refForm].validate((valid: boolean) => {
        if (valid) {
          RegisterQuest(props.registerUser).then(
            (success: any) => {
              console.log(success.data);
              if (success.data.success) {
                  // 可能出现回调地狱
                    // setTimeout(() => {
                    //     alterMessage('Success', '用户注册成功,页面即将跳转', 'success')
                    //     setTimeout(() => {
                    //         location.reload()
                    //     }, 1000);
                    // }, 500);
                    
                    // 优化解决回调地狱
                    new Promise( (ok, error) => {
                            setTimeout(() => {
                                alterMessage('Success', '用户注册成功,页面即将跳转', 'success')
                            }, 500);
                        return ok('')
                    }).then( ok =>{
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
                    })
              } else {
                  alterMessage('Warning', `用户注册失败${success.data.error}`, 'Warning')
              }
            },
            (error: string) => {
                alterMessage('Warning', `请求失败+${error}`, 'Warning')
                
            }
          );
          
        } else {

          return false;
        }
      });
    };

    return {
      handleRegister,
    };
  },
});
</script>

<style>
</style>