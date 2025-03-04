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


function App() {
  const [authorized, setAuthorized] = useState(
    Cookies.get('jwt') !== undefined
  );
  
  const [products, setProducts] = useState(null);

  const HOME = "/";
  const PROFILE = "/profile/";
  const PRODUCT = "/product/";
  const LOGIN = "/login/";
  const REGISTER = "/register";

  useEffect(() => {
    setProducts( [
      {
          id: 1,
          image_id: 1,
          owner: "user1",
          description: "description",
          content: "secret",
          price: 200,
      },
      {
          id: 2,
          image_id: 2,
          owner: "user2",
          description: "description2",
          content: "secret",
          price: 150,
      },
      {
          id: 3,
          image_id: 3,
          owner: "user1",
          description: "description3",
          content: "secret",
          price: 220,
      },
      {
          id: 4,
          image_id: 4,
          owner: "user2",
          description: "description4",
          content: "secret",
          price: 330,
      },
      {
          id: 5,
          image_id: 4,
          owner: "user1",
          description: "description4",
          content: "secret",
          price: 330,
      },
      {
          id: 6,
          image_id: 4,
          owner: "user2",
          description: "description4",
          content: "secret",
          price: 330,
      },
      {
          id: 7,
          image_id: 4,
          owner: "user1",
          description: "description4",
          content: "secret",
          price: 330,
      },
      {
          id: 8,
          image_id: 4,
          owner: "user2",
          description: "description4",
          content: "secret",
          price: 330,
      }
    ]);
  }, []);

  const appContent = authorized ? (
    <Router className="AppFrame">
      <Navbar
        HOME={HOME}
        PROFILE={PROFILE}
        PRODUCT={PRODUCT}
      />
      <Routes>
          <Route exact path={HOME} element={<HomePage products={products}/>}/>
          <Route exact path={PROFILE} element={<ProfilePage products={products}/>}/>
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
        <Route exact path={REGISTER} element={<RegisterPage/>}/>
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
