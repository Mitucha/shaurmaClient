import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { destroy, update } from "../../../http/UserAPI";
import { observer } from "mobx-react-lite";

const UserCard = observer((props) => {
  const { id, name, email, password, id_role, access, level } = props.info;
  const role = [
    "Администратор",
    "Кассир",
    "Повар",
    "Кассир-Универсал",
    "Повар-Универсал",
    "Франчайзер",
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [accessButton, setAccessButton] = useState(access);

  // useState для формы изменения пользователя
  const [nameUserForm, setNameUserForm] = useState(`${name}`)
  const [emailUserForm, setEmailUserForm] = useState(`${email}`)
  const [roleUserForm, setRoleUserForm] = useState(`${id_role}`)
  const [passUserForm, setPassUserForm] = useState(`${password}`)

  const updateUser = async () => {
    await update(id, name, email, password, id_role, !access);
    setAccessButton(!access);
  };

  const deleteUser = async () => {
    await destroy(id)
  }

  const updateFunc = async () => {
    await update(id, nameUserForm, emailUserForm, passUserForm, roleUserForm, access);
    handleClose()
  }
  return (
    <>
      <Card className="mb-3">
        <Card.Header as="h5">{role[id_role - 1]}</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{email}</Card.Text>
          {id_role != 1 ? <Card.Text>Курс: {JSON.parse(level)[0]} Блок: {JSON.parse(level)[1]}</Card.Text> : ''}
          <Button variant="outline-primary" onClick={handleShow}>
            Изменить
          </Button>
          <Button variant="outline-danger" onClick={deleteUser} style={{ marginLeft: "10px" }}>
            Удалить пользователя
          </Button>

          {accessButton ? (
            <Button variant="success" disabled style={{ float: "right" }}>
              Подтвержден
            </Button>
          ) : (
            <Button
              variant="warning"
              style={{ float: "right" }}
              onClick={updateUser}
            >
              Не подтвержден
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Имя
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => setNameUserForm(e.target.value)}
                    value={nameUserForm}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Email
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => setEmailUserForm(e.target.value)}
                    value={emailUserForm}
                />
            </InputGroup>
            <Form.Select aria-label="Default select example" value={roleUserForm} onChange={(e) => setRoleUserForm(e.target.value)}>
                <option>Роль</option>
                <option value="1">Администратор</option>
                <option value="2">Кассир</option>
                <option value="3">Повар</option>
                <option value="4">Кассир-Универсал</option>
                <option value="5">Повар-Универсал</option>
                <option value="6">Франчайзер</option>
            </Form.Select>
            <Form.Label htmlFor="inputPassword5">Пароль</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    value={passUserForm}
                    onChange={(e) => setPassUserForm(e.target.value)}
                />
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={updateFunc}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export {UserCard}

