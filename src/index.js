import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterForm from "./components/registerForm/registerForm";
import Home from "./components/home/home";
ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/register" component={RegisterForm} />
    </div>
  </Router>,
  document.getElementById("root")
);
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
