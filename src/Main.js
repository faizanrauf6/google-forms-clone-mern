import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import auth from "./services/authService";
import EditForm from "./Components/Form/EditForm";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PrivateRoute from "./Components/util/PrivateRoute";
import UserView from "./Components/Responding/UserView";
import RadioCheck from "./Components/Responding/RadioCheck";

function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRoute path="/form/:formId" component={EditForm} />
          <Route exact path="/s/:formId" component={UserView} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}
export default Main;

// function Login(){
//     let history = useHistory();
//     let location = useLocation();

//     let { from } = location.state || { from: { pathname: "/" } };
//     let login = () => {
//         auth.authenticate(() => {
//           history.replace(from);
//         });
//       };

//     return (
//         <div>
//             <p>Login form goes here</p>
//             <button onClick={login}>Login</button>
//         </div>
//     );
// }
