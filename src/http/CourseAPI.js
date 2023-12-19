import { $authHost, $host } from "./index.js";

export const getCourse = async (id_role) => {
    const response = await $authHost.get('api/course/allByRole?id_role=' + id_role)
    return response
}

export const getAll = async () => {
    const response = await $authHost.get('api/course/all')
    return response
}

export const createCourse = async (formData) => {
    const response = await $authHost.post('api/course/create', formData)
    return response
    
}

