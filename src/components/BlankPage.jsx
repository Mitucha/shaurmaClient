import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import blank from '../image/blank.png'

const BlankPage = () => {
    
    return (
        <Alert variant='primary'>
            <img src={blank} alt="blank" style={{display: "block", margin: "0 auto"}} />
            <h3 style={{textAlign: 'center'}}>Здесь пока ничего нет</h3>
            <p style={{textAlign: 'center'}}>Мы очень скоро добавим контент</p>
            
        </Alert>
    )
}

export {BlankPage};