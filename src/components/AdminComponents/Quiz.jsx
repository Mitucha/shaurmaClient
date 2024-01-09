import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';
import style from "../../styles/quiz.module.css";
import { updateLevel } from "../../http/UserAPI";

const QuizItem = ({ length, question, onClickVariant }) => { 
  const [indexx, setIndex] = useState(0)
  return (
    <Modal.Body>
      <span>{Math.ceil(indexx / length * 100)}%</span>
      <div style={{width: '100%', height: '10px', backgroundColor: '#b4b0b09f', marginBottom: '25px', borderRadius: '3px'}}>
        <div style={{width: `${indexx / length * 100}%`, height: '10px',borderRadius: '3px', background: 'linear-gradient(90deg, rgba(14,66,6,1) 0%, rgba(68,240,75,1) 45%, rgba(0,255,201,1) 100%)'}}></div>
      </div>
      <h6 key={question.title}>{question.title}</h6>
      <ul style={{ listStyleType: "none", margin: "0 auto" }}>
        {console.log(question.variant)}
        {question.variant.map((item, index) => (
          <li
            key={index}
            className={style.li}
            onClick={(e) => {
              if (index == question.correct) {
                e.target.style.background = 'green'
                e.target.style.color = 'white'
                setTimeout(() => {
                  e.target.style.background = 'rgba(0, 0, 0, 0)'
                  e.target.style.color = 'black'
                }, 500)
              }
              else {
                e.target.style.background = '#ae03038c'
                e.target.style.color = 'white'
                setTimeout(() => {
                  e.target.style.background = 'rgba(0, 0, 0, 0)'
                  e.target.style.color = 'black'
                }, 500)
              }
              setIndex(indexx + 1)
              onClickVariant(index)
            }
          }
          >
            {item}
          </li>
        ))}
      </ul>
    </Modal.Body>
  );
};

const Result = ({ correct, length }) => { 

  const levelUp = () => {
    if (length - correct == 0) {
      const oldLevel = JSON.parse(localStorage.getItem('level'))
      const id = JSON.parse(localStorage.getItem('id_user'))
      
      const newlevel = []

      //Если он прошел все блоки одного курса
      if(JSON.parse(localStorage.getItem('maxLevel')) - oldLevel[1] == 0 ) {
        newlevel.push(oldLevel[0] + 1)
        newlevel.push(1)
        updateLevel(id, JSON.stringify(newlevel))
        console.log(newlevel)
        localStorage.setItem('level', `[${newlevel}]`)
        return
      } else {
        newlevel.push(oldLevel[0])
        newlevel.push(oldLevel[1] + 1)
        updateLevel(id, JSON.stringify(newlevel))
        console.log(newlevel)
        localStorage.setItem('level', `[${newlevel}]`)
        return
      }
    }
  }

  const ref = React.useRef(null)
  
  return (
    <Modal.Body>
      
      <h1 style={{textAlign: 'center', margin: '20px'}}>{correct}/{length}</h1>

        {length - correct == 0 ? <Alert variant='success'>Вы молодец! Продолжайте в том же духе <Button ref={ref} onClick={() => {
          levelUp()
          ref.current.disabled = true
        }
        }>Подтвердить</Button></Alert> : <Alert  variant='danger'>Подучите и вернитесь позже</Alert>}
      
    </Modal.Body>
  );
};

const Quiz = ({test}) => {
  const [step, setStep] = useState(0);
  // Открытие и закрытие модального окна=====================================================
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //=========================================================================================
  const question = test[step];

  const onClickVariant = (index) => {
    setTimeout(() => {
      setStep(step + 1);
      if (index == question.correct) {
        setCorrect(correct + 1);
      }
    },700)
  }

  // Считаем правильные ответы===============================================================
  const [correct, setCorrect] = useState(0);
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('index_course')) < JSON.parse(localStorage.getItem('level'))[0] || JSON.parse(localStorage.getItem('index_block')) < JSON.parse(localStorage.getItem('level'))[1]) {
      ref.current.disabled = true
    }
  }, [])
  

  return (
    <div className="container" style={{ margin: "0 auto" }}>
      <Button variant="primary" ref={ref} onClick={() => {
        handleShow()
        console.log(JSON.parse(localStorage.getItem('level'))[0])
        if (JSON.parse(localStorage.getItem('index_course')) < JSON.parse(localStorage.getItem('level'))[0] || JSON.parse(localStorage.getItem('index_block')) < JSON.parse(localStorage.getItem('level'))[1]) {
          ref.current.disabled = true
        }
      }} style={{ width: "100%" }}>
        Пройти тестирование
      </Button>

      <Modal show={show} onHide={handleClose} style={{ overflow: "hidden" }}>
        <Modal.Header closeButton style={{ overflow: "hidden" }}>
          <Modal.Title style={{ fontSize: "14px" }}>Тестирование</Modal.Title>
        </Modal.Header>
        {step != test.length ? (
          <QuizItem length={test.length} question={question} onClickVariant={onClickVariant} />
        ) : (
          <Result correct={correct} length={test.length} />
        )}
      </Modal>
    </div>
  );
};

export { Quiz };
