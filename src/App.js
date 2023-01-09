import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import { checkUserSession } from './store/user/user.action';




import { useDispatch } from 'react-redux';



import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from "./routes/checkout/checkout.component";
import PaymentSucessful from './routes/payment-successful/payment-successful.component';

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
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success/payment-successful" element={<PaymentSucessful />} />
      </Route>
    </Routes>
  );


}

export default App;
