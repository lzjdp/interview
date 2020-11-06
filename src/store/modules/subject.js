import { createSubject, updateSubject, removeSubject, getSubjectList, getSubject } from '@/api/subject'

export default {
    actions: {
        GetSubjects ({commit}, params) {
            return new Promise((resolve, reject) => {
                getSubjectList(params).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetSubject ({commit}, id) {
            return new Promise((resolve, reject) => {
                getSubject(id).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        CreateSubject ({commit}, params) {
            return new Promise((resolve, reject) => {
                createSubject(params).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateSubject ({commit}, params) {
            return new Promise((resolve, reject) => {
                updateSubject(params).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        RemoveSubject ({commit}, id) {
            return new Promise((resolve, reject) => {
                removeSubject(id).then(res => {
                    const data = res.data
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}