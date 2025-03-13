import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import SchoolPage from './pages/SchoolPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path ="/school/:id" component={SchoolPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
