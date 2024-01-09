import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { deleteBlock, getBlock, updateBlock } from "../http/BlockAPI";
import { useContext } from "react";
import { Context } from "../main";

const BlockItem = (props) => {
  const index = props.index + 1;
  const maxLevel = props.maxLevel;

  const { block } = useContext(Context);

  const { id, id_parent, title, description } = props.info;
  const role = [
    "Администратор",
    "Кассир",
    "Повар",
    "Кассир-Универсал",
    "Повар-Универсал",
    "Франчайзер",
  ];
  const who = role[JSON.parse(localStorage.getItem("id_role")) - 1];

  const handlerAdminPrimary = () => {
    localStorage.setItem("title_block", JSON.stringify(title));
    localStorage.setItem("id_block", JSON.stringify(id));
  };
  const handlerPrimary = () => {
    if(level[0] < JSON.parse(localStorage.getItem('index_course')) && level[1] < index) {
      e.preventDefault()
      return
    }
    localStorage.setItem("id_block", JSON.stringify(id));
    localStorage.setItem("index_block", JSON.stringify(index));
  };

  const deleteOneBlock = () => {
    deleteBlock(id).then((data) => console.log(data.data));
    block.deleteBlock(id);
  };

  // Проверяем уровень доступа пользователя к курсу===================
  const level = JSON.parse(localStorage.getItem("level"));
  console.log(level, index);

  const handleClick = (e) => {
    if(level[1] < index) e.preventDefault()
  }

  //Стейт для данных формы============================================
  const [titleChange, setTitleChange] = React.useState(title)
  const [descriptionChange, setDescriptionChange] = React.useState(description)

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerAdminPrimaryUpdate = () => {
    handleShow()
  }

  const ref = React.useRef(null)



  //Обновление в базе данных==========================================
  const submitChange = () => {
    updateBlock(id, titleChange, descriptionChange, id_parent).then(data => console.log(data.data))
    getBlock(id_parent).then(data => block.setBlock(data.data))
    handleClose()
  }
  const COURSE = JSON.parse(localStorage.getItem('index_course'))
  const BLOCK = index
  return (
    <div className="container mt-4" style={{}}>
      <Card>
        <Card.Header>
          {who != "Администратор"
            ? role[JSON.parse(localStorage.getItem("id_role")) - 1]
            : role[JSON.parse(localStorage.getItem("valueRole")) - 1]}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          {who === "Администратор" ? (
            <>
              <NavLink to="/admin/item" >
                <Button variant="outline-primary" style={{margin: '10px'}} onClick={handlerAdminPrimary}>
                  Перейти
                </Button>
              </NavLink>
              <Button variant="outline-info" style={{margin: '10px'}} onClick={handlerAdminPrimaryUpdate}>
                  Изменить
                </Button>
              <Button
                variant="outline-danger"
                onClick={deleteOneBlock}
                style={{margin: '10px'}}
              >
                Удалить
              </Button>
            </>
          ) : (
            <NavLink to="/item" ref={ref} onClick={(e) => {
              if(level[0] < COURSE) {
                e.preventDefault()
              }
              else if(level[0] == COURSE && level[1] < BLOCK) {
                  e.preventDefault()
                }
              
            }}>
              <Button variant="outline-primary" onClick={handlerPrimary} >
                Перейти
              </Button>
            </NavLink>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Изменение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
                <Form.Control placeholder="Название курса" value={titleChange} onChange={e => setTitleChange(e.target.value)} style={{marginBottom: '5px'}} />
                <Form.Control placeholder="Описание" value={descriptionChange} onChange={e => setDescriptionChange(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={submitChange}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { BlockItem };
