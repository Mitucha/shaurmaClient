import {makeAutoObservable} from 'mobx';

export default class CourseStore {
    constructor() {
        this._course = []
        makeAutoObservable(this)
    }

    setCourse(course) {
        
        this._course = course.sort((x, y) => x.id - y.id)
        
    }

    setOneCourse(obj) {
        const {course} = obj
        this._course.push(course)
    }

    get course() {
        return this._course
    }

    getCourseByRole(id) {
        return this._course.filter(x => x.id_role == id)
        
    }
}