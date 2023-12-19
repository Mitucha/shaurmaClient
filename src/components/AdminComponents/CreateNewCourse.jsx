import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { createCourse } from "../../http/CourseAPI";
import { Context } from "../../main";

function CreateNewCourse(props) {
  const id_role = props.role
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const {course} = useContext(Context)

  const createCurse = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('file', file)
    formData.append('id_role', id_role)
    createCourse(formData).then(data => course.setOneCourse(data.data))
    
    handleClose()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Создание курса
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Создание курса</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
                <Form.Control placeholder="Название" style={{marginBottom: '10px'}} onChange={(e) => setTitle(e.target.value)} value={title}/>
                <Form.Control placeholder="Короткое описание" style={{marginBottom: '10px'}} onChange={(e) => setDescription(e.target.value)} value={description}/>
                <input type="file" style={{marginBottom: '10px'}} onChange={(e) => setFile(e.target.files[0])}/>
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

export { CreateNewCourse };
