import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Shoe from './components/Shoe/AllShoes';
import ShoeIndex from './components/Shoe/ShoeIndex'
import NavBar from "./components/Navigation/NavBar";
import UploadShoe from './components/Shoe/AddShoe'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
        (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/upload'>
            <NavBar />
            <UploadShoe />
          </Route>
          <Route path='/shoes/:shoeId'>
            <NavBar />
            <ShoeIndex />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/'>
            <NavBar />
            <Shoe/>
          </Route>
          <Route path='/shoe/:shoeId'>
            <ShoeIndex />
          </Route>
        </Switch>
      )
    </>
  );
}

export default App;
