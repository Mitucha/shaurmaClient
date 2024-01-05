import { $authHost } from "./index.js";

export const getBlock = async (id_parent) => {
    const response = await $authHost.get('api/block/allByRole' + '?id_parent=' + id_parent)
    return response
}

export const createBlock = async (formData) => {
    const response = await $authHost.post('api/block/add', formData)
    return response
    
}

export const deleteBlock = async (id) => {
    const response = await $authHost.delete('api/block/delete?id=' + id)
    return response
}

export const quantityByCourse = async (id_parent) => {
    const response = await $authHost.get('api/block/quantityByCourse?id_parent=' + id_parent)
    return response
}