import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export { Routes };