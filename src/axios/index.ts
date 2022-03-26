import requests from './request';

export const RegisterQuest = (registerUser: object)=> requests(
    {
        url:'/api/v1/auth/register',
        data: registerUser,
        method: 'post'
    })

export const LoginQuest = (LoginUser: object)=> requests(
    {
        url:'/api/v1/auth/login',
        data: LoginUser,
        method: 'post'
    })

export const EmailQuest = (Email: object)=> requests(
    {
        url:'/api/v1/auth/forgotpassword',
        data: Email,
        method: 'post'
    })

export const ResetpasswordQuest = (password: object, token: any)=> requests(
    {
        url:`/api/v1/auth/resetpassword/${token}`,
        data: password,
        method: 'put'
    })