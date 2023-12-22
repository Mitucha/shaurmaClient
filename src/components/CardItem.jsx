import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { REACT_APP_API_URL } from "../../env";
import style from '../styles/card.module.css';

function CardItem(props) {
  const {id, title, description, img, id_role} = props.info
  const isAdmin = JSON.parse(localStorage.getItem('id_role')) == 1 ?  true :  false


  return (
    <Card style={{ width: "100%", margin: "5px", overflow: "hidden", height: "100%"}} className={style.container}>
      <Card.Img variant="top" src={REACT_APP_API_URL + '/' + img} className={style.previe}/>
      <Card.Body className={style.bodyCard}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {isAdmin == false ? 
        <NavLink to="/block"><Button variant="outline-primary" onClick={() => {localStorage.setItem('id_course', JSON.stringify(id))}}>Перейти</Button></NavLink>
        :
        <>
          <NavLink to="/admin/blocks"><Button variant="outline-primary" style={{marginRight: '5px'}} onClick={() => {localStorage.setItem('id_course', JSON.stringify(id))}}>Перейти</Button></NavLink>
          <Button variant="outline-danger">Удалить</Button>
        </>
        
        }
        
      </Card.Body>
    </Card>
  );
}

export { CardItem };
