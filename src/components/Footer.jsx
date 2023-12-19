import React from "react";
import { Navbar } from "react-bootstrap";
import style from '../styles/footer.module.css'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        
            <Navbar bg="black" data-bs-theme="dark" className={style.footer}>
                <p className={style.footerP}>&copy; ШаурмаShop {year}</p>
            </Navbar>
        
    )
}

export {Footer}