import { $authHost, $host } from "./index.js";

export const registration = async (name, email, password, id_role) => {
    const response = await $host.post('api/user/registration', {name, email, password, id_role})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password})
    return response
}

export const all = async () => {
    const response = await $authHost.get('api/user/all')
    return response
}

export const usersByRole = async (id_role) => {
    const response = await $authHost.get(`api/user/userByRole?id_role=${id_role}`)
    return response
}

export const allByRole = async (id) => {
    const response = await $host.get('api/user/allByRole?role=' + id)
    return response
}

export const update = async (id, name, email, password, id_role, access) => {
    const response = await $authHost.put('api/user/update', {id, name, email, password, id_role, access})
    return response
}

export const destroy = async (id) => {
    const response = await $authHost.delete(`api/user/delete?id=${id}`)
    return response
}

export const updateLevel = async (id, level) => {
    const response = await $authHost.post('api/user/updateLevel', {id, level})
    return response
}