import { BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SchoolPage from './pages/SchoolPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';
import AuthRoute from './utils/AuthRoute';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path='/' component={HomePage} />
        <ProtectedRoute path ="/school/:id" component={SchoolPage}/>

        <AuthRoute path="/Signup" component={SignupPage}/>
        <AuthRoute path ="/login" component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
