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

export const updateCourse = async (id, title, description, id_role) => {
    const response = await $authHost.put('api/course/update', {id, title, description, id_role})
    return response
}

export const deleteCourse = async (id) => {
    const response = await $authHost.delete('api/course/delete?id=' + id)
    return response
}

