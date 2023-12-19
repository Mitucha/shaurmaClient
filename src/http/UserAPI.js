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

export const update = async (id, name, email, password, id_role, access) => {
    const response = await $authHost.put('api/user/update', {id, name, email, password, id_role, access})
    return response
}

export const destroy = async (id) => {
    const response = await $authHost.delete(`api/user/delete?id=${id}`)
    return response
}