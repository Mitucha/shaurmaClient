import React from "react";
import { Button } from "react-bootstrap";
import { addFile } from "../../../http/ItemAPI";

const CreateFile = () => {

    const [file, setFile] = React.useState(null)

    const submitFile = () => {
        const formData = new FormData()
        formData.append('id', JSON.parse(localStorage.getItem('id_block')))
        formData.append('file', file)
        addFile(formData).then(data => console.log(data.data))
    }

    return (
        <div className="container">
            <h5>Добавить файл</h5>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button variant="outline-primary" onClick={submitFile}>Отправить</Button>

        </div>
    )
}

export { CreateFile }