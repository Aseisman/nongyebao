import { request } from './index'

export default {
    //专家登录
    expertLogin: (data) => {
        return request('/api/expert/login', 'post', data)
    },
    //专家忘记密码
    forget: (data) => {
        return request('/api/expert/forget/password', 'post', data)
    },
    //专家注册
    register: (data) => {
        return request('/api/expert/register', 'post', data)
    },
    //获取验证码
    verify: (data) => {
        return request('/api/email/verify', 'post', data)
    },
    //获取专家个人信息
    info: () => {
        return request('/api/expert/info', 'get', "")
    },
    //更新信息
    updateMessage: (data) => {
        return request('/api/expert/update/info', 'post', data)
    },
    //修改密码
    updatePassword: (data) => {
        return request('/api/expert/update/password', 'post', data)
    },


    //问题部分
    answer: (data) => {
        return request('/api/question/answer', 'post', data)
    },
    deleteQuestion: (data) => {
        return request('/api/question/deleteQuestion', 'delete', data)
    },
    getQuestionRecord: (data) => {
        return request('/api/question/getQuestionRecord', 'get', data)
    },
    getQuestionsInfo: (data) => {
        return request('/api/question/getQuestionsInfo', 'get', data)
    },
    newQuestion: (data) => {
        return request('/api/question/newQuestion', 'post', data)
    },
    updateStatus: (data) => {
        return request('/api/question/updateStatus', 'post', data)
    },
}