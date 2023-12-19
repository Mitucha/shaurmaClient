import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../image/logo.png'
import style from '../styles/header.module.css'
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../main';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { REGISTRATION_ROUTE } from '../utils/consts';

const Header = observer(() => {
  const {user} = useContext(Context)
  const exit = () => {
    user.setIsAuth(false);
    localStorage.setItem('isAuth', false)
  }

  return (
    <Navbar bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <img className={style.logoImg} src={logo} alt="logo" />
          <p className={style.logoContant}>Шаурма<span className={style.logoText}>Shop</span></p>
        </Navbar.Brand>
        {JSON.parse(localStorage.getItem('isAuth')) ? 
        <>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/course">Курсы</Nav.Link>
        <Nav.Link>Новости</Nav.Link>
        <Nav.Link>О нас</Nav.Link>
      </Nav>
      <Nav.Link as={Link} to={REGISTRATION_ROUTE} onClick={() => exit()}><Button variant="outline-warning">Выйти</Button></Nav.Link></>
    :
    ''}
        
      </Container>
    </Navbar>
  );
});

export { Header };
