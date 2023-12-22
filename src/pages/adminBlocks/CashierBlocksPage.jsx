import React, { useContext, useEffect } from "react";
import { Context } from "../../main";
import { getBlock } from "../../http/BlockAPI";
import { NavAdmin } from "../../components/AdminComponents/NavAdmin";
import { observer } from "mobx-react-lite";
import { BlankPage } from "../../components/BlankPage";
import { BlockItem } from "../../components/BlockItem";
import { CreateNewBlock } from "../../components/AdminComponents/MultiCourseAndBlockPage/CreateNewBlock";

const CashierBlocksPage = observer( () => {

    const { block } = useContext(Context)

    useEffect(() => {
        getBlock(localStorage.getItem('id_course')).then(data => block.setBlock(data.data))
    }, [])

    return (
        <div className="container">
            <NavAdmin />
            <h3 style={{marginTop: "20px"}}>Блоки</h3>
            <CreateNewBlock role={JSON.parse(localStorage.getItem('valueRole'))} course={JSON.parse(localStorage.getItem('id_course'))} />
            <div className='container mt-4' style={{}}>
        {block.block.length == 0 ? <BlankPage /> : block.block.map(item => <BlockItem key={item.id} info={item}/>)}
      </div>
        </div>
    )
})

export { CashierBlocksPage }