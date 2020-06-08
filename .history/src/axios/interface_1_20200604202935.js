import { request } from './index'

export default {
    //登录
    supManLogin: (data) => {
        return request("admin/login", "get", data)
    }
}