import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import ProductModal from './Components/ProductModal/ProductModal';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import Listing from './Pages/Listing/Listing';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';

const MyContext = createContext();

const App = () => {
  const [countryList, setCountruList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setisOpenProductModal] = useState(false);
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true)
  const [isLogin, setisLogin] = useState(false)
  useEffect(() => {
    getCountry('https://countriesnow.space/api/v0.1/countries/');
  }, []);

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountruList(res.data.data);
      console.log(res.data.data);
    });
  };
  const values = {
    countryList,
    setSelectedCountry,
    selectedCountry,
    isOpenProductModal,
    setisOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setisLogin
  };
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHeaderFooterShow === true && <Header />
        }
        
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cat/:id" exact={true} element={<Listing />} />
          <Route
            path="/product/:id"
            exact={true}
            element={<ProductDetails />}
          />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route path="/signIn" exact={true} element={<SignIn />} />
          <Route path='/signUp' exact={true} element={<SignUp/>} />
        </Routes>
        {isHeaderFooterShow === true && <Footer />}
        
        {isOpenProductModal === true && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { MyContext };
