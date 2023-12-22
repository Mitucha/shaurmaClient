import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { Context } from "../../../main";
import { createBlock } from "../../../http/BlockAPI";

function CreateNewBlock(props) {
  const id_role = props.role
  const id_course = props.course
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const {block} = useContext(Context)

  const createCurse = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('id_parent', id_course)
    createBlock(formData).then(data => block.setOneBlock(data.data))
    //const id_parent = id_course
    //createBlock(title, description, id_parent).then(data => console.log(data.data))
    
    handleClose()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{margin: "10px"}}>
        Создание блока
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Создание блока</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
                <Form.Control placeholder="Название" style={{marginBottom: '10px'}} onChange={(e) => setTitle(e.target.value)} value={title}/>
                <Form.Control placeholder="Короткое описание" style={{marginBottom: '10px'}} onChange={(e) => setDescription(e.target.value)} value={description}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createCurse}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { CreateNewBlock };