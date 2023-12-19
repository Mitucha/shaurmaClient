import { $authHost } from "./index.js";

export const getBlock = async (id_parent) => {
    const response = await $authHost.get('api/block/allByRole' + '?id_parent=' + id_parent)
    return response
}