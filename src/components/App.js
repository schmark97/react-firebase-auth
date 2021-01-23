import { Container } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./DashBoard";
import { AuthProvider } from '../contexts/AuthContext'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import  PrivateRoute  from './PrivateRoute'
import  ForgotPassword  from "./ForgotPassword";
import  UpdateProfile  from "./UpdateProfile";

function App() {
  return (

    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{maxWidth:"400px"}}>  
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
      </Container>
    )  
 }

export default App;
