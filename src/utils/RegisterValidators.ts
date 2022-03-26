import { reactive} from "vue";
import {RegisterUser, RegisterRules} from '../type/index';


export const registerUser = reactive<RegisterUser>({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  /**
 * 校验表单
 * @param rule 
 * @param value 第二个输入框的验证码 
 * @param callback 
 */
  export const validatePass2 = (rule: Function, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('密码不能为空'))
    } else if (value !== registerUser.password) {
      callback(new Error("确认密码不一致"))
    } else {
      callback()
    }
  }

  /**
   * 注册表单校验
   */
 export const registerRules = reactive<RegisterRules>({
    name: [
        { 
            message: '用户名不能为空',
            required: true,
            trigger: 'blur' 
        },
        {
          min:2,
          max: 30,
          message: '长度在2-30字符',
          trigger: 'blur'
        }
        ],

    email: [
        {   
            type: 'email',
            message: '邮箱格式错误',
            required: true,
            trigger: 'blur'
        }
        ],
    password: [
        {
            message: '密码不能为空',
            required: true,
            trigger: 'blur'
        },
        {
            min: 6,
            max: 30,
            message:'密码长度不符合',
            trigger: 'blur'
        }
        ],

    password2: [
        {
            message: '确认密码不能为空',
            required: true,
            trigger: 'blur'
        },
        {
            min: 6,
            max: 30,
            message:'确认密码长度不符合',
            trigger: 'blur'
        },
        {
          validator: validatePass2,
          trigger: 'blur',
        }
        ],
  })