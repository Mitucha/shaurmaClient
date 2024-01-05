import React, { useEffect, useContext } from "react";
import { Context } from "../../main";
import { getAll } from "../../http/CourseAPI";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Nav from 'react-bootstrap/Nav';

const NavAdmin = () => {

  const { course } = useContext(Context);

  useEffect(() => {
    getAll().then((data) => course.setCourse(data.data));
  }, []);

  return (
    <Nav
      variant="tabs"
      defaultActiveKey="/home"
      className="container"
      style={{ width: "100%" }}
    >
      <Nav.Item>
        <Nav.Link as={Link} to='/admin' eventKey="link-0">Пользователи</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/admin/cashier' onClick={() => {localStorage.setItem('valueRole', JSON.stringify(2))}} eventKey="link-1">Кассир</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/admin/cook' onClick={() => {localStorage.setItem('valueRole', JSON.stringify(3))}} eventKey="link-2">Повар</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/admin/universal_cashier' onClick={() => {localStorage.setItem('valueRole', JSON.stringify(4))}} eventKey="link-3">Кассир-Универсал</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/admin/universal_cook' onClick={() => {localStorage.setItem('valueRole', JSON.stringify(5))}} eventKey="link-4">Повар-Универсал</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/admin/franchisor' onClick={() => {localStorage.setItem('valueRole', JSON.stringify(6))}} eventKey="link-5">Франчайзер</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export { NavAdmin };
