import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { REGISTRATION_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";


const Red = observer( () => {
    const user = useContext(Context)
    if (user.isAuth == false) return <Redirect to={REGISTRATION_ROUTE}/>
    return (
        <>
        </>
    )
})

export {Red}