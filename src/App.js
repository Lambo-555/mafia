import React from 'react';
import './App.css';
//________ ROUTER _________
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/header/header";
import About from "./pages/About/About";
import History from "./pages/History/History";
import Game from "./pages/Game/Game";
import Overlay from "./components/overlay/overlay";

function App() {
  return (
      <Router>
        <Overlay/>
        <Header/>
        <Switch>
          <Route exact path="/" component={Game}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/history" component={History}/>
        </Switch>
      </Router>
  );
}

export default App;
