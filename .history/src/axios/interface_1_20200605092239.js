import { request } from './index'

export default {
    //登录
    supManLogin: (data) => {
        return request("admin/login", "get", data)
    },
    //首页
    home: () => {
        return request("admin/index", "get", "")
    },
    //管理员列表
    adminList: (data) => {
        return request("admin/administrator", 'get', data)
    },
    //添加管理员
    adminAdd: (data) => {
        return request("admin/administrator", 'post', data)
    },
    //删除
    adminDel: (data) => {
        return request("admin/administrator", 'delete', data)
    },
    //设置/取消超级管理员
    adminSet: (data) => {
        return request("admin/administrator", 'put', data)
    },
    //修改密码
    password: (data) => {
        return request("admin/password", 'put', data)
    },
    //下载管理员excel
    adminExcel: () => {
        return request("admin/administrator/execl", 'get', "")
    },
    //获取用户列表
    userList: (data) => {
        return request("admin/user", 'get', data)
    },
    //设置为检察人员
    persecuter: (data) => {
        return request("admin/user/persecuter", 'put', data)
    },
    //锁定账号
    lock: (data) => {
        return request("admin/user/lock", 'put', data)
    },
    //下载微信用户列表
    userExcel: () => {
        return request("admin/user/execl", 'get', "")
    },
    //获取出入记录
    recordList: (data) => {
        return request("admin/health_record", 'get', data)
    },
    //获取出入记录excel
    recordExcel: () => {
        return request("admin/health_record/execl", 'get', "")
    }
}