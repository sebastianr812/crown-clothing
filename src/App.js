import { Routes, Route } from "react-router-dom";

import { useEffect, lazy, Suspense } from "react";

import { checkUserSession } from './store/user/user.action';

import { useDispatch } from 'react-redux';

import { GlobalStyles } from './global.styles';

import Spinner from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const PaymentSucessful = lazy(() => import('./routes/payment-successful/payment-successful.component'));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unSubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unSubscribe;

    dispatch(checkUserSession());

  }, [dispatch]);



  return (
    <div>
      <GlobalStyles />
      <Suspense fallback={<Spinner />} >
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success/payment-successful" element={<PaymentSucessful />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );


}

export default App;
