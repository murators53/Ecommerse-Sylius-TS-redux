import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import Header from './components/header'
import Menu from "./components/menu";
import useApi from "./hooks/useApi";
import HomePage from "./pages/home-page";
import { RootState } from "./redux/store";
import axios, { AxiosResponse } from 'axios'
import { CartType, CategoryType } from "./Type";
import { useDispatch } from "react-redux";
import { setCategories } from "./redux/reducers/CategoryReducer";
import CategoryDetailsPage from "./pages/category-details";
import ProductDetailsPage from "./pages/product-details";
import { setCart } from "./redux/reducers/CartSlice";
import CartPage from "./pages/cart-page";
import CheckoutPage from "./pages/checkout-page";
import { setAuthToken } from "./redux/reducers/AuthSlice";
import LoginPage from "./pages/login-page";

function App() {
  const categoryState = useSelector((state: RootState) => state.cateogry)
  const cartState = useSelector((state: RootState) => state.cart)
  const authState = useSelector((state: RootState) => state.auth)

  const api = useApi()
  const dispatch = useDispatch()

  const localStorageAuthToken = localStorage.getItem('authToken')

  if (localStorageAuthToken && (localStorageAuthToken !== authState.token)) {
    dispatch(setAuthToken(localStorageAuthToken))
  }

  //shop/taxons?page=1&itemsPerPage=30
  if (categoryState.initialized === false) {
    const params = {
      page: 1,
      itemsPerPage: 30
    }
    console.log('shop/taxons?page=1&itemsPerPage=30', params);//shop/taxons?page=1&itemsPerPage=30

    api.get('shop/taxons?page=1&itemsPerPage=30', { params })
      .then((response: AxiosResponse<CategoryType[]>) => {
        console.log('>>TAXON RESP', response);

        dispatch(setCategories(response.data))
      })
  }

  if (cartState.initialized === false) {

    const existingCartToken: string | null = localStorage.getItem('cartToken')

    if (existingCartToken) {//var olani get ile al yoksa else set edecektir
      api.get<CartType>('shop/orders/' + existingCartToken)
        .then((response: AxiosResponse<CartType>) => {
          dispatch(setCart(response.data))
        })
    } else {
      // /api/v2/shop/orders
      const postData = {
        "localeCode": "en_US"
      }

      api.post<CartType>('shop/orders', postData)
        .then((response: AxiosResponse<CartType>) => {
          localStorage.setItem('cartToken', response.data.tokenValue)

          dispatch(setCart(response.data))
        })
    }
  }

  return (
    <>
      {/* <div className="loading"> //2.yontemi kullandigmiizdan burayi context iicne
        <img src="assets/images/loading-1.gif" />
      </div> */}

      <BrowserRouter>

        <Header />
        <Menu />

        <Routes >
          <Route index element={<HomePage />} />

          <Route path={'category-details/:code'} element={<CategoryDetailsPage />} />

          <Route path={'product-detail/:code'} element={<ProductDetailsPage />} />

          <Route path={'cart'} element={<CartPage />} />

          <Route path={'checkout'} element={<CheckoutPage />} />

          <Route path={'login'} element={<LoginPage />} />
        </Routes>

        <Footer />

      </BrowserRouter>

    </>
  );
}

export default App;
