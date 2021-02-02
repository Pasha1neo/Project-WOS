import * as axios from 'axios'
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'afa394b4-445c-4924-8618-6b34968b9123',
    },
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data)
    },
    follow(id) {
        return instance
            .post(`follow/${id}`)
            .then((response) => (response.data.resultCode === 0 ? true : false))
    },
    unFollow(id) {
        return instance
            .delete(`follow/${id}`)
            .then((response) => (response.data.resultCode === 0 ? true : false))
    },
}
export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then((response) => response.data)
    },

    getStatus(id) {
        if (id === '') {
            return instance.get(`profile/status/2`).then((response) => response.data)
        }
        return instance.get(`profile/status/${id}`).then((response) => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`).then((response) => response.data)
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    },
}
