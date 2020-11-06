import request from '../utils/request'

export function login (params) {
    return request({
        url: '/api/admin/user/login',
        method: 'post',
        data: params
    })
}

export function register (params) {
    return request({
        url: '/register',
        method: 'post',
        data: params
    })
}

export function getUserInfo () {
    return request({
        url: '/api/admin/user/info',
        method: 'get'
    })
}

export function logout () {
    return request({
        url: '/api/admin/user/logout',
        method: 'post'
    })
}

// export function addSubject (params) {
//     return request({
//         url: ''
//     })
// }