import { $authHost, $host } from "./index.js";

export const create = async (id_parent, item) => {
    const response = await $host.post('api/item/create', {id_parent, item})
    return response
}

export const getOne = async (id) => {
    const response = await $host.get('api/item/one?id=' + id)
    return response
}

export const updateTest = async (id, test) => {
    const response = await $host.post('api/item/update', {id, test})
    return response
}

export const addFile = async (formData) => {
    const response = await $host.post('api/item/addFile', formData)
    return response
}