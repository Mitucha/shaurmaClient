import {makeAutoObservable} from 'mobx';

export default class ItemStore {
    constructor(){
        this._item = []
        makeAutoObservable(this)
    }

    addItem(item) {
        this._item = [item]
    }

    get item() {
        return this._item
    }
}