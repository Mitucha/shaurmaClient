import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from 'react-bootstrap/Alert';
import style from "../../styles/quiz.module.css";
import { updateLevel } from "../../http/UserAPI";

const QuizItem = ({ question, onClickVariant }) => { 
  return (
    <Modal.Body>
      <h6 key={question.title}>{question.title}</h6>
      <ul style={{ listStyleType: "none", margin: "0 auto" }}>
        {console.log(question.variant)}
        {question.variant.map((item, index) => (
          <li
            key={item}
            className={style.li}
            onClick={() => onClickVariant(index)}
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
  
  return (
    <Modal.Body>
      <h4>Вопросов: {length}</h4>
      <h4>Правильных ответов: {correct}</h4>

        {length - correct == 0 ? <Alert variant='success'>Вы молодец! Продолжайте в том же духе <Button onClick={() => levelUp()}>Подтвердить</Button></Alert> : <Alert  variant='danger'>Подучите и вернитесь позже</Alert>}
      
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

  function onClickVariant(index) {
    setStep(step + 1);
    if (index == question.correct) {
      setCorrect(correct + 1);
    }
  }

  // Считаем правильные ответы===============================================================
  const [correct, setCorrect] = useState(0);

  return (
    <div className="container" style={{ margin: "0 auto" }}>
      <Button variant="primary" onClick={handleShow} style={{ width: "100%" }}>
        Пройти тестирование
      </Button>

      <Modal show={show} onHide={handleClose} style={{ overflow: "hidden" }}>
        <Modal.Header closeButton style={{ overflow: "hidden" }}>
          <Modal.Title style={{ fontSize: "14px" }}>Тестирование</Modal.Title>
        </Modal.Header>
        {step != test.length ? (
          <QuizItem question={question} onClickVariant={onClickVariant} />
        ) : (
          <Result correct={correct} length={test.length} />
        )}
      </Modal>
    </div>
  );
};

export { Quiz };
