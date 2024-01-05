import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login, registration } from "../http/UserAPI";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { ADMIN_ROUTE, COURSE_ROUTE } from "../utils/consts";
import { Header } from "../components/Header";

const Registration = observer(() => {
  const [regLog, setRegLog] = useState(true);

  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [id_role, setUserRole] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();

  const reg = async () => {
    if (regLog) {
      const response = await registration(name, email, password, id_role);
      const access = response.data.access;
      const data = response.data;
      if (typeof data === "object") {
        user.setUser(data);
        user.setIsAuth(true);
        user.setRole(data.id_role)
        
        if (access === true && data.id_role != 1) {
          history.push(COURSE_ROUTE);
        }
      } else {
        alert(response.data);
      }
    } else {
      const response = await login(email, password);
      if (typeof response.data === "object") {
        user.setUser(response.data);
        user.setIsAuth(response.data.access);
        user.setRole(response.data.id_role);
        localStorage.setItem('level', response.data.level)
        localStorage.setItem('id_user', response.data.id)
        if (response.data.access === true && response.data.id_role == 1){history.push(ADMIN_ROUTE)}
        if (response.data.access === true && response.data.id_role != 1) {
          history.push(COURSE_ROUTE);
        }
      } else {
        alert(response.data);
      }
    }
  };


  return (
    <>
    <div className="container mt-4">
      {regLog ? 
        <>
          <h3>Регистрация</h3>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Имя</label>
          </Form.Floating>
        </>
       : 
        <h3>Вход</h3>
      }

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Email</label>
      </Form.Floating>

      <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <label htmlFor="floatingPasswordCustom">Пароль</label>
      </Form.Floating>
      {regLog ? 
        <>
          <Form.Select
            className="mt-3"
            value={id_role}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option>Роль</option>
            <option value="1">Администратор</option>
            <option value="2">Кассир</option>
            <option value="3">Повар</option>
            <option value="4">Кассир-Универсал</option>
            <option value="5">Повар-Универсал</option>
            <option value="6">Франчайзер</option>
          </Form.Select>
        </>
       : 
        ""
      }

      {regLog ? 
        <>
          <Button
            variant="outline-success"
            className="w-100 mt-3"
            onClick={reg}
          >
            Зарегистрироваться
          </Button>
          
            <Button
              variant="outline-primary"
              className="w-100 mt-3"
              onClick={() => setRegLog(!regLog)}
            >
              Уже зарегистрированы? Жмите
            </Button>
          
        </>
       : 
        <>
          <Button
            variant="outline-success"
            className="w-100 mt-3"
            onClick={reg}
          >
            Войти
          </Button>
            <Button
              variant="outline-primary"
              className="w-100 mt-3"
              onClick={() => setRegLog(!regLog)}
            >
              Еще не зарегистрированы? Жмите
            </Button>
        </>
      }
    </div>
</>
  );
});

export { Registration };
