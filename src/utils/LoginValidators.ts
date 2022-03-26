import { reactive} from "vue";
import {LoginForm, Rules} from '../type/index';
/**
 * LoginForm 接口约束
 */
export const loginUser = reactive<LoginForm>({
    email: '',
    password: '',
})

/**
 * 校验输入框规则
*  */ 
export  const rules = reactive<Rules>({
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
})


