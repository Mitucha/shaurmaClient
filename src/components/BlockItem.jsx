import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BlockItem = (props) => {

    const {id, title, description} = props.info
    const role = ['Администратор', 'Кассир', 'Повар', 'Кассир-Универсал', 'Повар-Универсал', 'Франчайзер',]
    const who = role[JSON.parse(localStorage.getItem('id_role')) - 1]

    const handlerAdminPrimary = () => {
      localStorage.setItem('title_block', JSON.stringify(title))
      localStorage.setItem('id_block', JSON.stringify(id))
    }

    return(
        <div className='container mt-4' style={{}}>
        <Card>
      <Card.Header>
        {who != 'Администратор' ?
          role[JSON.parse(localStorage.getItem('id_role')) - 1] : role[JSON.parse(localStorage.getItem('valueRole')) - 1]
        }
        
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {who === 'Администратор' ? <NavLink to="/admin/item" ><Button variant="outline-primary" onClick={handlerAdminPrimary}>Перейти</Button></NavLink> : <Button variant="outline-primary">Перейти</Button>}
        
      </Card.Body>
    </Card>
    </div>
    )
}

export {BlockItem}