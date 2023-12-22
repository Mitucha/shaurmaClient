import React from "react";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";

const FranchisorPage = () => {

    return (
        <div className="container">
            <NavAdmin />
            <MultiCourseAndBlockPage role="6" />
        </div>
    )
}

export { FranchisorPage }