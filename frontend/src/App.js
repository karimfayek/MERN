
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import { loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import Layout from './components/Layout';
import SellerRegister from './components/SellerRegister';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="seller-register" element={<SellerRegister />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
