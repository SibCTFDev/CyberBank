import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from 'js-cookie';
import {ThemeProvider} from '@mui/material/styles';
import '@fontsource/vt323';

import Navbar from './component/frame/Navbar';
import HomePage from './component/page/HomePage';
import ProductPage from './component/page/ProductPage';
import ProfilePage from './component/page/ProfilePage';
import AuthPage from './component/page/AuthPage';
import RegisterPage from './component/page/RegisterPage';
import useTheme from "./Theme"

import { getUser, getProducts } from './requests';


function App() {
  const [authorized, setAuthorized] = useState(
    Cookies.get('jwt') !== undefined
  );
  
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});

  const HOME = "/";
  const PROFILE = "/profile/";
  const PRODUCT = "/product/";
  const LOGIN = "/login/";
  const REGISTER = "/register/";

  const getProductsInfo = () => {
    getProducts({
      handler: (data) => {
        setProducts(data);
      }
    });
  };

  const getUserInfo = () => {
    getUser({
      handler: (data) => {
        setUserData(data);
      }
    });
  };

  const refreshInfo = () => {
    if (authorized) {
      getProductsInfo();
      getUserInfo();
    };
  };

  useEffect(() => {
    if (authorized) {
      getProductsInfo();
      getUserInfo();
    };
  }, [authorized]);

  useEffect(() => {
      const intervalId = setInterval(() => {
        if (authorized) {
          getProductsInfo();
          getUserInfo();
        }
      }, 5000);

      return () => clearInterval(intervalId);
  });

  const appContent = authorized ? (
    <Router className="AppFrame">
      <Navbar
        HOME={HOME}
        PROFILE={PROFILE}
        PRODUCT={PRODUCT}
        balance={userData.balance}
      />
      <Routes>
          <Route exact path={HOME} element={
            <HomePage 
              products={products}
              userData={userData}
              refreshInfo={refreshInfo}
            />
            }/>
          <Route exact path={PROFILE} element={
            <ProfilePage 
              products={products}
              userData={userData}
            />
          }/>
          <Route exact path={PRODUCT} element={
            <ProductPage
              refreshInfo={refreshInfo}
            />
            }/>
          <Route exact path="*" element={<Navigate to={HOME} replace/>}/>
      </Routes>
    </Router>
  ) : (
    <Router className="AppFrame">
      <Routes>
        <Route exact path={LOGIN} element={
          <AuthPage 
            setAuthorized={setAuthorized}
            REGISTER={REGISTER}
          />
          }/>
        <Route exact path={REGISTER} element={<RegisterPage LOGIN={LOGIN}/>}/>
        <Route exact path="*" element={<Navigate to={LOGIN} replace/>}/>
      </Routes>
    </Router>
  )

  return (
    <div className="App">
      <ThemeProvider theme={useTheme()}>
        {appContent}
      </ThemeProvider>
    </div>
  );
}

export default App;
