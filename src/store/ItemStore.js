import {makeAutoObservable} from 'mobx';

export default class ItemStore {
    constructor(){
        this._item = []
        this._test =[]
        makeAutoObservable(this)
    }

    addItem(item) {
        this._item = [item]
    }

    addTest(test) {
        this._test = JSON.parse(test)
    }

    get item() {
        return this._item
    }

    get test() {
        return this._test
    }
}