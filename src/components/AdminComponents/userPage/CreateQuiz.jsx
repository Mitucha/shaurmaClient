import React from "react";
import Button from "react-bootstrap/Button";
import { updateTest } from "../../../http/ItemAPI";

const CreateQuiz = ({ quiz, setQuiz }) => {
  const [quantity, setQuantity] = React.useState([{ title: "kjg" }]);
  const [dataCollection, setDataCollection] = React.useState(false);

  const [allQuiz, setAllQuiz] = React.useState([]);

  return (
    <div className="container">
      <h4>Создание теста</h4>

      <Button
        variant="outline-primary"
        onClick={() => {
          setQuantity([...quantity, { title: "eg" }]);
        }}
      >
        Добавить вопрос
      </Button>
      {quantity.map((item, index) => (
        <Quantity
          setAllQuiz={setAllQuiz}
          allQuiz={allQuiz}
          key={index}
          quiz={quiz}
          setQuiz={setQuiz}
          index={index}
          dataCollection={dataCollection}
          setDataCollection={setDataCollection}
        />
      ))}

      <Button
        variant="outline-primary"
        style={{ display: "block", margin: "20px auto" }}
        onClick={() => {
            
            const resultQuiz = allQuiz.filter((obj, index) => {
                return index === allQuiz.findIndex(o => obj.title === o.title && obj.variant[0] === o.variant[0] );
              });
            
            const id = JSON.parse(localStorage.getItem('id_block'))
            const test = JSON.stringify(resultQuiz)
            updateTest(id, test).then(data => console.log(data.data))
        }}
      >
        Опубликовать тест
      </Button>
    </div>
  );
};

export { CreateQuiz };
//============================================================================
const Quantity = ({
  index,
  allQuiz,
  setAllQuiz,
  quiz,
  setQuiz,
  dataCollection,
  setDataCollection,
}) => {
  const [title, setTitle] = React.useState("");
  const [correctVariant, setCorrectVariant] = React.useState(1);
  const [variantOne, setVariantOne] = React.useState("");
  const [variantTwo, setVariantTwo] = React.useState("");
  const [variantThree, setVariantThree] = React.useState("");

  const [quizItem, setQuizItem] = React.useState([]);
  React.useEffect(() => {
    if (quizItem.length != 0 /*&& allQuiz.indexOf(quizItem[0]) != -1*/) setAllQuiz([...allQuiz, quizItem[0]]);
    console.log(quizItem[0]);
    console.log(allQuiz);
  }, [quizItem]);

  // Считаем клики и блокируем кнопку

  const [clicked, setClick] = React.useState(0);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0)",
        marginTop: "15px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#F0F8FF",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={`Вопрос №${index + 1}`}
        style={{
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
          width: "50%",
        }}
      />
      <input
        type="text"
        value={variantOne}
        onChange={(e) => setVariantOne(e.target.value)}
        placeholder={`Ответ №${1}`}
        style={{
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
          width: "50%",
          marginLeft: "3em",
        }}
      />
      <input
        type="text"
        value={variantTwo}
        onChange={(e) => setVariantTwo(e.target.value)}
        placeholder={`Ответ №${2}`}
        style={{
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
          width: "50%",
          marginLeft: "3em",
        }}
      />
      <input
        type="text"
        value={variantThree}
        onChange={(e) => setVariantThree(e.target.value)}
        placeholder={`Ответ №${3}`}
        style={{
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
          width: "50%",
          marginLeft: "3em",
        }}
      />

      <div>
        <label htmlFor={`variant${index}`} style={{ marginRight: "10px" }}>
          Верный вариант
        </label>
        <input
          id={`variant${index}`}
          type="number"
          min={1}
          max={3}
          value={correctVariant}
          onChange={(e) => setCorrectVariant(Number(e.target.value))}
        ></input>
      </div>
      <Button
      variant="outline-success"
        onClick={(e) => {
          setQuizItem([
            {
              title: title,
              variant: [variantOne, variantTwo, variantThree],
              correct: correctVariant - 1,
            },
          ]);
          setClick(clicked + 1);
        }}
        disabled={clicked == 1 ? true : false}
        style={{marginTop: '10px'}}
      >
        Сохранить вопрос
      </Button>
    </div>
  );
};
