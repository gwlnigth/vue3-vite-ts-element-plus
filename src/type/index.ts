
/**
 * LoginForm 接口约束
 */
export interface LoginForm {
    email: string;
    password: string
}

/**
 * 校验输入框规则接口约束
*  */
export interface Rules {
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: ({
        message: string;
        required: boolean;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
}


/**
 * 注册接口
 */
export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    password2: string;
    role: string;
}

// 注册校验接口
export interface RegisterRules {
    name: ({
        message: string;
        required: boolean;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
    email: {
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    }[];
    password: ({
        message: string;
        required: boolean;
        trigger: string
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    password2: ({
        message: string;
        required: boolean;
        trigger: string
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    } | {
        validator: (rule: Function, value: string, callback: any) => void;
        trigger: string;
    }

    )[];
}



