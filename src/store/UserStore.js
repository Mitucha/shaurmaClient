import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._idRole = null
        this._user = {}
        makeAutoObservable(this)
    }

    setRole(id) {
        this._idRole = id
        
        localStorage.setItem('id_role', JSON.stringify(id))
    }

    setIsAuth(bool) {
        this._isAuth = bool
        localStorage.setItem('isAuth', JSON.stringify(bool))
    }
    setUser(user) {
        this._user = user
    }

    get Role() {
        return this._idRole
    }
    get isAuth() {
        return this._isAuth

    }
    get user() {
        return this._user
    }
}