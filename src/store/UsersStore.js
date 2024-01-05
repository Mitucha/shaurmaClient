import {makeAutoObservable} from 'mobx';

export default class UsersStore {
    constructor() {
        this._users = []
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users
    }
    
    get allUsers() {
        return this._users
    }
    usersByRole() {
        
    }
}