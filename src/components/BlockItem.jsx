import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { deleteBlock } from "../http/BlockAPI";
import { useContext } from "react";
import { Context } from "../main";

const BlockItem = (props) => {
  const index = props.index + 1;
  const maxLevel = props.maxLevel;

  const { block } = useContext(Context);

  const { id, title, description } = props.info;
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
    if(level[1] < index) {
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
              <NavLink to="/admin/item">
                <Button variant="outline-primary" onClick={handlerAdminPrimary}>
                  Перейти
                </Button>
              </NavLink>
              <Button
                variant="outline-danger"
                onClick={deleteOneBlock}
                style={{ marginLeft: "10px" }}
              >
                Удалить
              </Button>
            </>
          ) : (
            <NavLink to="/item" onClick={(e) => {
              if(level[1] < index) e.preventDefault()
              else {localStorage.setItem('maxLevel', maxLevel)}
            }}>
              <Button variant="outline-primary" onClick={handlerPrimary} disabled={level[1] < index ? true : false}>
                Перейти
              </Button>
            </NavLink>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export { BlockItem };
