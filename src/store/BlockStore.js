import {makeAutoObservable} from 'mobx';

export default class BlockStore {
    constructor() {
        this._block = []
        makeAutoObservable(this)
    }

    setBlock(block) {
        this._block = block.sort((x, y) => x.id - y.id)
    }

    setOneBlock(block) {
        //const {block} = obj
        this._block.push(block)
    }

    deleteBlock(id) {
        this._block = this._block.filter(x => x.id != id)
    }

    get block() {
        return this._block
    }

    
}