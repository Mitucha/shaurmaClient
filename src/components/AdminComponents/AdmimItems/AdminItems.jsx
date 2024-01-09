import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { NavAdmin } from "../NavAdmin";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { observer } from "mobx-react-lite";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


import { addFile, create, getOne, updateItemString } from "../../../http/ItemAPI";
import { CreateQuiz } from "../userPage/CreateQuiz";
import { CreateFile } from "./CreateFile";

const AdminItems = observer(() => {
  const editorRef = useRef(null);
  const { item } = useContext(Context);

  //Функция создания Items===================================================
  const [disButton, setDisButton] = useState(false)
  const log = () => {
    setDisButton(true)
    if (item.item[0].length > 0) {
      const item = editorRef.current.getContent();
      const id = JSON.parse(localStorage.getItem("id_block"));
      updateItemString(id, item);
    }
    else {
      const item = editorRef.current.getContent();
      const id_parent = JSON.parse(localStorage.getItem("id_block"));
      create(id_parent, item);
    }
  };
  //==========================================================================
  const [quizServer, setQuizServer] = useState(null)
  const [fileServer, setFileServer] = useState(null)

  // Обращение к серверу за данными Item и их сохранение в Store==============
  useEffect(() => {
    getOne(JSON.parse(localStorage.getItem("id_block"))).then((data) => {
      if (data.data != null) {
        item.addItem(data.data.item);
        setQuizServer(JSON.parse(data.data.test))
        setFileServer(data.data.files)
      } else {
        item.addItem("");
      }
    });
  }, []);
  //==========================================================================

  const itemString = item.item[0];

  // Можно было хранить и в другом месте, но я не стал над этим думать========
  const role = [
    "Администратор",
    "Кассир",
    "Повар",
    "Кассир-Универсал",
    "Повар-Универсал",
    "Франчайзер",
  ];
  //==========================================================================
  const who = role[JSON.parse(localStorage.getItem("valueRole")) - 1];

  const title = JSON.parse(localStorage.getItem("title_block"));

  const [quiz, setQuiz] = useState([])

  const [file, setFile] = React.useState(null)

  const submitFile = () => {
    const formData = new FormData()
    formData.append('id', JSON.parse(localStorage.getItem('id_block')))
    formData.append('file', file)
    addFile(formData).then(data => console.log(data.data))
  }
  

  return (
    <div className="container">
      <NavAdmin />
      <h2 style={{ textAlign: "center" }}>{who}</h2>
      <p style={{ textAlign: "center" }}>{title}</p>

      <Editor
        initialValue={itemString}
        //dangerouslySetInnerHTML={{__html: itemString}}
        apiKey="avmacdkwzibu712l6l63ks511oc8we6a6v666drsla6fphlj"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 600,
          menubar: true,
          plugins: ["image", "code", "table", "link", "media", "codesample"],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <Button
        onClick={() => log()}
        variant="outline-primary"
        style={{ display: "block", margin: "20px auto" }}
        disabled={disButton}        
      >
        Сохранить
      </Button>

      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Тестирование</Accordion.Header>
        <Accordion.Body>
        {!!quizServer ? 
            quizServer.map((item, index) => 
              
                <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                  <Card.Header>{item.title}</Card.Header>
                  <ListGroup variant="flush">
                  <ListGroup.Item>{item.variant[0]}</ListGroup.Item>
                  <ListGroup.Item>{item.variant[1]}</ListGroup.Item>
                  <ListGroup.Item>{item.variant[2]}</ListGroup.Item>
                  <ListGroup.Item style={{backgroundColor: '#ADFF2F'}}>Верный ответ: {item.correct + 1}</ListGroup.Item>
                </ListGroup>
              </Card>
            )
            :
            <CreateQuiz quiz={quiz} setQuiz={setQuiz} />
            }
        </Accordion.Body>
      </Accordion.Item>

      {!!quizServer ?
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Заменить тесты</Accordion.Header>
          <Accordion.Body>
            <CreateQuiz quiz={quiz} setQuiz={setQuiz} />
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>
      : ''
    }

      <Accordion.Item eventKey="1">
        <Accordion.Header>Файлы к блоку</Accordion.Header>
        <Accordion.Body>
          {!!fileServer ? 
           <>"Файл загружен: " + {fileServer}
           <h5>Заменить имеющийся файл</h5>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button variant="outline-primary" onClick={submitFile}>Добавить</Button></>
        :
          <CreateFile />
        }
          
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </div>
  );
});

export { AdminItems };
