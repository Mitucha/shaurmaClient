import React from "react";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";

const CookPage = () => {

    return (
        <div className="container">
            <NavAdmin />
            
            <MultiCourseAndBlockPage role="3"/>
        </div>
    )
}

export { CookPage }