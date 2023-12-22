import React from "react";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";

const CookUnPage = () => {

    return (
        <div className="container">
            <NavAdmin />
            <MultiCourseAndBlockPage role="5" />
        </div>
    )
}

export { CookUnPage }