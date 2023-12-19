import { BlockItem } from "../components/BlockItem"
import { BlankPage }  from "../components/BlankPage";
import { useEffect } from "react"
import { getBlock } from "../http/BlockAPI"
import { Context } from '../main';
import { useContext } from "react"
import { observer } from "mobx-react-lite"


const Block = observer(() => {

  const {block} = useContext(Context)
  useEffect(() =>{
    getBlock(localStorage.getItem('id_course')).then(data => block.setBlock(data.data))
  }, [])

    return(
      <div className='container mt-4' style={{}}>
        {block.block.length == 0 ? <BlankPage /> : block.block.map(item => <BlockItem key={item.id} info={item}/>)}
      </div>
    )
})

export {Block}