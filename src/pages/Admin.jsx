import { useState, useContext, useEffect } from "react";
import { getAll } from "../http/CourseAPI";
import { Context } from "../main";
import Nav from 'react-bootstrap/Nav';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { UserPage } from "../components/AdminComponents/userPage/UserPage";
import { CreateNewCourse } from "../components/AdminComponents/CreateNewCourse";
import { MultiCourseAndBlockPage } from "../components/AdminComponents/MultiCourseAndBlockPage/MultiCourseAndBlockPage";
import { NavAdmin } from "../components/AdminComponents/NavAdmin";

const Admin = () => {
  const [key, setKey] = useState("users");

  const { course } = useContext(Context);

  useEffect(() => {
    getAll().then((data) => course.setCourse(data.data));
  }, []);
  return (
    <>
      <NavAdmin />
      <UserPage />

      {/*<Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3 container"
        style={{ margin: "0 auto" }}
      >
        <Tab eventKey="users" title="Пользователи" className="container">
          <UserPage />
        </Tab>
        <Tab eventKey="cas" title="Кассир" className="container">
          <MultiCourseAndBlockPage role="2" />
        </Tab>
        <Tab eventKey="pov" title="Повар" className="container">
          <MultiCourseAndBlockPage role="3" />
        </Tab>
        <Tab eventKey="cas-un" title="Кассир-Универсал" className="container">
          <MultiCourseAndBlockPage role="4" />
        </Tab>
        <Tab eventKey="pov-un" title="Повар-Универсал" className="container">
          <MultiCourseAndBlockPage role="5" />
        </Tab>
        <Tab eventKey="fr" title="Франчайзер" className="container">
          <MultiCourseAndBlockPage role="6" />
        </Tab>
        </Tabs>*/}
    </>
  );
};

export { Admin };
