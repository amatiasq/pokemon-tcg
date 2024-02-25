import { Route, Router, Routes } from '@solidjs/router';
import './App.css';
import { Home } from './Home';
import { Sidebar } from './Sidebar';
import { AuthRoute } from './auth/AuthRoute';
import { Login } from './auth/Login';

export function App() {
  return (
    <Router>
      <Sidebar />

      <main>
        <Routes>
          <Route path="/login" component={Login} />
          <AuthRoute path="/" component={Home} />
          <AuthRoute path="/filters" component={() => <>a</>} />
        </Routes>
      </main>
    </Router>
  );
}
