import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BlockItem = (props) => {
    const {title, description} = props.info
    const role = ['Администратор', 'Кассир', 'Повар', 'Кассир-Универсал', 'Повар-Универсал', 'Франчайзер',]
    return(
        <div className='container mt-4' style={{}}>
        <Card>
      <Card.Header>{role[JSON.parse(localStorage.getItem('id_role')) - 1]}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="outline-primary">Перейти</Button>
      </Card.Body>
    </Card>
    </div>
    )
}

export {BlockItem}