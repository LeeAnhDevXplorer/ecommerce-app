import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Products from './Pages/Products/Products';
import ProductUpload from './Pages/ProductUpload/ProductUpload';
import SignUp from './Pages/SignUp/SignUp';

const MyContext = createContext();
const App = () => {
  const [isToggleSiderBar, setisToggleSiderBar] = useState(false);
  const [isHide, setisHide] = useState(true);
  const [themeMode, setThemeMode] = useState(true);
  const values = {
    isToggleSiderBar,
    setisToggleSiderBar,
    isHide,
    setisHide,
    themeMode,
    setThemeMode,
  };
  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('themeMode', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    }
  }, [themeMode]);
  return (
    <div>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          {isHide === true && <Header />}

          <div className="main d-flex">
            {isHide === true && (
              <div
                className={`sidebarWrapper ${
                  isToggleSiderBar === true ? 'toggle' : ''
                }`}
              >
                <SideBar />
              </div>
            )}

            <div
              className={`content ${isToggleSiderBar === true ? 'toggle' : ''}`}
            >
              <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/signup" exact={true} element={<SignUp />} />
                <Route
                  path="/producDetails"
                  exact={true}
                  element={<ProductDetails />}
                />
                <Route
                  path="/product/productlist"
                  exact={true}
                  element={<Products />}
                />
                <Route
                  path="/product/productupload"
                  exact={true}
                  element={<ProductUpload />}
                />
              </Routes>
            </div>
          </div>
        </MyContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
export { MyContext };
