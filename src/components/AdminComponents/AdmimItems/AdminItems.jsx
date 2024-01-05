import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { NavAdmin } from "../NavAdmin";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { observer } from "mobx-react-lite";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";

import { create, getOne } from "../../../http/ItemAPI";
import { CreateQuiz } from "../userPage/CreateQuiz";
import { CreateFile } from "./CreateFile";

const AdminItems = observer(() => {
  const editorRef = useRef(null);
  const { item } = useContext(Context);

  //Функция создания Items===================================================
  const log = () => {
    if (editorRef.current) {
      const item = editorRef.current.getContent();
      const id_parent = JSON.parse(localStorage.getItem("id_block"));
      create(id_parent, item);
    }
  };
  //==========================================================================
  const [quizSErver, setQuizServer] = useState(null)

  // Обращение к серверу за данными Item и их сохранение в Store==============
  useEffect(() => {
    getOne(JSON.parse(localStorage.getItem("id_block"))).then((data) => {
      if (data.data != null) {
        item.addItem(data.data.item);
        setQuizServer(data.data.test)
      } else {
        item.addItem("Вы сюда еще ничего не добавляли");
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
        onClick={log}
        variant="outline-primary"
        style={{ display: "block", margin: "20px auto" }}
      >
        Сохранить
      </Button>

      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Тестирование</Accordion.Header>
        <Accordion.Body>
          {!!quizSErver ? 
            'jnok'
            :
            <CreateQuiz quiz={quiz} setQuiz={setQuiz} />
          }
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Файлы к блоку</Accordion.Header>
        <Accordion.Body>
          <CreateFile />
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </div>
  );
});

export { AdminItems };
