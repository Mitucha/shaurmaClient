import React, { useState } from "react";
import { BlockItem } from "../components/BlockItem"
import { BlankPage }  from "../components/BlankPage";
import { useEffect } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getBlock, quantityByCourse } from "../http/BlockAPI"
import { Context } from '../main';
import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Button } from "react-bootstrap";


const Block = observer(() => {
  const [maxLevel, setMaxLevel] = useState(0)

  const {block} = useContext(Context)
  useEffect(() =>{
    getBlock(localStorage.getItem('id_course')).then(data => block.setBlock(data.data))
    quantityByCourse(JSON.parse(localStorage.getItem('id_course'))).then(data => setMaxLevel(data.data))
  }, [])
  

  console.log("MaxLevel: ", maxLevel)
  localStorage.setItem('maxLevel', maxLevel)
    return(
      <div className='container mt-4' style={{}}>
        <NavLink to="/course" ><Button variant="light">Назад</Button></NavLink>
        {block.block.length == 0 ? <BlankPage /> : block.block.map((item, index) => <BlockItem maxLevel={maxLevel} key={index} index={index} info={item}/>)}
      </div>
    )
})

export {Block}