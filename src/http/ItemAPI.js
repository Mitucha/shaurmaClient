import { $authHost, $host } from "./index.js";

export const create = async (id_parent, item) => {
    const response = await $host.post('api/item/create', {id_parent, item})
    return response
}

export const getOne = async (id) => {
    const response = await $host.get('api/item/one?id=' + id)
    return response
}