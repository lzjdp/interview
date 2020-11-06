import request from '../utils/request'

export function getSubjectList (params) {
    return request({
        url: '/api/client/v1/subject',
        params: params
    })
}

export function getSubject (id) {
    return request({
        url: `/api/client/v1/subject/${id}`
    })
}

export function createSubject (params) {
    return request({
        url: '/api/client/v1/subject',
        method: 'post',
        data: params
    })
}

export function updateSubject (params) {
    return request({
        url: '/api/client/v1/subjects',
        method: 'put',
        data: params
    })
}

export function removeSubject (params) {
    return request({
        url: '/api/client/v1/subjects',
        method: 'delete',
        data: params
    })
}