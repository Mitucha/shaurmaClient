import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';
import { UserCard } from "./UserCard";
import { useEffect } from "react";
import { all, allByRole } from "../../../http/UserAPI";
import { useContext, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { usersByRole } from "../../../http/UserAPI";

const UserPage = observer(() => {
  const { users } = useContext(Context);

  useEffect(() => {
    all().then((data) => users.setUsers(data.data));
  }, []);

  const filterUsers = (id_role) => (
    usersByRole(id_role).then((data) => users.setUsers(data.data))
  )
  
  return (
    <div className="container">
      <div className="container" style={{margin: "10px"}}>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Сортировать по
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => filterUsers(1)}>Администратор</Dropdown.Item>
            <Dropdown.Item onClick={() => filterUsers(2)}>Кассир</Dropdown.Item>
            <Dropdown.Item onClick={() => filterUsers(3)}>Повар</Dropdown.Item>
            <Dropdown.Item onClick={() => filterUsers(4)}>Кассир-Универсал</Dropdown.Item>
            <Dropdown.Item onClick={() => filterUsers(5)}>Повар-Универсал</Dropdown.Item>
            <Dropdown.Item onClick={() => filterUsers(6)}>Франчайзер</Dropdown.Item>
          </Dropdown.Menu>
          <Button style={{marginLeft: '10px'}} variant="outline-danger" onClick={() => all().then((data) => users.setUsers(data.data))}>X</Button>
        </Dropdown>

        

      </div>
      {users.allUsers.map((item) => (
        <UserCard key={item.id} info={item} />
      ))}
    </div>
  );
});

export { UserPage };
