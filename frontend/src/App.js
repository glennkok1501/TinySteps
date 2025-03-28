import { BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SchoolPage from './pages/SchoolPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';
import AuthRoute from './utils/AuthRoute';
import SignupPage from './pages/SignupPage';
import BookmarksPage from './pages/BookmarksPage';
import AssistantPage from './pages/AssistantPage';
import FinancialSupportPage from './pages/FinancialSupportPage';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import VerifyPage from './pages/VerifyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path='/' component={HomePage} />
        <ProtectedRoute path ="/school/:id" component={SchoolPage}/>
        <ProtectedRoute path ="/bookmarks" component={BookmarksPage}/>
        <ProtectedRoute path ="/assistant" component={AssistantPage}/>
        <ProtectedRoute path ="/financialsupport" component={FinancialSupportPage}/>

        <AuthRoute path="/signup" component={SignupPage}/>
        <AuthRoute path ="/login" component={LoginPage}/>

        <Route path="/forgotpassword" component={ForgotPasswordPage} />
        <Route path="/resetpassword/:reset_id" component={ResetPasswordPage} />
        <Route path="/verify/:verification_string" component={VerifyPage} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
