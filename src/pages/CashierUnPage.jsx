import React from "react";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";

const CashierUnPage = () => {

    return (
        <div className="container">
            <NavAdmin />
            <MultiCourseAndBlockPage role="4" />
        </div>
    )
}

export { CashierUnPage }