import React, { useContext, useEffect } from "react";
import { Context } from "../../../main";
import { NavAdmin } from "../NavAdmin";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";

import { create, getOne } from "../../../http/ItemAPI";

const AdminItems = observer(() => {
  const editorRef = useRef(null);
  const { item } = useContext(Context);

  //Функция создания Items===================================================
  const log = () => {
    if (editorRef.current) {
      const item = JSON.stringify(editorRef.current.getContent())
      const id_parent = JSON.stringify(localStorage.getItem("id_block"));
      create(id_parent, item);
    }
  };
  //==========================================================================

  let itemServer

  // Обращение к серверу за данными Item и их сохранение в Store======================================
  useEffect(() => {
    getOne(JSON.parse(localStorage.getItem('id_block')))
        .then(data => {
            if (data.data != null) {
                item.addItem(data.data.item)
            } else {
                item.addItem('Вы сюда еще ничего не добавляли')
            }
        })
  }, [])
  //==========================================================================

  const itemString = item.item[0]
  console.log(itemString)

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

  return (
    <div className="container">
      <NavAdmin />
      <h2 style={{ textAlign: "center" }}>{who}</h2>
      <p style={{ textAlign: "center" }}>{title}</p>

      <Editor 
        //dangerouslySetInnerHTML={{__html: itemString}}
        initialValue={`<div dangerouslySetInnerHTML={{__html: ${itemString}}}></div>`}
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
    </div>
  );
});

const Referens = ({item}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: item}}></div>
    )
}

export { AdminItems };
