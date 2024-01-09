import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../main";
import { getOne } from "../http/ItemAPI";
import { observer } from "mobx-react-lite";
import Button from 'react-bootstrap/Button';
import { Quiz } from "../components/AdminComponents/Quiz";
import { REACT_APP_API_URL } from "../../env";

const Item = observer(() => {

    const id_parent = JSON.parse(localStorage.getItem('id_block'))

    const {item} = useContext(Context)

    const [file, setFile] = React.useState(null)

    useEffect(() => {
        getOne(id_parent).then(data => {
            if (data.data != null) {
                item.addItem(data.data.item)
                setFile(data.data.files)
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

            <div className="container" style={{border: '1px solid black', borderRadius: '10px', margin: '15px', padding: '15px'}}>
                
                { file == null ? "Файл не был добавлен" :<Button href={`${REACT_APP_API_URL}${file}`}>Файл</Button> }
                
            </div>
            {item.test.length != 0 ? <Quiz test={item.test}/> : <div className="container" style={{border: '1px solid black', borderRadius: '10px', margin: '15px', padding: '15px'}}>Тест не был добавлен</div>}
            
        </div>
    )
})

export {Item}