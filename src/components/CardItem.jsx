import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { REACT_APP_API_URL } from "../../env";
import style from "../styles/card.module.css";
import { deleteCourse, getCourse, updateCourse } from "../http/CourseAPI";
import { useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const CardItem = observer((props) => {
  const { id, title, description, img, id_role } = props.info;
  const index = props.index + 1;
  
  const isAdmin =
    JSON.parse(localStorage.getItem("id_role")) == 1 ? true : false;

  const { course } = useContext(Context);

  const deleteOneCourse = () => {
    deleteCourse(id).then((data) => console.log(data.data));
    course.deleteCourse(id);
  };

  // Стейт для открытия и закрытия формы==============================
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Стейт для данных формы============================================
  const [titleChange, setTitleChange] = useState(title)
  const [descriptionChange, setDescriptionChange] = useState(description)

  //Обновление в базе данных==========================================
  const submitChange = () => {
    updateCourse(id, titleChange, descriptionChange, id_role).then(data => console.log(data.data))
    getCourse(id_role).then(data => course.setCourse(data.data))
    handleClose()
  }

  // Проверяем уровень доступа пользователя к курсу===================
  const level = JSON.parse(localStorage.getItem('level'))
  //console.log(level, index)

  const handleClick = (e) => {
    if(level[0] < index) e.preventDefault()
  }


  return (
    <>
      <Card
        style={{
          width: "100%",
          margin: "5px",
          overflow: "hidden",
          height: "100%",
        }}
        className={style.container}
      >
        <Card.Img
          variant="top"
          src={REACT_APP_API_URL + "/" + img}
          className={style.previe}
        />
        <Card.Body className={style.bodyCard}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          {isAdmin == false ? (
            <NavLink to="/block" onClick={handleClick}>
              <Button
                variant="outline-primary"
                onClick={() => {
                  localStorage.setItem("id_course", JSON.stringify(id));
                }}
                disabled={level[0] < index ? true : false}
              >
                Перейти
              </Button>
            </NavLink>
          ) : (
            <>
              <NavLink to="/admin/blocks">
                <Button
                  variant="outline-primary"
                  style={{ margin: "5px" }}
                  onClick={() => {
                    localStorage.setItem("id_course", JSON.stringify(id));
                  }}
                >
                  Перейти
                </Button>
              </NavLink>
              <Button
                variant="outline-danger"
                style={{ margin: "5px" }}
                onClick={deleteOneCourse}
              >
                Удалить
              </Button>
              <Button
                variant="outline-info"
                style={{ margin: "5px" }}
                onClick={handleShow}
              >
                Изменить
              </Button>
            </>
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
    </>
  );
});

export { CardItem };
