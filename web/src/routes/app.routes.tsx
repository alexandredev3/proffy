import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from './index'

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Landing} isPrivate />
      <Route path="/study" component={TeacherList} isPrivate />
      <Route path="/give-classes" component={TeacherForm} isPrivate />
    </Switch>
  );
}

export default AppRoutes;
