import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, } from 'react-redux';
import Routes from './routes';
import './App.css';

function App() {
  const timeInMillseconds = 24 * 60 * 60 * 1000;   // -----> 24 hrs
  setTimeout(() => {
    const user = JSON.parse(localStorage.getItem('userConfirmation'));
    if (user) {
      localStorage.removeItem('userConfirmation');
    }
  }, timeInMillseconds);

  return (
    <Routes />
  );
}

export default connect(state => {
  return {
    user: state.user
  }
})(App);
