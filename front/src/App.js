import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '@fontsource/vt323';

import Navbar from './component/frame/Navbar';
import HomePage from './component/page/HomePage';
import ProductPage from './component/page/ProductPage';
import ProfilePage from './component/page/ProfilePage';
import AuthPage from './component/page/AuthPage';


function App() {
  const HOME = "/";
  const PROFILE = "/profile/";
  const PRODUCT = "/product/";
  const AUTH = "/schedules/";


  return (
    <div className="App">
      <Router className="AppFrame">
        <Navbar
          HOME={HOME}
          PROFILE={PROFILE}
          PRODUCT={PRODUCT}
        />
        <Routes>
            <Route exact path={HOME} element={<HomePage/>}/>
            <Route exact path={PROFILE} element={<ProfilePage/>}/>
            <Route exact path={PRODUCT} element={<ProductPage/>}/>
            <Route exact path={AUTH} element={<AuthPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
