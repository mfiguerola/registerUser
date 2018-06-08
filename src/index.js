import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/register/register";
import Home from "./components/home/home";
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/register" component={Register} />
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
