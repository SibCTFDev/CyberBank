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
  const [loadings, setLoadings] = useState({
    productsLoading: false,
    userLoading: false,
  })

  const HOME = "/";
  const PROFILE = "/profile/";
  const PRODUCT = "/product/";
  const LOGIN = "/login/";
  const REGISTER = "/register/";

  const setProductLoading = (state) =>
    setLoadings({...loadings, productsLoading: state});

  const setUserLoading = (state) =>
    setLoadings({...loadings, userLoading: state});

  const getProductsInfo = () => {
    setProductLoading(true);
    getProducts({
      handler: (data) => {
        setProducts(data);
        setProductLoading(false);
      },
      excHandler: () => {
        if (products.length !== 0)
          setProductLoading(false);
      }
    });
  };

  const getUserInfo = () => {
    setUserLoading(true);
    getUser({
      handler: (data) => {
        setUserData(data);
        setUserLoading(false);
      },
      excHandler: () => {
        if (Object.entries(userData).length !== 0)
          setUserLoading(false); 
      }
    });
  };

  useEffect(() => {
    if (authorized) {
      getProductsInfo();
      getUserInfo();
    }
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
      />
      <Routes>
          <Route exact path={HOME} element={
            <HomePage 
              products={products}
              setUserData={setUserData}
            />
            }/>
          <Route exact path={PROFILE} element={
            <ProfilePage 
              products={products}
              userData={userData}
            />
          }/>
          <Route exact path={PRODUCT} element={<ProductPage/>}/>
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
