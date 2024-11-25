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
import { fetchDataFromApi } from './utils/api';

const MyContext = createContext();

const App = () => {
  const [countryList, setCountruList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpenProductModal, setisOpenProductModal] = useState({
    id: '',
    open: false,
  });
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [productData, setProducutsData] = useState();
  const [isLogin, setisLogin] = useState(false);
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [fashionData, setFashionData] = useState([]);

  useEffect(() => {
    getCountry('https://countriesnow.space/api/v0.1/countries/');
    fetchDataFromApi(`/api/category`).then((res) => {
      setCatData(res.categoryList);
    });
    fetchDataFromApi('/api/subCategory').then((res) => {
      setSubCatData(res.data);
    });
    fetchDataFromApi('/api/products?catName=Thời Trang').then((res) => {
      setFashionData(res);
    });
  }, []);

  useEffect(() => {
    isOpenProductModal.open === true &&
      fetchDataFromApi(`/api/products/${isOpenProductModal.id}`).then((res) => {
        setProducutsData(res);
      });
  }, [isOpenProductModal]);

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountruList(res.data.data);
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
    setisLogin,
    catData,
    setCatData,
    subCatData,
    setSubCatData,
  };
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHeaderFooterShow === true && <Header />}

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
          <Route path="/signUp" exact={true} element={<SignUp />} />
        </Routes>
        {isHeaderFooterShow === true && <Footer />}

        {isOpenProductModal.open === true && (
          <ProductModal data={productData} />
        )}
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { MyContext };
