import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserStore from "./store/UserStore.js";
import CourseStore from "./store/CourseStore.js";
import {Header} from "./components/Header.jsx";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import { Red } from "./components/Red.jsx";
import BlockStore from "./store/BlockStore.js";
import { Footer } from "./components/Footer.jsx";
import UsersStore from "./store/UsersStore.js";
import ItemStore from "./store/ItemStore.js";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Context.Provider
    value={{
      // Для всех пользователей
      user: new UserStore(),
      course: new CourseStore(),
      block: new BlockStore(),
      item: new ItemStore(),

      // Для администратора
      users: new UsersStore(),
    }}
  >
      <Header />
      <App />
      <Red />
      <Footer />
  </Context.Provider>
  </BrowserRouter>
);
