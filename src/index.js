import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './scss/global.scss';

import {
  SignUp,
  Login,
  Profile,
  Admin
} from './views';

const App = () => {

  let [user_data, updateUserData] = useState(null);
    
  return(
    <Router basename='/'>
      <>

        <Route path='/signup' render={localProps => (
          <SignUp {...localProps} updateUserData={updateUserData} />
        )} />
        <Route path='/login' render={localProps => (
          <Login {...localProps} updateUserData={updateUserData} />
        )} />
        <Route path='/profile' render={localProps => (
          <Profile {...localProps} user_data={user_data} updateUserData={updateUserData} />
        )} />
        <Route path='/admin' render={localProps => (
          <Admin {...localProps} />
        )} />

      </>
    </Router>
  );

}

render(<App />, document.getElementById("app"));