import React, { useContext } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {authRoutes, dontAuthRoutes } from "../routes";
import { COURSE_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const AppRouter = observer( () => {
  const {user} = useContext(Context)
  const isAuth = JSON.parse(localStorage.getItem('isAuth'))
  return (
    <>
    <Switch>
      {isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} component={Component} exact />
      )}
      {isAuth === false && dontAuthRoutes.map(({path, Component}) => 
        <Route key={path} path={path} component={Component} exact />
      )}
    </Switch>
    </>
  )
})

export { AppRouter }
