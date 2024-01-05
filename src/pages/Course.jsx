import { observer } from "mobx-react-lite";
import { CardItem } from "../components/CardItem";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { getCourse } from "../http/CourseAPI";
import { quantityByCourse } from "../http/BlockAPI";

const Course = observer(() => {
  
  const [levelCourses, setLevelCourses] = useState([])

  const { course } = useContext(Context);

  useEffect(() => {
    getCourse(localStorage.getItem("id_role"))
      .then((data) => course.setCourse(data.data))
      
  }, []);

  return (
    <>
      <h2 className="container" style={{ marginTop: "10px" }}>
        Курсы 
      </h2>
      <div
        className="container mt-4"
        style={{
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "10%",
          rowGap: "1%",
          alignItems: "center",
        }}
      >
        {course.course.map((item, index) => (
          <CardItem key={item.id} info={item} index={index} />
        ))}
      </div>
    </>
  );
});

export { Course };
