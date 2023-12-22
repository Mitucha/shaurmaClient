import React from "react";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";

const CashierPage = () => {

    return (
        <div className="container">
            <NavAdmin />
            
            <MultiCourseAndBlockPage role="2"/>
        </div>
    )
}

export { CashierPage }