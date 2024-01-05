import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../main";
import { getOne } from "../http/ItemAPI";
import { observer } from "mobx-react-lite";
import Button from 'react-bootstrap/Button';
import { Quiz } from "../components/AdminComponents/Quiz";

const Item = observer(() => {

    const id_parent = JSON.parse(localStorage.getItem('id_block'))

    const {item} = useContext(Context)

    useEffect(() => {
        getOne(id_parent).then(data => {
            if (data.data != null) {
                item.addItem(data.data.item)
                if (data.data.test != null) item.addTest(data.data.test)
            } else {
                item.addItem('Вы сюда еще ничего не добавляли')
            }})
    }, [])

    return(
        <div className="container">
            <NavLink to="/block" ><Button variant="light" style={{margin: "20px"}}>Назад</Button></NavLink>
            <div className="container" dangerouslySetInnerHTML={{__html: item.item}}>
                
            </div>

            <Quiz test={item.test}/>
        </div>
    )
})

export {Item}